import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, useState, useEffect, useContext } from 'react'
import { api } from 'services/api'
import { useTimer } from 'use-timer'
import { Status } from 'use-timer/lib/types'

import { ErrorContext } from './ErrorContext'

type KeyContextProps = {
  key: string | null
  setKeyValue: (value: string) => Promise<void>
  time: number | null
  deleteKey: () => void
  status: Status
  verifyKey: (value: string) => Promise<string | true>
}

export const KeyContext = createContext({} as KeyContextProps)

type KeyProviderProps = {
  children: React.ReactNode
}

export function KeyProvider({ children }: KeyProviderProps) {
  const [key, setKey] = useState<string | null>(null)
  const router = useRouter()

  const { time, start, reset, status } = useTimer({
    initialTime: 60 * 10, // 10 minutes
    timerType: 'DECREMENTAL'
  })

  function verifyToken() {
    const { 'passwordManager.token': token } = parseCookies()
    if (!token) {
      setKey(null)
      reset()
      router.push('/signIn')
      return true
    }
  }

  async function verifyKey(key: string) {
    if (verifyToken()) {
      return
    }
    const verify = await api
      .post('/api/users/masterkey', {
        masterKey: key
      })
      .then(() => {
        return true
      })
      .catch((err) => {
        return err.response.data
      })
    return verify
  }

  async function setKeyValue(value: string) {
    setKey(value)
    reset()
    start()
    return
  }
  function deleteKey() {
    setKey(null)
    reset()
    return
  }
  useEffect(() => {
    if (time) {
      verifyToken()
      if (time <= 0) {
        setKey(null)
        reset()
      }
    }
  }, [time, reset])
  return (
    <KeyContext.Provider
      value={{ key, setKeyValue, time, deleteKey, status, verifyKey }}
    >
      {children}
    </KeyContext.Provider>
  )
}
