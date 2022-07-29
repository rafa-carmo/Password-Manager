import { ErrorContext } from 'contexts/ErrorContext'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { isValidElement, useContext, useEffect } from 'react'
import { validateUserEmail } from 'server/users'

interface VerifyEmailProps {
  error?: {
    type: 'error'
    message: string
  }
}
const VerifyEmail = ({ error }: VerifyEmailProps) => {
  const router = useRouter()
  const { setErrorValue } = useContext(ErrorContext)

  if (error) {
    setErrorValue(error.message)
  }
  useEffect(() => {
    router.push('/signIn')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <p>verificando....</p>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query

  if (!token) {
    return {
      redirect: {
        destination: '/signIn',
        permanent: false
      }
    }
  }
  const validate = await validateUserEmail(token as string)
  const error: { [key: string]: string } = {}

  if (validate instanceof Error) {
    error.type = 'error'
    error.message = validate.message
  }

  return {
    props: {
      error
    }
  }
}

export default VerifyEmail
