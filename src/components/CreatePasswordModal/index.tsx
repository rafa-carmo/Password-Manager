import { Button } from 'components/Button'
import { Key } from 'phosphor-react'

import { InputPasswordModal } from './Input'
import * as S from './styles'

export function CreatePasswordModal() {
  return (
    <S.Wrapper isOpen={false}>
      <S.Content>
        Digite as credencias para serem encriptografadas e salvas.
        <S.Form>
          <div className="flex gap-4 ">
            <InputPasswordModal label="Login" name="login" id="login" />
            <InputPasswordModal label="Senha" name="password" id="password" />
          </div>
          <Button label="Salvar" icon={<Key size={22} />} />
        </S.Form>
      </S.Content>
    </S.Wrapper>
  )
}
