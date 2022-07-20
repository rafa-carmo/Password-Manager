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
      const { masterKey }: { masterKey?: string } = req.body
      if (!masterKey) {
        return error({ message: 'Key not defiend', statusCode: 400 }, res)
      }
      const payload = jwt.decode(
        req.headers.authorization.replace('Bearer ', ''),
        env.JWT_SECRET || ''
      )

      const user = await prisma.user.findFirst({ where: { id: payload.id } })

      const masterKeyCrypt = CryptoJS.SHA256(masterKey).toString()
      if (masterKeyCrypt === user?.masterKey) {
        return res.status(200).send(true)
      }

      return res.status(400).send({})
    }
    return res.status(400).send({})
  }

  return res.status(400).json({ message: 'Method not allowed' })
}
