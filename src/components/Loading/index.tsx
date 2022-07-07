import { CircleNotch } from 'phosphor-react'
import tw from 'tailwind-styled-components'

export function Loading() {
  return (
    <Wrapper>
      <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
    </Wrapper>
  )
}

const Wrapper = tw.div`
    w-6
    h-6
    flex
    items-center
    justify-center
    overflow-hidden
`
