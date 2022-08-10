import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'

const grantedOrigin = env.CORS_ORIGIN

type ErrorProps = {
  message: string
  statusCode?: number
}
export const error = (
  { message, statusCode }: ErrorProps,
  res: NextApiResponse
) => {
  const status = statusCode || 500
  res.status(status).json({ message })
}

const originCors = (origin: string) => {
  console.log(origin)

  if (!grantedOrigin) {
    return true
  }
  if (grantedOrigin === origin) {
    return true
  } else {
    return null
  }
}

function initMiddleware() {
  return (req: NextApiRequest) =>
    new Promise((resolve, reject) => {
      console.log(req.headers.host)
      if (originCors(req.headers.host as string)) {
        return resolve(true)
      }
      return reject('Blocked by cors')
    })
}

// - You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const NextCors = initMiddleware()

export default NextCors
