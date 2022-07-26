import { User } from '@prisma/client'

import { api } from './api'

export type PayloadDataProps = {
  id: string
  username: string
  name: string
}

export async function recoverUserInformation(token: string) {
  try {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const user = await api.get('/api/users/signIn')

    if (!user) {
      return new Error('User not found')
    }
    return user.data as User
  } catch (error) {
    return error
  }
}
