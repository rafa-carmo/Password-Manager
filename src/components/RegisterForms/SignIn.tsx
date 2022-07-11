import { Loading } from 'components/Loading'
import { AuthContext } from 'contexts/AuthContext'
import { Eye, Key, EyeClosed } from 'phosphor-react'
import React, { useState } from 'react'
import { useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  login: string
  password: string
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [logging, setLogging] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>()
  const { authenticate, loading } = useContext(AuthContext)

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLogging(true)
    setInvalid(false)
    await authenticate(data).catch(() => {
      setLogging(false)
      setInvalid(true)
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xs h-full flex flex-col items-center justify-around text-2xl md:text-base"
        >
          <div className="w-full">
            <div className="flex flex-col py-4">
              <label className="pl-2" htmlFor="username">
                Username
              </label>
              <input
                className={`rounded-xl w-full ${invalid && 'border-red-500'}`}
                type="text"
                id="username"
                {...register('login')}
                placeholder="Usuário ou Email"
              />
            </div>
            <div className="flex flex-col py-4">
              <label className="pl-2" htmlFor="password">
                Password
              </label>
              <div className="relative w-full">
                <input
                  className={`rounded-xl w-full ${invalid && 'border-red-500'}`}
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  id="password"
                  placeholder="Sua senha"
                />

                <button
                  type="button"
                  className="absolute right-2 top-0 bottom-0 my-auto"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
                </button>
              </div>
            </div>
          </div>
          {invalid && (
            <p className="pb-4 text-red-500">Usuario ou senha incorretos</p>
          )}
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
              <a
                href="#"
                className="text-zinc-500 underline hover:text-zinc-700 transition-colors duration-150 pl-2"
              >
                Crie agora.
              </a>
            </p>
          </div>
        </form>
      )}
    </section>
  )
}
