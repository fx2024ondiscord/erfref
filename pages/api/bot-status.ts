import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  status: 'Online' | 'Offline'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Implement actual status checking logic here
  const isOnline = true // Replace with actual check

  res.status(200).json({ status: isOnline ? 'Online' : 'Offline' })
}

