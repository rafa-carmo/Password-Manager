import { Button } from 'components/Button'
import { InputComponent } from 'components/Input'
import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import CryptoJS from 'crypto-js'
import { Key } from 'phosphor-react'
import { useContext } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import Modal from 'react-modal'
import { api } from 'services/api'

import * as S from './styles'

type Inputs = {
  login: string
  password: string
}

interface CreatePasswordModalProps {
  show: boolean
  onClose: () => void
}

export function CreatePasswordModal({
  show,
  onClose
}: CreatePasswordModalProps) {
  const methods = useForm<Inputs>()
  const { key } = useContext(KeyContext)

  const onSubmit: SubmitHandler<Inputs> = async ({ login, password }) => {
    if (!key) {
      return
    }
    let encryptLogin, encryptPassword
    if (login || login !== '') {
      encryptLogin = CryptoJS.AES.encrypt(login, key).toString()
    }
    if (password || password !== '') {
      encryptPassword = CryptoJS.AES.encrypt(password, key).toString()
    }

    api.post('/api/passwords', {
      login: encryptLogin,
      password: encryptPassword
    })
  }

  function closeModal() {
    methods.reset()
    onClose()
  }
  return (
    <S.Wrapper isOpen={show} onRequestClose={closeModal}>
      <S.Content>
        Digite as credencias para serem encriptografadas e salvas.
        <FormProvider {...methods}>
          <S.Form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex gap-4 ">
              <InputComponent label="Login" name="login" id="login" />
              <InputComponent label="Senha" name="password" id="password" />
            </div>
            <Button label="Salvar" icon={<Key size={22} />} />
          </S.Form>
        </FormProvider>
      </S.Content>
    </S.Wrapper>
  )
}
