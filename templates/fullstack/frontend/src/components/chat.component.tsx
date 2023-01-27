import { Button, Divider, Input, List, Typography } from 'antd'
import React from 'react'

import { sleep } from '../utils'
import { HTTPClient } from '../utils/http'

export const Chat: React.FC = React.memo(() => {
  const [incommingMessages, setIncomingMessages] = React.useState<string[]>([])
  const [outgoingMessage, setOutgoingMessage] = React.useState('')

  const subscribe = async () => {
    const response = await HTTPClient.get('/api/v1/chat/subscribe', {
      validateStatus: () => true,
    })
    if (response.status === 502) {
      console.log('timedout')
    } else if (response.status !== 200) {
      console.log(response.statusText)
      await sleep(1000)
    } else {
      const { data } = response
      const msgs = typeof data === 'string' ? data.split(',') : data
      setIncomingMessages(msgs)
    }
    await subscribe()
  }

  React.useEffect(() => {
    subscribe()
    // const userApiUrl = new URL('api/v1/users', baseUrl)
    // axios.get(userApiUrl.toString()).then((x) => {
    //   console.log(x.data)
    // })
  }, [])

  const publish = async () => {
    return await HTTPClient.post('/api/v1/chat/publish', outgoingMessage, {
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
  }

  return (
    <>
      <Typography.Text>All visitors of this page will see messages of each other</Typography.Text>
      <Input value={outgoingMessage} onChange={(e) => setOutgoingMessage(e.target.value)} />
      <Button onClick={publish}>Send</Button>
      <Divider />
      <List bordered size='large' split header='messages'>
        {incommingMessages.map((msg) => (
          <List.Item key={msg}>{msg}</List.Item>
        ))}
      </List>
    </>
  )
})
