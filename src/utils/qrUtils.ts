import QRCodeStyling from 'qr-code-styling'

/**
 * QR Code utility functions
 */

export interface QRCodeOptions {
  width?: number
  height?: number
  data: string
  mainColor: string
  bgColor: string
  centerImage?: string | null
  imageSize?: number
  imageMargin?: number
}

/**
 * Creates QR code styling configuration
 */
export function createQRCodeConfig(options: QRCodeOptions) {
  const {
    width = 200,
    height = 200,
    data,
    mainColor,
    bgColor,
    centerImage,
    imageSize = 0.4,
    imageMargin = 20
  } = options

  return {
    width,
    height,
    data,
    type: 'svg' as const,
    dotsOptions: {
      color: mainColor,
      type: 'dots' as const,
    },
    backgroundOptions: {
      color: bgColor,
    },
    cornersDotOptions: {
      type: 'dot' as const,
    },
    cornersSquareOptions: {
      color: mainColor,
      type: 'extra-rounded' as const,
    },
    imageOptions: {
      crossOrigin: 'anonymous' as const,
      hideBackgroundDots: true,
      imageSize,
      margin: imageMargin,
    },
    image: centerImage || undefined,
  }
}

/**
 * Updates QR code with new options
 */
export function updateQRCode(qrCode: QRCodeStyling, options: QRCodeOptions) {
  const config = createQRCodeConfig(options)
  qrCode.update(config)
}

/**
 * Downloads QR code with specified filename
 */
export async function downloadQRCode(
  qrCode: QRCodeStyling,
  filename = 'qr-code'
): Promise<void> {
  return qrCode.download({ name: filename })
}