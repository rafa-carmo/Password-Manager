import QRCode, { QRCodeRenderersOptions } from 'qrcode'
import { useRef, useEffect } from 'react'

export type QrCodeProps = {
  value?: string
} & QRCodeRenderersOptions

const QrCode = ({ value = '', ...props }: QrCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    QRCode.toCanvas(canvasRef.current, value, { ...props }, (error) => {
      console.log(error)
    })
  }, [value, props])
  return (
    <main>
      <canvas ref={canvasRef}></canvas>
    </main>
  )
}

export default QrCode
