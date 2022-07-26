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
