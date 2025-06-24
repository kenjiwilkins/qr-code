import { useEffect, useRef, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ColorPicker,
  ColorLabel,
  Label,
  NumberInput,
  Select,
  TextArea,
} from './components'
import QRCodeStyling from 'qr-code-styling'
import { Download, Github, Upload } from 'lucide-react'
import './App.css'

function App() {
  const [url, setUrl] = useState('https://example.com')
  const [mainColor, setMainColor] = useState('#80EF80')
  const [bgColor, setBgColor] = useState('#000000')
  const [isDownloading, setIsDownloading] = useState(false)
  const [centerImage, setCenterImage] = useState<string | null>(null)
  const [imageSize, setImageSize] = useState(0.4)
  const [imageMargin, setImageMargin] = useState(20)
  // Create a ref to hold the QR code container
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
          color: mainColor,
          type: 'dots',
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersDotOptions: {
          type: 'dot',
        },
        cornersSquareOptions: {
          color: mainColor,
          type: 'extra-rounded',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          hideBackgroundDots: true,
          imageSize: imageSize,
          margin: imageMargin,
        },
        image: centerImage || undefined,
      })
      qrCodeRef.current.append(ref.current)
    }
  }, [url, mainColor, bgColor, centerImage, imageSize, imageMargin])
  function updateQRCode() {
    if (qrCodeRef.current) {
      qrCodeRef.current.update({
        data: url,
        dotsOptions: {
          color: mainColor,
        },
        backgroundOptions: {
          color: bgColor,
        },
        cornersSquareOptions: {
          color: mainColor,
        },
        image: centerImage || undefined,
        imageOptions: {
          crossOrigin: 'anonymous',
          hideBackgroundDots: true,
          imageSize: imageSize,
          margin: imageMargin,
        },
      })
    }
  }
  function resizeImage(file: File): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()
      
      img.onload = () => {
        const maxSize = 200
        let { width, height } = img
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }
        
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL())
      }
      
      img.src = URL.createObjectURL(file)
    })
  }
  
  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      alert('Please select a PNG or JPG image')
      return
    }
    
    resizeImage(file).then(setCenterImage)
  }
  
  function removeImage() {
    setCenterImage(null)
  }
  
  function donwload() {
    if (qrCodeRef.current) {
      setIsDownloading(true)
      qrCodeRef.current
        .download({
          name: 'qr-code',
        })
        .then(() => {
          setIsDownloading(false)
        })
    }
  }

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
                    <div className="flex items-center justify-start gap-1 mb-2">
                      <Label htmlFor="color">{'> Color:'}</Label>
                      <ColorLabel color={mainColor} />
                    </div>
                    <ColorPicker color={mainColor} onChange={setMainColor} />
                  </div>
                  <div>
                    <div className="flex items-center justify-start gap-1 mb-2">
                      <Label htmlFor="bgColor">{'> Background Color:'}</Label>
                      <ColorLabel color={bgColor} />
                    </div>
                    <ColorPicker color={bgColor} onChange={setBgColor} />
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
                  <div>
                    <Label htmlFor="centerImage">{'> Center Image:'}</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        onClick={() => document.getElementById('imageUpload')?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload size={16} />
                        UPLOAD
                      </Button>
                      {centerImage && (
                        <Button
                          onClick={removeImage}
                          className="bg-red-600/20 hover:bg-red-600/30 border-red-500/50"
                        >
                          REMOVE
                        </Button>
                      )}
                    </div>
                    {centerImage && (
                      <div className="mt-2 p-2 border border-green-500/30 rounded bg-black/30">
                        <img
                          src={centerImage}
                          alt="Center image preview"
                          className="w-16 h-16 object-contain rounded"
                        />
                        <div className="mt-2 space-y-2">
                          <div>
                            <Label htmlFor="imageSize">{'> Image Size:'}</Label>
                            <input
                              type="number"
                              id="imageSize"
                              value={imageSize}
                              onChange={(e) => setImageSize(parseFloat(e.target.value) || 0.4)}
                              min={0.1}
                              max={1}
                              step={0.1}
                              className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30"
                            />
                          </div>
                          <div>
                            <Label htmlFor="imageMargin">{'> Image Margin:'}</Label>
                            <NumberInput
                              id="imageMargin"
                              value={imageMargin}
                              onChange={setImageMargin}
                              min={0}
                              max={50}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button onClick={updateQRCode}>UPDATE</Button>
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
                  <div className="flex gap-2">
                    <Button
                      className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={donwload}
                      disabled={isDownloading}
                    >
                      <Download size={16} />
                      DOWNLOAD
                    </Button>
                    <Button
                      className="flex items-center gap-2 github-button"
                      onClick={() =>
                        window.open(
                          'https://github.com/kenjiwilkins/qr-code',
                          '_blank'
                        )
                      }
                    >
                      <Github size={16} />
                      STAR
                    </Button>
                  </div>
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
