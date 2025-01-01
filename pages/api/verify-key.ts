import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  success: boolean
  websiteUrl?: string
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

  const { key, userId } = req.body

  if (!key || !userId) {
    return res.status(400).json({ success: false, message: 'Missing key or userId' })
  }

  const keyData = keys[key]

  if (!keyData) {
    return res.status(400).json({ success: false, message: 'Invalid key' })
  }

  if (keyData.userId !== userId) {
    return res.status(400).json({ success: false, message: 'Key does not belong to this user' })
  }

  // Generate checkpoint URLs (implement your logic here)
  const websiteUrl = `https://your-checkpoint-url.com/${key}`

  res.status(200).json({ success: true, websiteUrl })
}

