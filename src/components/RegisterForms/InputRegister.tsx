import { useFormContext } from 'react-hook-form'

export interface InputProps {
  name: string
  type: 'text' | 'password'
  placeholder?: string
  label: string
  error?: string
}

export function InputRegister({
  name,
  type,
  placeholder,
  label,
  error
}: InputProps) {
  const { register } = useFormContext()
  return (
    <div className="flex flex-col py-2">
      <label className="pl-2" htmlFor={name}>
        {label}
      </label>
      <input
        className={`rounded-xl w-full ${error && 'border-red-300'} `}
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-400 pl-2">{error}</p>}
    </div>
  )
}
