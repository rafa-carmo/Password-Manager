import { Button } from 'components/Button'
import { AuthContext } from 'contexts/AuthContext'
import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import { Key, XCircle } from 'phosphor-react'
import { useContext, useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { api } from 'services/api'
import { createMasterKeyValidation } from 'utils/validations/masterKey'

type Inputs = {
  password: string
  repeatePassword: string
}

import * as S from './styles'
export function CreateMasterKey() {
  const { isOpen, setIsOpen } = useContext(ModalContext)
  const [savingKey, setSavingKey] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const { setKeyValue } = useContext(KeyContext)
  const { reloadUser } = useContext(AuthContext)
  const { register, handleSubmit } = useForm<Inputs>()

  function closeModal() {
    setIsOpen(false)
  }

  async function submitMasterKey(inputData: Inputs) {
    const errors = createMasterKeyValidation(inputData)
    if (Object.keys(errors).length) {
      setErrors(errors)
      return
    }
    setErrors({})
    setSavingKey(true)
    await api
      .post('/api/users/masterkey', {
        masterKey: inputData.password,
        isCreate: true
      })
      .then(() => {
        reloadUser()
        setKeyValue(inputData.password)
        closeModal()
      })
      .catch((err) => console.log(err))
    setSavingKey(false)
  }
  return (
    <S.Wrapper
      isOpen={isOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={100}
      contentLabel="Master key"
    >
      <S.Content isOpen={isOpen}>
        <button
          className="absolute right-2 top-2 opacity-60 transition-opacity duration-75 hover:opacity-95"
          onClick={() => setIsOpen(false)}
        >
          <XCircle size={22} />
        </button>
        <form
          className="flex items-center justify-center w-full flex-col"
          onSubmit={handleSubmit(submitMasterKey)}
        >
          <h2 className="font-bold font-serif text-lg text-center">
            Antes de cadastrar uma senha, iremos cadastrar sua senha master.
            <p className="text-zinc-500 text-sm">
              Atenção: Não perca essa senha, pois não sera possivel restaura-la.
            </p>
          </h2>
          <div className="md:flex md:items-start md:justify-center my-6 w-3/4 gap-2 flex-col">
            <div className="md:w-full flex justify-between items-center">
              <label
                className="block text-gray-500 font-bold mb-1 md:mb-0 mr-4 w-fit fk"
                htmlFor="inline-password"
              >
                Master Key
              </label>
              <input
                className={`bg-gray-200 appearance-none border-2 ${
                  errors.password ? 'border-red-300' : 'border-gray-200'
                } rounded w-3/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
                id="inline-password"
                type="password"
                {...register('password')}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-center w-full text-red-400">
                {errors.password}
              </p>
            )}
            <hr className="bg-zinc-400 px-4 w-full my-2" />
            <div className="md:w-full flex justify-between">
              <label
                className="block text-gray-500 font-bold mb-1 md:mb-0 mr-4 w-fit"
                htmlFor="repeate-password"
              >
                Repetir Key
              </label>
              <input
                className={`bg-gray-200 appearance-none border-2 ${
                  errors.repeatePassword ? 'border-red-300' : 'border-gray-200'
                }  rounded w-3/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
                id="repeate-password"
                type="password"
                {...register('repeatePassword')}
              />
            </div>
            {errors.repeatePassword && (
              <p className="text-xs text-center w-full text-red-400">
                {errors.repeatePassword}
              </p>
            )}
          </div>

          <Button loading={savingKey} label="Salvar" icon={<Key size={22} />} />
        </form>
      </S.Content>
    </S.Wrapper>
  )
}
