import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface CaptchaProps {
  externalError?: string
}

export function Captcha({ externalError }: CaptchaProps) {
  const [token, setToken] = useState('')
  const [error, setError] = useState<string | null>()
  const captchaRef = useRef<HCaptcha>(null)
  const { register, setValue } = useFormContext()

  useEffect(() => {
    if (token) {
      setValue('captcha', token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  function verifyToken(token: string) {
    setToken(token)
    setError(null)
  }

  useEffect(() => {
    captchaRef.current?.resetCaptcha()
  }, [externalError])

  return (
    <>
      <HCaptcha
        sitekey="475d3031-7931-4f41-91e3-c6c8f9db81ca"
        onVerify={(token) => verifyToken(token)}
        onExpire={() => setError('Captcha expirado.')}
        onError={() =>
          setError('Algo deu errado, atualize a pagina e tente novamente')
        }
        onChalExpired={() => setError('Expirado')}
        {...register('captcha')}
        ref={captchaRef}
      />
      {error && <p className="text-red-400">{error}</p>}
      {externalError && <p className="text-red-400">{externalError}</p>}
    </>
  )
}
