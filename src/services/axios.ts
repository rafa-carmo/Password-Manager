import axios from 'axios'
import * as express from 'express'
import * as next from 'next'
import { parseCookies } from 'nookies'
import { env } from 'process'

export function getAPIClient(
  ctx?:
    | Pick<next.NextPageContext, 'req'>
    | {
        req: next.NextApiRequest
      }
    | {
        req: express.Request
      }
    | null
    | undefined
) {
  const { 'passwordManager.token': token } = parseCookies(ctx)
  const api = axios.create({
    baseURL: env.FRONTEND_URL
  })
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return api
}
