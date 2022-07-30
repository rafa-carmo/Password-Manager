import { Button } from 'components/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'

import LockSvg from '../../assets/lock.svg'
import PersonSvg from '../../assets/person.svg'
import * as S from './styles'

export function Landingpage() {
  const router = useRouter()
  return (
    <S.Wrapper>
      <S.Menu>
        <p>
          <LockSvg className="md:w-12 md:h-12 w-8 h-8" />
        </p>
        <S.ButtonsContainer>
          <Link href="/signIn">
            <a>Entrar</a>
          </Link>
          <Button label="Cadastre-se" onClick={() => router.push('/signUp')} />
        </S.ButtonsContainer>
      </S.Menu>
      <S.Content>
        <S.DescriptionContainer>
          <h3 className="pl-2 pb-2 text-6xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-zinc-500 drop-shadow">
            Password Manager
          </h3>

          <p className="w-full md:min-h-[10rem]">
            Gerencie suas senhas de um forma simples.
          </p>
        </S.DescriptionContainer>

        <S.ImageContainer>
          <div className="z-10 relative ">
            <PersonSvg className="w-full h-full" />
          </div>
          <div className="absolute z-10 top-20 left-10">
            <LockSvg className="w-32 h-32" />
          </div>
          <div
            className="bg-white overflow-hidden absolute top-0 bottom-0 left-0 right-0 z-0"
            style={{
              content: ' ',
              borderRadius: '81% 19% 85% 15% / 31% 66% 34% 69%'
            }}
          ></div>
        </S.ImageContainer>
      </S.Content>
    </S.Wrapper>
  )
}

// <div className="grid place-items-center h-screen bg-zinc-200">
//   <Link href="/signIn">
//     <a className="px-8 py-2 bg-sky-900 hover:bg-sky-800 transition-colors border border-black text-white rounded">
//       Logar
//     </a>
//   </Link>
// </div>
