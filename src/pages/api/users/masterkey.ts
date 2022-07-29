import CryptoJS from 'crypto-js'
import jwt from 'jwt-simple'
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
import NextCors, { error } from 'server/lib/cors'
import { prisma } from 'server/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req)
  const { method } = req
  if (method === 'POST') {
    if (req.headers.authorization) {
      const {
        masterKey,
        isCreate
      }: { masterKey?: string; isCreate?: boolean } = req.body

      if (!masterKey) {
        return error({ message: 'Key not defined', statusCode: 400 }, res)
      }
      const payload = jwt.decode(
        req.headers.authorization.replace('Bearer ', ''),
        env.JWT_SECRET || ''
      )

      const user = await prisma.user.findFirst({ where: { id: payload.id } })

      if (!user) {
        return error({ message: 'user not found', statusCode: 400 }, res)
      }

      if (isCreate) {
        if (user.masterKey) {
          return error({ message: 'key is defined', statusCode: 400 }, res)
        }

        const masterKeyCrypt = CryptoJS.SHA256(masterKey).toString()
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            masterKey: masterKeyCrypt
          }
        })

        return res.status(200).json({ success: true })
      }

      const masterKeyCrypt = CryptoJS.SHA256(masterKey).toString()
      if (masterKeyCrypt === user.masterKey) {
        return res.status(200).send(true)
      }

      return error({ message: 'Invalid Key', statusCode: 400 }, res)
    }
    return error({ message: 'Token not found', statusCode: 400 }, res)
  }

  return res.status(400).json({ message: 'Method not allowed' })
}
