import { CreatePasswordModal } from 'components/CreatePasswordModal'
import Head from 'components/Head'
import { Table } from 'components/Table'
import Base from 'templates/Base'

import DropdownSorted from './DropdownSorted'
import * as S from './styles'

export function HomeTemplate() {
  return (
    <Base>
      <S.Wrapper>
        <S.HeadContainer>
          <Head />
        </S.HeadContainer>
        <S.TableContainer>
          <S.ButtonContainer>
            <DropdownSorted />
            <S.Button>Adicionar Senha</S.Button>
            <CreatePasswordModal />
          </S.ButtonContainer>
          {/* {Array.from(Array(50)).map((_, index) => (
            <Table key={index} />
          ))} */}
          <Table />
        </S.TableContainer>
      </S.Wrapper>
    </Base>
  )
}
