import { createContext, useState, useEffect } from 'react'
import { api } from 'services/api'
import { useTimer } from 'use-timer'
import { Status } from 'use-timer/lib/types'

type KeyContextProps = {
  key: string | null
  setKeyValue: (value: string) => Promise<boolean>
  time: number | null
  deleteKey: () => void
  status: Status
}

export const KeyContext = createContext({} as KeyContextProps)

type KeyProviderProps = {
  children: React.ReactNode
}

export function KeyProvider({ children }: KeyProviderProps) {
  const [key, setKey] = useState<string | null>(null)
  const { time, start, reset, status } = useTimer({
    initialTime: 60 * 10, // 10 minutes
    timerType: 'DECREMENTAL'
  })

  async function verifyKey(key: string) {
    const verify = await api
      .post('/api/users/masterkey', {
        masterKey: key
      })
      .catch()
    if (verify) {
      return true
    }
    return false
  }

  async function setKeyValue(value: string) {
    if (await verifyKey(value)) {
      setKey(value)
      reset()
      start()
      return true
    }
    return false
  }
  function deleteKey() {
    setKey(null)
    reset()
    return
  }
  useEffect(() => {
    if (time <= 0) {
      setKey(null)
      reset()
    }
  }, [time, reset])
  return (
    <KeyContext.Provider value={{ key, setKeyValue, time, deleteKey, status }}>
      {children}
    </KeyContext.Provider>
  )
}
