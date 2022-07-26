import tw from 'tailwind-styled-components'

export const Wrapper = tw.main`
    relative
    w-screen
    h-screen
    grid
    place-items-center
    bg-center
    bg-no-repeat
    bg-cover
`

export const Mask = tw.div`
    absolute
    block
    top-0
    bottom-0
    left-0
    right-0
    md:opacity-75
    opacity-90    
    bg-zinc-100
`

export const Content = tw.div`
    relative
    md:bg-zinc-200
    rounded-md
    md:min-w-[30rem]
    md:w-fit
    w-full
    h-full
    min-h-[40rem]
    md:h-fit
    p-5
    `
