import Modal from 'react-modal'
import tw from 'tailwind-styled-components'

export const Wrapper = tw(Modal)`
    absolute 
    top-2/4 
    left-2/4 
    right-auto 
    bottom-auto 
    mr-[-50%] 
    translate-x-[-50%] 
    translate-y-[-50%] 
    z-10
`

export const Content = tw.div` relative 
    flex 
    flex-col 
    items-center 
    justify-around 
    bg-white 
    w-full 
    h-full 
    md:min-w-[50rem] 
    md:min-h-[10rem]
    transition-all
    duration-200
    p-5 
    rounded-md 
    border-gray-600/50 
    border 
    opacity-100
`

export const Form = tw.form`
    flex
    items-center 
    justify-center
    w-full 
    gap-4
`
