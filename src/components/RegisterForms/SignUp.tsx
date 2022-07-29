import { Loading } from 'components/Loading'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Key } from 'phosphor-react'
import { useState } from 'react'
import {
  FieldErrors,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { api } from 'services/api'
import { createUserValidation } from 'utils/validations/sign'

import { InputRegister, InputProps } from './InputRegister'

type Inputs = {
  username: string
  name: string
  email: string
  password: string
  repeatPassword: string
}

const fields: InputProps[] = [
  {
    label: 'Nome',
    placeholder: 'Nome completo',
    name: 'name',
    type: 'text'
  },
  {
    label: 'Username',
    placeholder: 'Username',
    name: 'username',
    type: 'text'
  },
  {
    label: 'E-mail',
    placeholder: 'email@email.com',
    name: 'email',
    type: 'text'
  },
  {
    label: 'Senha',
    placeholder: 'senha',
    name: 'password',
    type: 'password'
  },
  {
    label: 'Repita a senha',
    placeholder: 'repetir a senha',
    name: 'repeatPassword',
    type: 'password'
  }
]

export default function SignUp() {
  const methods = useForm<Inputs>()
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitLoading, setSubmitLoading] = useState(false)
  const router = useRouter()

  const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
    const errors = createUserValidation(inputData)
    if (Object.keys(errors).length) {
      setErrors(errors)
      return
    }
    setErrors({})
    setSubmitLoading(true)
    const { email, name, password, username } = inputData
    await api
      .post('/api/users', {
        name,
        username,
        email,
        password
      })
      .then(() => router.push('/signIn'))
      .catch((err) => setErrors({ ...errors, ...err.response.data }))
    setSubmitLoading(false)
  }
  return (
    <section className="w-full h-full p-5 rounded-md flex flex-col items-center">
      <div className="bg-zinc-300/50 p-4 md:my-8 rounded-full border border-solid border-white">
        <Key size={60} />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full max-w-xs h-full flex flex-col items-center justify-around"
        >
          <div className="w-full">
            {fields.map((field) => (
              <InputRegister
                key={field.name}
                error={errors[field.name]}
                {...field}
              />
            ))}
          </div>
          {/* {invalid && (
          <p className="pb-4 text-red-500">Usuario ou senha inválido.</p>
        )} */}
          <div className="flex flex-col py-4 w-full items-center">
            <button
              type="submit"
              className="w-full bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 mb-2 rounded transition-colors duration-150 disabled:opacity-70 flex items-center justify-center gap-2"
              disabled={submitLoading}
            >
              {submitLoading && <Loading />}
              Cadastrar
            </button>
            <p className="text-base">
              Já tem conta?
              <Link href="/signIn">
                <a className="text-zinc-500 underline hover:text-zinc-700 transition-colors duration-150 pl-2">
                  Entrar.
                </a>
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
