import { Eye, EyeClosed } from 'phosphor-react'
import { useState } from 'react'
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
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="flex flex-col py-2">
      <label className="pl-2" htmlFor={name}>
        {label}
      </label>
      <div className="relative w-full">
        <input
          className={`rounded-xl w-full ${error && 'border-red-300'} `}
          type={type === 'text' ? 'text' : showPassword ? 'text' : 'password'}
          id={name}
          {...register(name)}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute right-2 top-0 bottom-0 my-auto"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeClosed size={20} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-400 pl-2 text-justify">{error}</p>
      )}
    </div>
  )
}
