import { Play, Pause, RotateCcw, StepForward } from 'lucide-react'

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
  onArraySizeChange
}) {
  return (
    <div className="control-panel space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onStart}
          disabled={isRunning || currentStep >= totalSteps}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Play className="w-4 h-4" /> Start
        </button>
        <button
          onClick={onPause}
          disabled={!isRunning}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Pause className="w-4 h-4" /> Pause
        </button>
        <button
          onClick={onReset}
          className="btn-secondary flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={onStep}
          disabled={isRunning || currentStep >= totalSteps}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <StepForward className="w-4 h-4" /> Step
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              ⚡ Speed
            </label>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded">
              {speed}ms
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="1000"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full cursor-pointer h-2 rounded-lg appearance-none bg-slate-200 dark:bg-slate-700"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              📊 Array Size
            </label>
            <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded">
              {arraySize}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            disabled={isRunning}
            className="w-full cursor-pointer h-2 rounded-lg appearance-none bg-slate-200 dark:bg-slate-700 disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Progress</span>
          <span className="text-sm font-mono text-slate-900 dark:text-white">
            <span className="font-bold text-blue-600 dark:text-blue-400">{currentStep}</span> / 
            <span className="text-slate-500 dark:text-slate-400 ml-1">{totalSteps}</span>
          </span>
        </div>

        {totalSteps > 0 && (
          <div className="w-full bg-slate-300 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-200 rounded-full"
              style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
