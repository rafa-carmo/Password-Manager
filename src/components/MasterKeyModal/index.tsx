import { Button } from 'components/Button'
import { ErrorContext } from 'contexts/ErrorContext'
import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import { Key, XCircle } from 'phosphor-react'
import { useContext, useState } from 'react'

import * as S from './styles'
export function MasterKeyModal() {
  const { isOpen, setIsOpen } = useContext(ModalContext)
  const [password, setPassword] = useState<string | null>(null)
  const [verifyPassword, setVerifyPassword] = useState(false)
  const { setKeyValue, verifyKey } = useContext(KeyContext)
  const { setErrorValue } = useContext(ErrorContext)
  function closeModal() {
    setIsOpen(false)
  }

  // const router = useRouter()
  // // const { 'passwordManager.token': token } = parseCookies()
  // // if (!token) {
  // //   router.push('/signIn')
  // // }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length > 0) {
      setPassword(e.target.value)
      return
    }
    if (!e.target.value || e.target.value.length === 0) {
      setPassword(null)
    }
  }
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmitPassword()
      return
    }
  }

  async function handleSubmitPassword() {
    setVerifyPassword(true)
    if (password) {
      const verify = await verifyKey(password)
      if (verify === true) {
        setKeyValue(password)

        closeModal()
        setPassword(null)
        setVerifyPassword(false)
        return
      }

      setErrorValue('Key inválida')
      setVerifyPassword(false)

      return
    }
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
        <h2 className="font-bold font-serif text-lg">
          Digite sua chave mestre para visualizar e adicionar senhas.
        </h2>
        <div className="md:flex md:items-center my-6 w-3/4 gap-2">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Master Key
            </label>
          </div>
          <div className="md:w-2/3 w-full">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              onChange={handlePasswordChange}
              onKeyDown={handleEnter}
            />
          </div>
        </div>
        <Button
          label="Unlock"
          loading={verifyPassword}
          onClick={handleSubmitPassword}
          icon={<Key size={22} />}
        />
      </S.Content>
    </S.Wrapper>
  )
}
