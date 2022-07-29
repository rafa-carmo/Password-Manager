import { Captcha } from 'components/Captcha'
import { Loading } from 'components/Loading'
import { AuthContext } from 'contexts/AuthContext'
import Link from 'next/link'
import { Key } from 'phosphor-react'
import React, { useState } from 'react'
import { useContext } from 'react'
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldErrors
} from 'react-hook-form'
import { loginUserValidation } from 'utils/validations/sign'

import { InputProps, InputRegister } from './InputRegister'

type Inputs = {
  login: string
  password: string
  captcha: string
}

const fields: InputProps[] = [
  {
    label: 'Login',
    placeholder: 'Username ou E-mail',
    name: 'login',
    type: 'text'
  },
  {
    label: 'Senha',
    placeholder: 'Digite sua Senha',
    name: 'password',
    type: 'password'
  }
]

export default function SignIn() {
  const [logging, setLogging] = useState(false)
  const [invalid, setInvalid] = useState<string | null>()
  const [errors, setErrors] = useState<FieldErrors>({})
  const methods = useForm<Inputs>()

  const { authenticate, loading } = useContext(AuthContext)

  const onSubmit: SubmitHandler<Inputs> = async (inputData) => {
    console.log(inputData)
    const errors = loginUserValidation(inputData)
    if (Object.keys(errors).length) {
      setErrors(errors)
      return
    }
    setLogging(true)
    setInvalid(null)
    setErrors({})
    await authenticate(inputData).catch((err) => {
      setLogging(false)
      setInvalid(err.response.data.message)
    })
  }

  return (
    <section className="w-full h-full p-5 rounded-md flex flex-col items-center">
      <div className="bg-zinc-300/50 p-4 md:my-8 rounded-full border border-solid border-white">
        <Key size={60} />
      </div>
      {loading ? (
        <Loading />
      ) : (
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
            {invalid && (
              <p className="pb-4 text-red-500 text-justify pl-1">{invalid}</p>
            )}
            <Captcha externalError={errors.captcha} />
            <div className="flex flex-col py-4 w-full items-center">
              <button
                type="submit"
                className="w-full bg-indigo-700 hover:bg-indigo-500 text-white font-bold py-2 px-4 mb-6 rounded transition-colors duration-150 disabled:opacity-70 flex items-center justify-center gap-2"
                disabled={logging}
              >
                {logging && <Loading />}
                Entrar
              </button>
              <p className="text-base">
                Não tem conta?
                <Link href="/signUp">
                  <a className="text-zinc-500 underline hover:text-zinc-700 transition-colors duration-150 pl-2">
                    Crie agora.
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </FormProvider>
      )}
    </section>
  )
}
