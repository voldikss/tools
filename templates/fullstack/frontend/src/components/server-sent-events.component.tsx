import React from 'react'

import { baseURL } from '../utils/http'

export const ServerSentEvents: React.FC = React.memo(() => {
  console.log('ServerSentEvents')
  React.useEffect(() => {
    console.log('effects')
    const eventSourceURL = new URL('/api/v1/server-sent-events', baseURL)
    console.log(eventSourceURL.toString())
    const eventSource = new EventSource(eventSourceURL.toString(), { withCredentials: true })
    eventSource.onopen = () => {
      console.log('open')
    }
    eventSource.onerror = () => {
      console.log('error')
    }
    eventSource.onmessage = (e) => {
      console.log('received:', e.data)
    }
    return () => eventSource.close()
  })

  return <div>ServerSentEvents</div>
})
