import tw from 'tailwind-styled-components'

export const Wrapper = tw.div`
    relative
    bg-zinc-200
`

export const Menu = tw.div`
    flex
    items-center
    justify-between
    md:py-5
    md:px-14
    pr-2
    pt-2
    md:absolute
    w-full
`
export const ButtonsContainer = tw.div`
    flex
    gap-5
    items-center
`

export const Content = tw.div`
    w-full
    min-h-screen
    flex
    flex-col
    md:flex-row
    items-center
    justify-center
    md:gap-5
    md:px-20
`

export const DescriptionContainer = tw.div`
    md:max-w-[40%]
    w-full
    p-5
    flex
    flex-col
    gap-5
`

export const ImageContainer = tw.div`
    md:w-[35%] 
    w-[90%]
    relative
    p-4
`
