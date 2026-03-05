'use client'

import { useRef, useCallback } from 'react'
import SignatureCanvas from 'react-signature-canvas'

interface SignaturePadProps {
  onSignatureChange: (dataUrl: string | null) => void
  label?: string
}

export default function SignaturePad({ onSignatureChange, label = 'Signature' }: SignaturePadProps) {
  const sigRef = useRef<SignatureCanvas>(null)

  const handleEnd = useCallback(() => {
    if (sigRef.current && !sigRef.current.isEmpty()) {
      onSignatureChange(sigRef.current.getTrimmedCanvas().toDataURL('image/png'))
    }
  }, [onSignatureChange])

  const handleClear = useCallback(() => {
    sigRef.current?.clear()
    onSignatureChange(null)
  }, [onSignatureChange])

  return (
    <div>
      <p className="text-xs font-semibold text-gray-600 mb-1">{label}</p>
      <div className="border border-gray-300 rounded bg-white relative">
        <SignatureCanvas
          ref={sigRef}
          penColor="#1e3a5f"
          canvasProps={{
            className: 'w-full',
            style: { width: '100%', height: '120px' },
          }}
          onEnd={handleEnd}
        />
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1 right-1 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-0.5 rounded"
        >
          Effacer
        </button>
      </div>
    </div>
  )
}
