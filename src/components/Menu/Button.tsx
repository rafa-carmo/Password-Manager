import { AuthContext } from 'contexts/AuthContext'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import * as S from './styles'

export type ButtonProps = {
  name: string
  icon: React.ReactNode
  url?: string
}

export function Button({ icon, name, url }: ButtonProps) {
  const { logOut } = useContext(AuthContext)
  const router = useRouter()

  function handleClick() {
    if (name === 'Sair') {
      logOut()
      return
    }

    router.push(`/${url}`)
  }

  return (
    <S.Button onClick={handleClick}>
      {icon} {name}
    </S.Button>
  )
}
