import 'antd/dist/antd.less'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { Chat } from './components/chat.component'
import { Home } from './components/home.component'
import { ServerSentEvents } from './components/server-sent-events.component'
import { SimpleCanvas } from './components/simple-canvas.component'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/chat' element={<Chat />} />
      <Route path='/server-sent-events' element={<ServerSentEvents />} />
      <Route path='/simple-canvas' element={<SimpleCanvas />} />
      <Route path='*' element={<Home />} />
    </Routes>
    <nav>
      <Link to='/chat'>chat</Link>
    </nav>
    <nav>
      <Link to='/server-sent-events'>server sent events</Link>
    </nav>
    <nav>
      <Link to='/simple-canvas'>simple-canvas</Link>
    </nav>
  </BrowserRouter>
)

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<App />)
