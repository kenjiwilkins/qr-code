import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Label } from '../ui'
import { ColorPicker, ColorLabel, NumberInput, Select } from '../forms'
import QRImageUpload from './QRImageUpload'
import type { QRCodeActions, QRCodeState } from '../../types'

interface QRStylingSectionProps {
  state: QRCodeState
  actions: QRCodeActions
  onUpdate: () => void
}

export default function QRStylingSection({ state, actions, onUpdate }: QRStylingSectionProps) {
  return (
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
            <ColorLabel color={state.mainColor} />
          </div>
          <ColorPicker color={state.mainColor} onChange={actions.setMainColor} />
        </div>
        <div>
          <div className="flex items-center justify-start gap-1 mb-2">
            <Label htmlFor="bgColor">{'> Background Color:'}</Label>
            <ColorLabel color={state.bgColor} />
          </div>
          <ColorPicker color={state.bgColor} onChange={actions.setBgColor} />
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
        <QRImageUpload state={state} actions={actions} />
        <Button onClick={onUpdate}>UPDATE</Button>
      </CardContent>
    </Card>
  )
}