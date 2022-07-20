import { InputComponent } from 'components/Input'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import Base from 'templates/Base'

import * as S from './styles'

type Inputs = {
  name: string
}

export interface SettingsTemplateProps {
  username: string
  name: string
  avatar?: string
  email: string
  isVerified: boolean
}

export function SettingsTemplate({
  username,
  name,
  email,
  avatar,
  isVerified
}: SettingsTemplateProps) {
  const methods = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ name }) => {
    console.log(name)
  }

  const [disableInputs, setDisableInputs] = useState(true)
  return (
    <Base>
      <S.Wrapper>
        <FormProvider {...methods}>
          <S.Form onSubmit={methods.handleSubmit(onSubmit)}>
            <S.Title>Informações do Usuário</S.Title>
            <InputComponent
              label="Usuário"
              name="username"
              valuePre={username}
              disabled={disableInputs}
            />
            <InputComponent
              label="Email"
              name="email"
              valuePre={email}
              disabled={disableInputs}
            />
            <InputComponent
              label="Nome"
              name="name"
              valuePre={name}
              disabled={disableInputs}
            />
            <InputComponent
              label="Avatar"
              name="avatar"
              valuePre={avatar}
              disabled={disableInputs}
            />
          </S.Form>
        </FormProvider>
      </S.Wrapper>
    </Base>
  )
}
