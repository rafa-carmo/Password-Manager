import * as S from './styles'

interface ButtonProps {
  label: string
  icon?: React.ReactNode
}

export function Button({ icon, label }: ButtonProps) {
  return (
    <button className="inline-flex overflow-hidden text-white bg-gray-900 rounded group disabled:opacity-50">
      {icon && (
        <span className="px-3.5 py-2 text-white  bg-lime-500 group-disabled:group-hover:bg-lime-500 group-hover:bg-lime-600 transition-colors duration-100 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="pl-4 pr-5 py-2.5">{label}</span>
    </button>
  )
}
