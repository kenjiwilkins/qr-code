import { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import { createQRCodeConfig, updateQRCode, downloadQRCode } from '../utils'
import type { QRCodeState, QRCodeActions } from '../types'

export function useQRCode() {
  const [state, setState] = useState<QRCodeState>({
    url: 'https://example.com',
    mainColor: '#80EF80',
    bgColor: '#000000',
    centerImage: null,
    imageSize: 0.4,
    imageMargin: 20,
    isDownloading: false,
  })

  const ref = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)

  const actions: QRCodeActions = {
    setUrl: (url) => setState(prev => ({ ...prev, url })),
    setMainColor: (mainColor) => setState(prev => ({ ...prev, mainColor })),
    setBgColor: (bgColor) => setState(prev => ({ ...prev, bgColor })),
    setCenterImage: (centerImage) => setState(prev => ({ ...prev, centerImage })),
    setImageSize: (imageSize) => setState(prev => ({ ...prev, imageSize })),
    setImageMargin: (imageMargin) => setState(prev => ({ ...prev, imageMargin })),
    setIsDownloading: (isDownloading) => setState(prev => ({ ...prev, isDownloading })),
  }

  // Initialize QR code
  useEffect(() => {
    if (ref.current && !qrCodeRef.current) {
      const config = createQRCodeConfig({
        data: state.url,
        mainColor: state.mainColor,
        bgColor: state.bgColor,
        centerImage: state.centerImage,
        imageSize: state.imageSize,
        imageMargin: state.imageMargin,
      })
      
      qrCodeRef.current = new QRCodeStyling(config)
      qrCodeRef.current.append(ref.current)
    }
  }, [state.url, state.mainColor, state.bgColor, state.centerImage, state.imageSize, state.imageMargin])

  const updateQR = () => {
    if (qrCodeRef.current) {
      updateQRCode(qrCodeRef.current, {
        data: state.url,
        mainColor: state.mainColor,
        bgColor: state.bgColor,
        centerImage: state.centerImage,
        imageSize: state.imageSize,
        imageMargin: state.imageMargin,
      })
    }
  }

  const download = async () => {
    if (qrCodeRef.current) {
      actions.setIsDownloading(true)
      try {
        await downloadQRCode(qrCodeRef.current)
      } finally {
        actions.setIsDownloading(false)
      }
    }
  }

  return {
    state,
    actions,
    ref,
    updateQR,
    download,
  }
}