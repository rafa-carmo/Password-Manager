import tw from 'tailwind-styled-components'

export const Wrapper = tw.main`    

    relative
`

export const HeadContainer = tw.div`
    px-20
    pt-10
`
export const TableContainer = tw.div`
    px-5
    mt-5
`

export const ButtonContainer = tw.div`
    w-full
    flex
    px-7
    py-4
    justify-end
    gap-5
`
export const Button = tw.button`
    flex
    w-fit
    
    px-4
    py-2
    rounded-sm
    text-center
    bg-black
    bg-opacity-60
    text-zinc-200
    transition-all
    duration-200
    ease-in-out
    hover:bg-zinc-800
    active:bg-zinc-700

`
