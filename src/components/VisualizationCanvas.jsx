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

    const isDark = document.documentElement.classList.contains('dark')
    ctx.fillStyle = isDark ? '#0f172a' : '#ffffff'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.16)' : 'rgba(148, 163, 184, 0.22)'
    ctx.lineWidth = 1
    for (let x = 0; x < canvas.offsetWidth; x += 32) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.offsetHeight)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.offsetHeight; y += 32) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.offsetWidth, y)
      ctx.stroke()
    }

    // Call algorithm's render function
    if (algorithm.render) {
      algorithm.render(ctx, state, currentStep, canvas.offsetWidth, canvas.offsetHeight)
    }
  }, [algorithm, state, currentStep])

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ring-1 ring-white/70 dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-800">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ minHeight: '430px' }}
      />
    </div>
  )
}
