import jwt from 'jwt-simple'
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
import NextCors, { error } from 'server/lib/cors'
import { prisma } from 'server/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await NextCors(req)
  const { method } = req

  if (method === 'GET') {
    const { token } = req.query
    if (!token) {
      return error({ message: 'Token is required', statusCode: 400 }, res)
    }

    try {
      const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
      const { email } = tokenData
      if (!email) {
        return error({ message: 'Token is invalid', statusCode: 400 }, res)
      }

      const userExist = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (!userExist) {
        return error({ message: 'Invalid token', statusCode: 400 }, res)
      }
      if (userExist.isVerified) {
        return error({ message: 'Email already validated' }, res)
      }

      return await prisma.user
        .update({
          where: { email },
          data: {
            isVerified: true
          }
        })
        .then(() => res.status(200).json({ message: 'User verified' }))
        .catch((err) => error(err, res))
    } catch (e) {
      return error({ message: 'Invalid token', statusCode: 400 }, res)
    }
  }

  if (method === 'POST') {
    const { token } = req.query
    if (!token) {
      return error({ message: 'Token is required', statusCode: 400 }, res)
    }
    try {
      const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
      const { email } = tokenData
      if (!email) {
        return error({ message: 'Token is invalid', statusCode: 400 }, res)
      }
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })
      if (!user) {
        return error({ message: 'Invalid token', statusCode: 400 }, res)
      }
      const password = await prisma.password.findFirst({
        where: {
          userId: user.id
        }
      })
      if (!password) {
        return error(
          { message: 'Nenhum password cadastrado', statusCode: 400 },
          res
        )
      }
      return password.password
    } catch (e) {
      return error({ message: 'Invalid token', statusCode: 400 }, res)
    }
  }
  return res.status(404).json({ error: 'Not found' })
}
