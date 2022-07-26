import { createContext, useState } from 'react'

type ModalContextProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const ModalContext = createContext({} as ModalContextProps)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  )
}
