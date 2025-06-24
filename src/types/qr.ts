/**
 * QR Code related types
 */

export interface QRCodeState {
  url: string
  mainColor: string
  bgColor: string
  centerImage: string | null
  imageSize: number
  imageMargin: number
  isDownloading: boolean
}

export interface QRCodeActions {
  setUrl: (url: string) => void
  setMainColor: (color: string) => void
  setBgColor: (color: string) => void
  setCenterImage: (image: string | null) => void
  setImageSize: (size: number) => void
  setImageMargin: (margin: number) => void
  setIsDownloading: (downloading: boolean) => void
}