import { Button } from 'antd'
import React from 'react'

export const SimpleCanvas: React.FC = React.memo(() => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    canvasRef.current = document.getElementById('simpleCanvas') as HTMLCanvasElement | null
    const canvasElem = canvasRef.current
    if (!canvasElem) return
    const context = canvasElem.getContext('2d')
    if (!context) return
    console.log(canvasElem.onmousedown)
    canvasElem.onmousedown = (e) => {
      context.moveTo(e.clientX, e.clientY)
      canvasElem.onmousemove = (e) => {
        context.lineTo(e.clientX, e.clientY)
        context.stroke()
      }
    }
    canvasElem.onmouseup = () => {
      canvasElem.onmousemove = null
    }
  })

  const handleClick = async ({ preview, download }: { preview?: boolean; download?: boolean }) => {
    const canvasElem = canvasRef.current
    if (!canvasElem) return
    const blob = await new Promise<Blob | null>((resolve) => canvasElem.toBlob(resolve, 'image/png'))
    if (!blob) return
    const url = URL.createObjectURL(blob)
    if (preview) {
      window.open(url, '_blank')
    }
    if (download) {
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'simple-canvas.png'
      anchor.click()
    }
    URL.revokeObjectURL(url)
  }

  const handleClear = () => {
    const canvasElem = canvasRef.current
    if (!canvasElem) return
    const context = canvasElem.getContext('2d')
    if (!context) return
    context.clearRect(0, 0, canvasElem.width, canvasElem.height)
    context.beginPath()
  }

  return (
    <>
      <canvas
        id='simpleCanvas'
        width={document.body.clientWidth}
        height={(document.body.clientHeight / 4) * 3}
        style={{
          border: '1px solid blue',
        }}
      >
        Your browser doesn't support canvasElem
      </canvas>
      <Button onClick={() => handleClick({ download: true })}>Download</Button>
      <Button onClick={() => handleClick({ preview: true })}>Preview</Button>
      <Button onClick={handleClear}>Clear</Button>
    </>
  )
})
