import { User } from '@prisma/client'
import jwt from 'jwt-simple'
import { env } from 'process'
import { prisma } from 'server/prisma'
import { PayloadDataProps } from 'services/auth'

import { compare } from './lib/bcrypt'

type signInRequestProps = {
  login: string
  password: string
}

export async function signInRequest({ login, password }: signInRequestProps) {
  let userSearch: User[] = []

  if (login.includes('@')) {
    userSearch = await prisma.user.findMany({
      where: {
        email: login
      }
    })
  }
  if (!userSearch.length) {
    userSearch = await prisma.user.findMany({
      where: {
        username: login
      }
    })
  }

  if (userSearch.length <= 0) {
    return new Error('User not found')
  }
  const user = userSearch[0]

  const comparePassword = compare({ password, passwordHash: user.password })
  if (!comparePassword) {
    return new Error('Password is incorrect')
  }

  if (!user.isVerified) {
    return new Error('User not verified')
  }

  const payloadData: PayloadDataProps = {
    id: user.id,
    username: user.username,
    name: user.name
  }
  const token = jwt.encode(payloadData, env.JWT_SECRET || '')
  return { token, user }
}
