import { Gauge, Pause, Play, RotateCcw, Rows3, StepForward } from 'lucide-react'

export default function AlgorithmControls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onStep,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
}) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  return (
    <div className="control-panel space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onStart}
          disabled={isRunning || currentStep >= totalSteps}
          className="btn-primary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Play className="h-4 w-4" /> Start
        </button>
        <button
          onClick={onPause}
          disabled={!isRunning}
          className="btn-secondary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Pause className="h-4 w-4" /> Pause
        </button>
        <button
          onClick={onReset}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
        <button
          onClick={onStep}
          disabled={isRunning || currentStep >= totalSteps}
          className="btn-secondary flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <StepForward className="h-4 w-4" /> Step
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ControlSlider
          icon={<Gauge className="h-4 w-4 text-amber-600" />}
          label="Playback Speed"
          value={speed}
          suffix="ms"
          min={1}
          max={1000}
          onChange={onSpeedChange}
          leftLabel="Fast"
          rightLabel="Slow"
        />

        <ControlSlider
          icon={<Rows3 className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />}
          label="Input Size"
          value={arraySize}
          min={5}
          max={100}
          onChange={onArraySizeChange}
          disabled={isRunning}
          leftLabel="Small"
          rightLabel="Large"
        />
      </div>

      <div className="rounded-lg border border-cyan-100 bg-cyan-50/80 p-4 dark:border-cyan-900/50 dark:bg-cyan-950/30">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Progress</span>
          <span className="font-mono text-sm text-slate-700 dark:text-slate-200">
            <span className="font-bold text-cyan-700 dark:text-cyan-300">{currentStep}</span>
            <span className="text-slate-400"> / {totalSteps}</span>
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-white shadow-inner dark:bg-slate-900">
          <div
            className="h-full rounded-full bg-cyan-600 transition-all duration-200 dark:bg-cyan-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function ControlSlider({
  icon,
  label,
  value,
  suffix = '',
  min,
  max,
  onChange,
  disabled = false,
  leftLabel,
  rightLabel,
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
          {icon}
          {label}
        </label>
        <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-100">
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        disabled={disabled}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800"
      />
      <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  )
}
