// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'server/lib/cors'

// Initializing the cors middleware

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req)

  res.status(200).json({ name: 'John Doe' })
}
