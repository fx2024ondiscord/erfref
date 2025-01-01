import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

type Data = {
  success: boolean
  key?: string
  message?: string
}

// In-memory storage for demonstration. Use a database in production.
const keys: { [key: string]: { userId: string, link: string } } = {}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { link, userId } = req.body

  if (!link || !userId) {
    return res.status(400).json({ success: false, message: 'Missing link or userId' })
  }

  // Validate Roblox link (basic check, enhance as needed)
  if (!link.startsWith('https://www.roblox.com/')) {
    return res.status(400).json({ success: false, message: 'Invalid Roblox link' })
  }

  const key = uuidv4()
  keys[key] = { userId, link }

  res.status(200).json({ success: true, key })
}

