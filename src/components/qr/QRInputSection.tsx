import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Label } from '../ui'
import { TextArea } from '../forms'
import type { QRCodeActions, QRCodeState } from '../../types'

interface QRInputSectionProps {
  state: QRCodeState
  actions: QRCodeActions
  onUpdate: () => void
}

export default function QRInputSection({ state, actions, onUpdate }: QRInputSectionProps) {
  return (
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
            value={state.url}
            onChange={actions.setUrl}
            placeholder="Enter URL here..."
            className="w-full bg-black/50 border border-green-500/30 rounded px-3 py-2 text-green-300 font-mono text-sm focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400/30"
          />
          <Button onClick={onUpdate}>
            UPDATE
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}