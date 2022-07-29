import jwt from 'jwt-simple'
import { env } from 'process'

import { prisma } from './prisma'

export async function getUser(token: string) {
  const payload = jwt.decode(token, env.JWT_SECRET || '')
  const user = await prisma.user.findFirst({ where: { id: payload.id } })
  if (!user) {
    return new Error('user not found')
  }
  return {
    username: user.username,
    avatar: user.avatar,
    email: user.email,
    masterKey: user.masterKey,
    isVerified: user.isVerified,
    name: user.name
  }
}

export async function validateUserEmail(token: string) {
  try {
    const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
    const { email } = tokenData
    if (!email) {
      return new Error('Invalid token')
    }

    const userExist = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!userExist) {
      return new Error('Invalid token')
    }
    if (userExist.isVerified) {
      return new Error('E-mail already validated')
    }

    return await prisma.user
      .update({
        where: { email },
        data: {
          isVerified: true
        }
      })
      .then(() => true)
      .catch((err) => new Error(err))
  } catch (e) {
    return new Error('Invalid token')
  }
}
