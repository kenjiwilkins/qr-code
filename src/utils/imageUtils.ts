/**
 * Image utility functions for QR code center images
 */

/**
 * Validates if a file is a supported image type (PNG or JPG)
 */
export function validateImageFile(file: File): boolean {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg']
  return validTypes.includes(file.type)
}

/**
 * Resizes an image file to a maximum size while maintaining aspect ratio
 */
export function resizeImage(file: File, maxSize = 200): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    
    img.onload = () => {
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

/**
 * Handles image upload with validation and resizing
 */
export async function handleImageUpload(
  file: File,
  onSuccess: (imageDataUrl: string) => void,
  onError?: (message: string) => void
): Promise<void> {
  if (!validateImageFile(file)) {
    onError?.('Please select a PNG or JPG image')
    return
  }
  
  try {
    const resizedImage = await resizeImage(file)
    onSuccess(resizedImage)
  } catch {
    onError?.('Failed to process image')
  }
}