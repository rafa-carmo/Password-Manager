import React from 'react'

import * as S from './styles'

type SignInTemplateProps = {
  children: React.ReactNode
}

export function SignInTemplate({ children }: SignInTemplateProps) {
  return (
    <S.Wrapper style={{ backgroundImage: 'url(/assets/desk.jpg)' }}>
      <S.Mask>
        <p className="absolute bottom-0 right-2 opacity-40 md:text-sm text-xs font-serif">
          Photo by Dose Media on Unsplash
        </p>
      </S.Mask>

      <S.Content>{children}</S.Content>
    </S.Wrapper>
  )
}
