import { Clipboard } from 'phosphor-react'
import { useState } from 'react'
type ClipboardComponentProps = {
  text: string
}

export default function ClipboardComponent({ text }: ClipboardComponentProps) {
  const [copied, setCopied] = useState(false)

  function handleCopied() {
    setCopied(true)
    navigator.clipboard.writeText(text)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  return (
    <>
      {copied ? (
        <p>Copied</p>
      ) : (
        <button className="h-full flex items-center" onClick={handleCopied}>
          <Clipboard size={22} />
        </button>
      )}
    </>
  )
}
