/* eslint-disable @next/next/no-img-element */
import { Loading } from 'components/Loading'
import { AuthContext } from 'contexts/AuthContext'
import { Gear, Key, Password, SignOut } from 'phosphor-react'
import { useContext } from 'react'

import { Button } from './Button'
import * as S from './styles'

const buttons = {
  Passwords: { icon: <Key size={32} weight="thin" />, url: '/dashboard' },
  Settings: {
    icon: <Gear size={32} weight="thin" />,
    url: '/dashboard/settings'
  },
  Sair: { icon: <SignOut size={32} weight="thin" />, url: 'sair' }
}

export type ButtonsProps = keyof typeof buttons
export interface MenuProps {
  countPasswords?: string | number
}

export default function Menu({ countPasswords }: MenuProps) {
  const { user, loading } = useContext(AuthContext)
  return (
    <S.Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <S.LogoContainer>
            <Password size={32} />
            <h2 className="font-bold text-lg">Password Manager</h2>
          </S.LogoContainer>
          <S.UserContent>
            {user?.avatar ? (
              <img
                className="w-28 h-28 rounded-full"
                src={user.avatar}
                alt="user avatar"
              />
            ) : (
              <div className="w-28 h-28 rounded-full border border-zinc-200">
                <span className="text-center text-2xl font-bold flex items-center justify-center h-full uppercase text-zinc-400">
                  {`${user?.name.charAt(0)}${user?.name.charAt(1)}`}
                </span>
              </div>
            )}
            <h2>{user?.name}</h2>
            <h2>{countPasswords ? countPasswords : '0'} Senhas registradas</h2>
          </S.UserContent>
          <S.Content>
            {Object.keys(buttons).map((key) => (
              <Button
                key={key}
                icon={buttons[key as ButtonsProps].icon}
                name={key}
                url={buttons[key as ButtonsProps].url}
              />
            ))}
          </S.Content>
          <S.Card></S.Card>
          <S.Footer>Todos os direitos reservados</S.Footer>
        </>
      )}
    </S.Wrapper>
  )
}
