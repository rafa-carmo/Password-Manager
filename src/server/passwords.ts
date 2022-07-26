import jwt from 'jwt-simple'
import { env } from 'process'

import { prisma } from './prisma'

export async function getPasswords(token: string) {
  try {
    const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
    const { id } = tokenData
    const passwords = await prisma.password.findMany({
      where: {
        userId: id
      },
      include: {
        tags: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // prevent error for " `object` ("[object Date]") cannot be serialized as JSON. "
    const jsonStringfy = JSON.stringify(passwords)
    return JSON.parse(jsonStringfy)
  } catch (error) {}
  return null
}
