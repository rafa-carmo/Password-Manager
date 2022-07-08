import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import * as S from './styles'

interface InputComponentProps {
  label: string
  name: string
  id?: string
}

export function InputComponent({ label, name, id }: InputComponentProps) {
  const [active, setActive] = useState(false)
  const { register } = useFormContext()

  function handleChange(value: string) {
    if (value !== '') {
      setActive(true)
      return
    }
    setActive(false)
  }

  return (
    <div className="flex flex-col relative group">
      <S.LabelInput htmlFor={id ? id : name} active={active}>
        {label}
      </S.LabelInput>

      <input
        type="text"
        className="rounded w-full h-10"
        id={id ? id : name}
        // name={name}
        {...register(name)}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  )
}
