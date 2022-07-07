import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { createContext, useEffect, useState } from 'react'
import { api } from 'services/api'
import { recoverUserInformation } from 'services/auth'

type SignInData = {
  login: string
  password: string
}

export type UserData = Pick<
  User,
  'username' | 'avatar' | 'masterKey' | 'name' | 'email' | 'isVerified'
>

type AuthContextProps = {
  isAuthenticated: boolean
  authenticate: (data: SignInData) => Promise<void>
  logOut: () => void
  user: UserData | null
  loading: boolean
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const isAuthenticated = !!user
  const router = useRouter()

  useEffect(() => {
    const { 'passwordManager.token': token } = parseCookies()

    if (token) {
      setLoading(true)
      recoverUserInformation(token).then((data) => {
        if (data instanceof Error) {
          return
        }
        if (!data) {
          return
        }
        const userData = data as UserData
        setUser({
          username: userData.username,
          avatar: userData.avatar,
          email: userData.email,
          masterKey: userData.masterKey,
          isVerified: userData.isVerified,
          name: userData.name
        })
      })
      setLoading(false)
      router.push('/dashboard')
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function authenticate({ login, password }: SignInData) {
    const { data } = await api.post('/api/users/signIn', { login, password })
    if (data instanceof Error) {
      return
    }
    if (!data) {
      return
    }
    setCookie(undefined, 'passwordManager.token', data.token, {
      maxAge: 60 * 60 * 4 // 4 hours
    })
    // api.defaults.headers.common['Authorizathion'] = `Bearer ${data.token}`
    api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    const userData = data.user

    setUser({
      avatar: userData.avatar,
      email: userData.email,
      isVerified: userData.isVerified,
      masterKey: userData.masterKey,
      name: userData.name,
      username: userData.username
    })
    router.push('/dashboard')
    return
  }

  function logOut() {
    destroyCookie(undefined, 'passwordManager.token')
    setUser(null)
    router.push('/signIn')
  }

  // async function testMasterKey(key: string) {
  //   const pass = await api.get('')
  // }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authenticate, logOut, user, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
