import { useRef, useEffect } from 'react'

export default function VisualizationCanvas({ algorithm, state, currentStep }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !state || !algorithm) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Render algorithm
    try {
      if (algorithm.render && typeof algorithm.render === 'function') {
        algorithm.render(ctx, state, currentStep, rect.width, rect.height)
      }
    } catch (error) {
      console.error('Error rendering algorithm:', error)
      ctx.fillStyle = '#000'
      ctx.font = '14px Arial'
      ctx.fillText('Error rendering visualization', 10, 30)
    }
  }, [algorithm, state, currentStep])

  return (
    <div className="rounded-lg overflow-hidden border-2 border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
}
