import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ColorPicker,
  Label,
  NumberInput,
  Select,
  TextArea,
} from './components'
import QRCodeStyling from 'qr-code-styling'
import { Download } from 'lucide-react'
import './App.css'

function App() {
  const [url, setUrl] = useState('https://example.com')
  const ref = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)
  useEffect(() => {
    if (ref.current && !qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        type: 'svg',
        dotsOptions: {
          color: '#80EF80',
          type: 'dots',
        },
        backgroundOptions: {
          color: '#000000',
        },
        cornersDotOptions: {
          type: 'dot',
        },
        cornersSquareOptions: {
          color: '#80EF80',
          type: 'extra-rounded',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
        },
      })
      qrCodeRef.current.append(ref.current)
    }
  }, [url])

  return (
    <>
      <div className="min-h-screen bg-black text-green-400 p-4 font-mono relative overflow-hidden">
        <div className="fixed inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-900/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent_50%)]"></div>
        </div>
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-green-300 glitch-text">
              [QR_CODE_GENERATOR]
            </h1>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{'> INPUT_PARAMETERS.CONFIG'}</CardTitle>
                  <CardDescription>
                    {'// Select data type for QR code generation'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Label htmlFor="url">{'> URL:'}</Label>
                    <TextArea
                      id="url"
                      value={url}
                      onChange={setUrl}
                      placeholder="Enter URL here..."
                      className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30"
                    />
                    <Button
                      onClick={() => {
                        if (qrCodeRef.current) {
                          qrCodeRef.current.update({ data: url })
                        }
                      }}
                    >
                      UPDATE
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>{'> QR_CODE_STYLING'}</CardTitle>
                  <CardDescription>
                    {'// Customize QR code appearance'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="">
                    <Label htmlFor="size">{'> Size (px):'}</Label>
                    <NumberInput id="size" />
                  </div>
                  <div>
                    <Label htmlFor="color">{'> Color:'}</Label>
                    <ColorPicker />
                  </div>
                  <div>
                    <Label htmlFor="type">{'> Type:'}</Label>
                    <Select
                      initialValue="classy"
                      options={[
                        { value: 'classy', label: 'Classy' },
                        { value: 'classy-rounded', label: 'Classy Rounded' },
                        { value: 'dots', label: 'Dots' },
                        { value: 'rounded', label: 'Rounded' },
                        { value: 'extra-rounded', label: 'Extra Rounded' },
                        { value: 'square', label: 'Square' },
                      ]}
                    />
                  </div>
                  <Button>UPDATE</Button>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{'> QR_CODE_GENERATION'}</CardTitle>
                  <CardDescription>
                    {'// Generate QR code based on the input parameters'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div
                    ref={ref}
                    className="flex w-fit justify-center items-center my-2 border border-green-500/30 rounded-lg p-2 bg-black/50"
                  >
                    {/* QR Code will be rendered here */}
                  </div>
                  <Button className="flex items-center gap-2">
                    <Download size={16} />
                    DOWNLOAD
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
