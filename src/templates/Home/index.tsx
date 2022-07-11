import { CreatePasswordModal } from 'components/CreatePasswordModal'
import Head from 'components/Head'
import { Table, TableProps } from 'components/Table'
import { KeyContext } from 'contexts/KeyContext'
import { ModalContext } from 'contexts/ModalOpen'
import { Key } from 'phosphor-react'
import { useContext, useState } from 'react'
import Base from 'templates/Base'

import DropdownSorted from './DropdownSorted'
import * as S from './styles'

export interface HomeProps {
  table: TableProps
}

export function HomeTemplate({ table }: HomeProps) {
  const [createModal, setCreateModal] = useState(false)
  const { key } = useContext(KeyContext)
  const { setIsOpen } = useContext(ModalContext)
  function addPasswordModal() {
    if (!key) {
      return setIsOpen(true)
    }
    return setCreateModal(true)
  }
  return (
    <Base menuProps={{ countPasswords: table.rows.length }}>
      <S.Wrapper>
        <S.HeadContainer>
          <Head />
        </S.HeadContainer>
        <S.TableContainer>
          <S.ButtonContainer>
            <DropdownSorted />
            <S.Button onClick={addPasswordModal}> Adicionar Senha</S.Button>
            <CreatePasswordModal
              show={createModal}
              onClose={() => setCreateModal(false)}
            />
          </S.ButtonContainer>
          <Table {...table} />
        </S.TableContainer>
      </S.Wrapper>
    </Base>
  )
}
