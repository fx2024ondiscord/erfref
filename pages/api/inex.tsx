import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [status, setStatus] = useState('Offline')

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('/api/bot-status')
        const data = await response.json()
        setStatus(data.status)
      } catch (error) {
        console.error('Error checking bot status:', error)
        setStatus('Error')
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Discord Bot Status</CardTitle>
          <CardDescription>Roblox Key System</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-center">
            {status === 'Online' ? '🟢' : '🔴'} {status}
          </p>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </CardFooter>
      </Card>
    </div>
  )
}

