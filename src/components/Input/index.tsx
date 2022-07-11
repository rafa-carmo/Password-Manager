import generator from 'generate-password'
import { Gear } from 'phosphor-react'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import * as S from './styles'

interface InputComponentProps {
  label: string
  name: string
  id?: string
  autocomplete?: 'on' | 'off'
  autoPassword?: boolean
}

export function InputComponent({
  label,
  name,
  id,
  autocomplete,
  autoPassword
}: InputComponentProps) {
  const [active, setActive] = useState(false)
  const { register } = useFormContext()
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleChange(value: string) {
    if (value !== '') {
      setActive(true)
      return
    }
    setActive(false)
  }

  function createSecurePassword() {
    const password = generator.generate({
      excludeSimilarCharacters: true,
      lowercase: true,
      numbers: true,
      uppercase: true,
      symbols: true,
      length: 10
    })
    if (inputRef.current) {
      setActive(true)
      inputRef.current.value = password
    }
    return
  }

  return (
    <div className="flex flex-col relative group w-full mt-1">
      <S.LabelInput htmlFor={id ? id : name} active={active}>
        {label}
      </S.LabelInput>

      <input
        type="text"
        className="rounded w-full h-10"
        id={id ? id : name}
        {...register(name)}
        onChange={(event) => handleChange(event.target.value)}
        autoComplete={autocomplete}
        ref={inputRef}
      />
      {autoPassword && (
        <div className="flex w-full items-center justify-center gap-3 mt-2">
          <button type="button" onClick={createSecurePassword}>
            Password seguro
          </button>
          <Gear size={22} />
        </div>
      )}
    </div>
  )
}
