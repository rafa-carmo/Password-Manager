import jwt from 'jwt-simple'
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
import { encrypt } from 'server/lib/bcrypt'
import NextCors, { error } from 'server/lib/cors'
import { transport } from 'server/lib/nodemailer'
import { prisma } from 'server/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await NextCors(req)
  const { method } = req
  if (method === 'GET') {
    if (req.headers.authorization) {
      const payload = jwt.decode(
        req.headers.authorization.replace('Bearer ', ''),
        env.JWT_SECRET || ''
      )

      const user = await prisma.user.findFirst({ where: { id: payload.id } })

      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
      return res.status(200).json({
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        masterKey: user.masterKey,
        isVerified: user.isVerified,
        name: user.name
      })
    }
  }

  if (method === 'POST') {
    const { name, username, email, password } = req.body
    if (!name) {
      return error({ message: 'name is required', statusCode: 400 }, res)
    }
    if (!username) {
      return error({ message: 'Username is required', statusCode: 400 }, res)
    }
    if (!email) {
      return error({ message: 'Email is required', statusCode: 400 }, res)
    }
    if (!password) {
      return error({ message: 'Password is required', statusCode: 400 }, res)
    }

    const encryptPassword = encrypt(password)

    const userExist = await prisma.user.findMany({
      where: {
        OR: [{ email }, { username }]
      }
    })
    if (userExist.length > 0) {
      const error = {
        email: '',
        username: ''
      }

      if (userExist.filter((user) => user.email === email).length > 0) {
        error.email = 'E-mail ja cadastrado.'
      }
      if (userExist.filter((user) => user.username === username).length > 0) {
        error.username = 'Username ja cadastrado.'
      }
      return res.status(400).json(error)
    }
    await prisma.user.create({
      data: {
        name,
        email,
        password: encryptPassword,
        username
      }
    })
    const token = jwt.encode({ email }, env.JWT_SECRET || '')
    await transport.sendMail({
      from: 'noreply@email.com',
      to: email,
      subject: 'Verify your email',
      html: [
        '<div style="display: grid; place-items: center">',
        `<h4>Olá ${name},</h4>`,
        '<p>Para confirmar seu cadastro na plataforma, acesse o link abaixo: </p>',
        `<a href="${env.FRONTEND_URL}/verify/verify-email?token=${token}" target="_blank" style="text-decoration: none; cursor: pointer;"><button style="background: #ABDAFC; padding: 15px;"><font color="#494949">[Link]</font></button></a>`,
        '</div>'
      ].join('\n')
    })

    return res.status(200).json({ ...req.body })
  }

  return res.status(404).json({ error: 'Not found' })
}
