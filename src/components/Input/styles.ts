import tw from 'tailwind-styled-components'

export const LabelInput = tw.label`
    absolute 
    left-2 
    top-2 
    bg-transparent 
    px-1 
    text-zinc-400 

    transition-all 
    duration-300 
    ease-in-out
    ${({ active }: { active: boolean }) => `
        ${
          active
            ? `
        text-zinc-600 
        bg-white 
        left-1 
        top-[-1rem] 
        `
            : `
    group-focus-within:text-zinc-600 
    group-focus-within:bg-white 
    group-focus-within:left-1 
    group-focus-within:top-[-1rem] 
    `
        }
    `}
`
