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
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return error({ message: 'Token is required', statusCode: 400 }, res)
  }

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

  res.status(200).json({ name: 'John Doe' })
}
