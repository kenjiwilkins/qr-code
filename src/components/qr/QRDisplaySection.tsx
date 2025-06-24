import { Download, Github } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '../ui'
import { openInNewTab } from '../../utils'
import type { QRCodeState } from '../../types'

interface QRDisplaySectionProps {
  state: QRCodeState
  containerRef: React.RefObject<HTMLDivElement | null>
  onDownload: () => void
}

export default function QRDisplaySection({ state, containerRef, onDownload }: QRDisplaySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{'> QR_CODE_GENERATION'}</CardTitle>
        <CardDescription>
          {'// Generate QR code based on the input parameters'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div
          ref={containerRef}
          className="flex w-fit justify-center items-center my-2 border border-green-500/30 rounded-lg p-2 bg-black/50"
        >
          {/* QR Code will be rendered here */}
        </div>
        <div className="flex gap-2">
          <Button
            className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onDownload}
            disabled={state.isDownloading}
          >
            <Download size={16} />
            DOWNLOAD
          </Button>
          <Button
            className="flex items-center gap-2 github-button"
            onClick={() => openInNewTab('https://github.com/kenjiwilkins/qr-code')}
          >
            <Github size={16} />
            STAR
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}