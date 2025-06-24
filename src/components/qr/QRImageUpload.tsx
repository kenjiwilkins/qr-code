import { Upload } from 'lucide-react'
import { Button, Label } from '../ui'
import { NumberInput } from '../forms'
import { handleImageUpload, triggerFileInput, showAlert } from '../../utils'
import type { QRCodeActions, QRCodeState } from '../../types'

interface QRImageUploadProps {
  state: QRCodeState
  actions: QRCodeActions
}

export default function QRImageUpload({ state, actions }: QRImageUploadProps) {
  const onImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    await handleImageUpload(
      file,
      actions.setCenterImage,
      showAlert
    )
  }

  return (
    <div>
      <Label htmlFor="centerImage">{'> Center Image:'}</Label>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="file"
          id="imageUpload"
          accept="image/png,image/jpeg,image/jpg"
          onChange={onImageUpload}
          className="hidden"
        />
        <Button
          onClick={() => triggerFileInput('imageUpload')}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          UPLOAD
        </Button>
        {state.centerImage && (
          <Button
            onClick={() => actions.setCenterImage(null)}
            className="bg-red-600/20 hover:bg-red-600/30 border-red-500/50"
          >
            REMOVE
          </Button>
        )}
      </div>
      {state.centerImage && (
        <div className="mt-2 p-2 border border-green-500/30 rounded bg-black/30">
          <img
            src={state.centerImage}
            alt="Center image preview"
            className="w-16 h-16 object-contain rounded"
          />
          <div className="mt-2 space-y-2">
            <div>
              <Label htmlFor="imageSize">{'> Image Size:'}</Label>
              <input
                type="number"
                id="imageSize"
                value={state.imageSize}
                onChange={(e) => actions.setImageSize(parseFloat(e.target.value) || 0.4)}
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
                value={state.imageMargin}
                onChange={actions.setImageMargin}
                min={0}
                max={50}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}