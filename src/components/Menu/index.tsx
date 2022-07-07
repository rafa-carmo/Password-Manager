/* eslint-disable @next/next/no-img-element */
import { AuthContext } from 'contexts/AuthContext'
import { Gear, Key, Password, SignOut } from 'phosphor-react'
import { useContext } from 'react'

import { Button } from './Button'
import * as S from './styles'

const buttons = {
  Passwords: <Key size={32} weight="thin" />,
  Settings: <Gear size={32} weight="thin" />,
  Sair: <SignOut size={32} weight="thin" />
}

export type ButtonsProps = keyof typeof buttons
export default function Menu() {
  const { user } = useContext(AuthContext)
  return (
    <S.Wrapper>
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
        <h2>0 Senhas registradas</h2>
      </S.UserContent>
      <S.Content>
        {Object.keys(buttons).map((key) => (
          <Button
            key={key}
            icon={buttons[key as ButtonsProps]}
            name={key}
            url={key.toLocaleLowerCase()}
          />
        ))}
      </S.Content>
      <S.Card></S.Card>
      <S.Footer>Todos os direitos reservados</S.Footer>
    </S.Wrapper>
  )
}
