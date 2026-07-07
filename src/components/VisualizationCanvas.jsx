import { useEffect, useRef } from 'react'

export default function VisualizationCanvas({ algorithm, state, currentStep }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || !state) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas with light background for better visibility
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    ctx.fillStyle = isDark ? '#1f2937' : '#ffffff'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Call algorithm's render function
    if (algorithm.render) {
      algorithm.render(ctx, state, currentStep, canvas.offsetWidth, canvas.offsetHeight)
    }
  }, [algorithm, state, currentStep])

  return (
    <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ minHeight: '400px' }}
      />
    </div>
  )
}