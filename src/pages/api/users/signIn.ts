import jwt from 'jwt-simple'
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
import NextCors, { error } from 'server/lib/cors'
import { prisma } from 'server/prisma'
import { signInRequest } from 'server/signIn'

type BodyData = {
  login: string
  password: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req)

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
    return res.status(400)
  }

  if (method === 'POST') {
    const { login, password }: BodyData = req.body

    if (!login) {
      return error(
        { message: 'Username and email are required', statusCode: 400 },
        res
      )
    }

    if (!password) {
      return error({ message: 'Password is required', statusCode: 400 }, res)
    }

    const user = await signInRequest({ login, password })

    if (user instanceof Error) {
      if (user.message === 'User not found') {
        return error({ message: 'User not exist', statusCode: 400 }, res)
      }
      if (user.message === 'Password is incorrect') {
        return error({ message: 'Password is incorrect', statusCode: 400 }, res)
      }
      return error({ message: 'Something went wrong', statusCode: 400 }, res)
    }

    return res.status(200).json({ ...user })
  }
}
