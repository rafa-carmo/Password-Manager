import { MasterKeyModal } from 'components/MasterKeyModal'
import Menu from 'components/Menu'
import { ErrorContext } from 'contexts/ErrorContext'
import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import { Lock, LockKeyOpen } from 'phosphor-react'
import { useRef, useEffect, useState, useContext } from 'react'

import * as S from './styles'

interface BaseProps {
  children: React.ReactNode
}

export default function Base({ children }: BaseProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const { time, deleteKey, status } = useContext(KeyContext)
  const { error } = useContext(ErrorContext)
  const { setIsOpen } = useContext(ModalContext)
  const updateDimensions = () => {
    if (ref.current) {
      setWidth(ref.current.clientWidth)
    }
  }
  useEffect(() => {
    window.addEventListener('resize', updateDimensions)
    setWidth(ref.current?.offsetWidth || 0)
    return () => {
      window.removeEventListener('resize', updateDimensions)
      console.log(window.innerHeight)
    }
  }, [ref.current?.offsetWidth])

  return (
    <S.Wrapper>
      <S.Error active={error ? true : false}>
        {error && <S.ErrorText>{error}</S.ErrorText>}
      </S.Error>
      <S.MenuContainer>
        <Menu />
      </S.MenuContainer>
      <S.Content ref={ref}>
        <MasterKeyModal />
        {children}
      </S.Content>
      <S.FooterContent style={{ width }}>
        {status === 'RUNNING' ? (
          <>
            <button onClick={deleteKey}>
              <Lock size={15} />
            </button>
            <p>Key valid for: {time}</p>
          </>
        ) : (
          <button onClick={() => setIsOpen(true)}>
            <LockKeyOpen size={15} />
          </button>
        )}
      </S.FooterContent>
    </S.Wrapper>
  )
}
