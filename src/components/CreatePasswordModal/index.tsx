import { Button } from 'components/Button'
import { InputComponent } from 'components/Input'
import { ErrorContext } from 'contexts/ErrorContext'
import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import CryptoJS from 'crypto-js'
import { Key } from 'phosphor-react'
import { useContext, useState } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { api } from 'services/api'

import * as S from './styles'

type Inputs = {
  title: string
  login: string
  password: string
  tags: string
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
  const { setIsOpen } = useContext(ModalContext)
  const { setErrorValue } = useContext(ErrorContext)

  const [apiLoading, setApiLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    tags,
    login,
    password
  }) => {
    if (!key) {
      onClose()
      setIsOpen(true)
      return
    }
    setApiLoading(true)
    let encryptLogin, encryptPassword
    if (login || login !== '') {
      encryptLogin = CryptoJS.AES.encrypt(login, key).toString()
    }
    if (!password) {
      return
    }
    if (password !== '') {
      encryptPassword = CryptoJS.AES.encrypt(password, key).toString()
    }

    await api
      .post('/api/passwords', {
        title,
        login: encryptLogin,
        password: encryptPassword,
        tags
      })
      .catch(() =>
        setErrorValue('Desculpe, houve algum erro, tente novamente.')
      )
      .then(() => {
        methods.reset()
        onClose()
      })

    setApiLoading(false)
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
            <div className="flex flex-wrap gap-4 w-full items-center justify-center">
              <div className="w-full ">
                <InputComponent label="Titulo" name="title" id="title" />
              </div>
              <div className="w-full grid grid-cols-2 gap-3 ">
                <InputComponent
                  label="Login"
                  name="login"
                  id="login"
                  autocomplete="off"
                />
                <InputComponent
                  label="Senha"
                  name="password"
                  id="password"
                  autocomplete="off"
                  autoPassword
                />
              </div>
              <div className="w-full">
                <label htmlFor="tags" className="flex gap-3 items-end mb-1">
                  Tags:
                  <p className="text-zinc-400 text-sm">
                    (Digite as tags separadas por virgula.)
                  </p>
                </label>
                <textarea
                  className="w-full resize-none"
                  placeholder="Exemplo: email, trabalho"
                  id="tags"
                  {...methods.register('tags')}
                ></textarea>
              </div>
            </div>
            <Button
              loading={apiLoading}
              label="Salvar"
              icon={<Key size={22} />}
            />
          </S.Form>
        </FormProvider>
      </S.Content>
    </S.Wrapper>
  )
}
