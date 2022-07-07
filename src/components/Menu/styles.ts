import tw from 'tailwind-styled-components'

export const Wrapper = tw.div`
    px-5
    
    h-full
    flex
    flex-col
    justify-around
    overflow-auto
    relative
`

export const LogoContainer = tw.div`
    w-full
    flex
    justify-center
    items-center
    gap-2
    
    bg-opacity-50
    shadow-md
    p-4
    rounded-2xl
`
export const UserContent = tw.div`
    w-full
    flex
    flex-col
    items-center
`

export const Content = tw.div``

export const Card = tw.div`
    w-full
    min-h-[15rem]
  
`
export const Footer = tw.div`
    absolute
    text-center
    bottom-0
    right-0
    left-0  
`

export const Button = tw.button`
    flex
    w-full
    pl-7
    py-4
    text-zinc-400
    hover:text-zinc-800
    hover:font-bold
    items-center
    gap-12
    rounded-lg
    transition-all
    duration-200
    ease-in-out
    border
    border-transparent
    hover:border
    hover:border-lime-200
    active:bg-zinc-100
    hover:border-opacity-60
    hover:shadow-md
    hover:shadow-lime-200
    focus:ring 
    focus:font-bold
    focus:ring-lime-200
    focus:text-zinc-800
    focus:outline-none
`
