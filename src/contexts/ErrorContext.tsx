import { createContext, useState } from 'react'

type ErrorContextProps = {
  error: string | null
  setErrorValue: (value: string) => void
}

export const ErrorContext = createContext({} as ErrorContextProps)

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<string | null>(null)

  function setErrorValue(value: string) {
    setError(value)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }
  return (
    <ErrorContext.Provider value={{ error, setErrorValue }}>
      {children}
    </ErrorContext.Provider>
  )
}
