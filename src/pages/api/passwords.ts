import jwt from 'jwt-simple'
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
import NextCors, { error } from 'server/lib/cors'
import { prisma } from 'server/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req)
  const method = req.method
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return error({ message: 'Token is required', statusCode: 400 }, res)
  }
  if (method === 'GET') {
    try {
      const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
      const { id } = tokenData
      const passwords = await prisma.password.findMany({
        where: {
          userId: id
        }
      })
      return res.status(200).json(passwords)
    } catch (error) {}
  }

  if (method === 'POST') {
    type BodyData = {
      login: string
      password: string
    }

    const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
    const { id } = tokenData
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user || !user.isVerified) {
      return error(
        { message: 'Usuario não encontrado ou não validado', statusCode: 400 },
        res
      )
    }
    const { login, password }: BodyData = req.body
    console.log(login, password)
    const passwordCreate = await prisma.password.create({
      data: {
        login,
        password,
        userId: user.id
      }
    })

    return res.status(200).json({ message: 'success' })
  }
  res.status(200).json({ name: 'John Doe' })
}
