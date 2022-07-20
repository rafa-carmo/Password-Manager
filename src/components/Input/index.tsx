import generator from 'generate-password'
import { Gear } from 'phosphor-react'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import * as S from './styles'

interface InputComponentProps {
  label: string
  name: string
  valuePre?: string
  id?: string
  autocomplete?: 'on' | 'off'
  autoPassword?: boolean
  disabled?: boolean
}

export function InputComponent({
  label,
  name,
  id,
  valuePre,
  autocomplete,
  disabled,
  autoPassword
}: InputComponentProps) {
  const [active, setActive] = useState(!!valuePre)
  // const [value, setValue] = useState(valuePre || '')
  const { register, setValue } = useFormContext()

  function handleChange(value: string) {
    if (value !== '') {
      setActive(true)
      setValue(name, value)
      return
    }
    setValue(name, value)
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

    setActive(true)
    setValue(name, password)

    return
  }

  return (
    <div className="flex flex-col relative group w-full mt-1">
      <S.LabelInput htmlFor={id ? id : name} active={active}>
        {label}
      </S.LabelInput>

      <input
        type="text"
        className="rounded w-full h-10 disabled:border-black/10 disabled:text-zinc-500"
        id={id ? id : name}
        autoComplete={autocomplete}
        disabled={disabled}
        {...register(name)}
        value={valuePre}
        onChange={(event) => handleChange(event.target.value)}
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
