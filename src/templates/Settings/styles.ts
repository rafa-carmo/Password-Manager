import tw from 'tailwind-styled-components'

export const Wrapper = tw.div`
    grid
    min-h-screen
    place-items-center
`

export const Form = tw.form`
    bg-zinc-200/10
    border
    
    w-[90%]
    h-[calc(fit-content + 4rem)]
    px-5
    py-10
    rounded-lg
    flex
    flex-col
    gap-5
`

export const Title = tw.h3`
    text-2xl
    text-center
`
