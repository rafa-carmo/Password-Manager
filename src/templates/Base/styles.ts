import tw from 'tailwind-styled-components'

export const Wrapper = tw.main`
    w-screen
    h-screen
    flex
    flex-row
    overflow-y-auto
    relative
`

export const Error = tw.div`
    absolute
    
    right-0
    left-0
    mx-auto
    w-fit
    transition-all
    duration-300
    bg-red-100
    rounded
    px-4
    py-2
    top-[-5rem]
    opacity-0
    z-50
    ${({ active }: { active: boolean }) => active && `top-5 opacity-100`}
`
export const ErrorText = tw.p`
    text-zinc-600
`

export const MenuContainer = tw.div`
    min-w-[20rem]
    h-screen
    bg-brand-50
    border-r-4
    border-zinc-100
    border-opacity-60
`
export const Content = tw.div`
    w-full
    h-full
    overflow-x-auto
    relative
    scrollbar-thin
    scrollbar-thumb-zinc-300
    scrollbar-thumb-rounded-full
    pb-20
    `

export const FooterContent = tw.div`
    fixed
    bottom-0
    right-0

    max-h-20
    bg-zinc-100
    px-2
    py-1
    flex
    items-center
    justify-end
    gap-2
`
