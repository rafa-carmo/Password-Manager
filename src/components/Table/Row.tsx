import QrCode from 'components/QrCode/'
import { ErrorContext } from 'contexts/ErrorContext'
import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import CryptoJS from 'crypto-js'
import { Eye, EyeClosed, Lock, Tag, XSquare } from 'phosphor-react'
import { useContext, useState, useEffect } from 'react'
import { MdQrCodeScanner } from 'react-icons/md'

import ModalComponent from '../Modal/index'
import ClipboardComponent from './ClipboardComponent'
import HiddenField from './HiddenField'

export type RowProps = {
  title: string
  tags?: {
    id: string
    name: string
  }[]
  loginEncrypt?: string
  passwordEncrypt: string
}

export default function Row({
  title,
  tags,
  passwordEncrypt,
  loginEncrypt
}: RowProps) {
  const [show, setShow] = useState(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [qrCodeShow, setQrCodeShow] = useState('')
  const [login, setLogin] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const { key, deleteKey } = useContext(KeyContext)
  const { setErrorValue } = useContext(ErrorContext)
  const { setIsOpen } = useContext(ModalContext)

  useEffect(() => {
    if (!key) {
      setShow(false)
      setLogin(null)
      setPassword(null)
      return
    }

    loginEncrypt &&
      setLogin(
        CryptoJS.AES.decrypt(loginEncrypt, key).toString(CryptoJS.enc.Utf8)
      )
    setPassword(
      CryptoJS.AES.decrypt(passwordEncrypt, key).toString(CryptoJS.enc.Utf8)
    )
    if (password === '') {
      setErrorValue('Senha inválida')
      deleteKey()
    }
  }, [key, deleteKey, setErrorValue, loginEncrypt, passwordEncrypt, password])

  function handleClickUnlock() {
    setIsOpen(true)
  }

  function handleShowModal(text: string) {
    setQrCodeShow(text)
    setModalOpen(true)
  }

  function handleCloseModal() {
    setModalOpen(false)
  }

  return (
    <tr className="focus:outline-none flex justify-between h-full border border-gray-100 dark:border-gray-600 rounded py-3">
      <td className="max-w-md min-w-[10rem] h-full outline-red-400">
        <div className="pl-5">
          <p className="text-base font-medium leading-none h-full text-zinc-400 mr-2 transition-all duration-150 hover:text-zinc-800 truncate  py-2">
            {title}
          </p>
        </div>
      </td>
      <td className="px-5">
        <div className="flex h-full items-center">
          <Tag size={22} />
          {tags && tags?.length > 0 ? (
            <p className="text-sm leading-none text-gray-600 ml-2">
              {tags.slice(0, 2).map((tag) => tag.name + ', ')}
              {tags.length > 2 && '...'}
            </p>
          ) : (
            <p className="ml-4">Nenhuma tag associada</p>
          )}
        </div>
      </td>
      <div className="w-full min-w-[15rem] flex items-center gap-2 justify-end">
        {login && (
          <>
            <p className="text-base font-medium leading-none h-full text-zinc-400 mr-2 transition-all duration-75 hover:text-zinc-800 truncate hover:overflow-visible hover:text-clip hover:relative hover:w-fit hover:bg-white py-2">
              Login
            </p>

            <HiddenField show={show} field={login} />
            {key ? (
              <ClipboardComponent text={login} />
            ) : (
              <button onClick={handleClickUnlock} about="Unlock">
                <Lock size={22} />
              </button>
            )}
          </>
        )}
      </div>
      <td className="w-full min-w-[15rem] flex items-center gap-2 justify-end">
        <HiddenField show={show} showLock={!!password} field={password || ''} />
      </td>
      <td className="flex gap-2 items-center pr-5">
        {!!password ? (
          <>
            <button onClick={() => handleShowModal(password)}>
              <MdQrCodeScanner size={22} />
            </button>
            <ClipboardComponent text={password} />
            <button onClick={() => setShow(!show)}>
              {show ? <Eye size={22} /> : <EyeClosed size={22} />}
            </button>
          </>
        ) : (
          <button onClick={handleClickUnlock} about="Unlock">
            <Lock size={22} />
          </button>
        )}
      </td>
      {modalOpen && (
        <ModalComponent isOpen={modalOpen} onRequestClose={handleCloseModal}>
          <div className="relative bg-zinc-200 p-2 rounded-lg">
            <div
              className="absolute right-1 top-1 bg-white rounded-sm cursor-pointer"
              onClick={handleCloseModal}
            >
              <XSquare size={22} />
            </div>
            <div className="flex flex-col items-center p-2">
              Use um leitor de Qr-code.
            </div>
            <div className="p-5">
              <QrCode value={qrCodeShow} width={200} />
            </div>
          </div>
        </ModalComponent>
      )}
    </tr>
  )
}
