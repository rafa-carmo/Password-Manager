import { Lock, LockKeyOpen } from 'phosphor-react'

type HiddenFieldProps = {
  show: boolean
  showLock?: boolean
  field: string
}

export default function HiddenField({
  show,
  showLock = false,
  field
}: HiddenFieldProps) {
  return (
    <>
      {showLock && (
        <div className="h-full flex items-center">
          {show ? (
            <LockKeyOpen size={22} weight="fill" />
          ) : (
            <Lock size={22} weight="bold" />
          )}
        </div>
      )}
      <p className="pr-2 truncate min-w-[15rem] text-center">
        {show ? field : '*'.repeat(30)}
      </p>
    </>
  )
}
