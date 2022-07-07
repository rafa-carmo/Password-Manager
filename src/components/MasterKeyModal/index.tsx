import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import { Key, XCircle } from 'phosphor-react'
import { useContext, useState } from 'react'
import Modal from 'react-modal'

import * as S from './styles'
export function MasterKeyModal() {
  const { isOpen, setIsOpen } = useContext(ModalContext)
  const [password, setPassword] = useState<string | null>(null)
  const { setKeyValue } = useContext(KeyContext)
  function closeModal() {
    setIsOpen(false)
  }

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

  function handleSubmitPassword() {
    if (password) {
      setKeyValue(password)
      closeModal()
      setPassword(null)
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
          Digite sua chave mestre para visualizar as outras senhas
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
        <button
          disabled={!password}
          onClick={handleSubmitPassword}
          className="inline-flex overflow-hidden text-white bg-gray-900 rounded group disabled:opacity-50"
        >
          <span className="px-3.5 py-2 text-white  bg-lime-500 group-disabled:group-hover:bg-lime-500 group-hover:bg-lime-600 transition-colors duration-100 flex items-center justify-center">
            <Key size={22} />
          </span>
          <span className="pl-4 pr-5 py-2.5">Unlock</span>
        </button>
      </S.Content>
    </S.Wrapper>
  )
}
