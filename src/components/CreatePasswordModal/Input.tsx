import * as S from './styles'

interface InputPasswordModalProps {
  label: string
  name: string
  id?: string
}

export function InputPasswordModal({
  label,
  name,
  id
}: InputPasswordModalProps) {
  return (
    <div className="flex flex-col relative group">
      <label
        className="absolute left-2 top-2 bg-transparent px-1 text-zinc-400 group-focus-within:text-zinc-600 group-focus-within:bg-white group-focus-within:left-1 group-focus-within:top-[-1rem] transition-all duration-300 ease-in-out"
        htmlFor={id ? id : name}
      >
        {label}
      </label>

      <input
        type="text"
        className="rounded w-full h-10"
        id={id ? id : name}
        name={name}
      />
    </div>
  )
}
