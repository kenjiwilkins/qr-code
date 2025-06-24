import { QRInputSection, QRStylingSection, QRDisplaySection } from './components'
import { useQRCode } from './hooks'
import './App.css'

function App() {
  const { state, actions, ref, updateQR, download } = useQRCode()

  return (
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
            <QRInputSection
              state={state}
              actions={actions}
              onUpdate={updateQR}
            />
            <QRStylingSection
              state={state}
              actions={actions}
              onUpdate={updateQR}
            />
          </div>
          <div className="space-y-6">
            <QRDisplaySection
              state={state}
              containerRef={ref}
              onDownload={download}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App