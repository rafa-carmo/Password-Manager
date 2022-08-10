import jwt from 'jwt-simple'
import { NextApiRequest, NextApiResponse } from 'next'
import { env } from 'process'
import NextCors, { error } from 'server/lib/cors'
import { prisma } from 'server/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // await NextCors(req)
  const method = req.method
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return error({ message: 'Token is required', statusCode: 400 }, res)
  }
  if (method === 'GET') {
    try {
      const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
      const { id } = tokenData
      const passwords = await prisma.password.findMany({
        where: {
          userId: id
        },
        include: {
          tags: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
      return res.status(200).json(passwords)
    } catch (error) {}
  }

  if (method === 'POST') {
    type BodyData = {
      title: string
      login: string
      password: string
      tags: string
    }

    const tokenData = jwt.decode(token as string, env.JWT_SECRET || '')
    const { id } = tokenData
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!user || !user.isVerified) {
      return error(
        { message: 'Usuario não encontrado ou não validado', statusCode: 400 },
        res
      )
    }
    const { title, login, password, tags }: BodyData = req.body

    const camelize = (str: string) => {
      const words = str.split(' ')
      // console.log(words)

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1)
      }
      return words.join(' ')
    }

    const tagsArray = tags.split(',')
    console.log(tagsArray)
    if (tagsArray.length > 0 && tagsArray[0] !== '') {
      for (let i = 0; i < tagsArray.length; i++) {
        tagsArray[i] = camelize(tagsArray[i].trim())
      }
    }

    await prisma.password.create({
      data: {
        title,
        login,
        password,
        userId: user.id,
        tags: {
          connectOrCreate: tagsArray.map((tag) => ({
            where: {
              name: tag
            },
            create: {
              name: tag
            }
          }))
        }
      }
    })

    return res.status(200).json({ message: 'success' })
  }
  res.status(200).json({ name: 'John Doe' })
}
