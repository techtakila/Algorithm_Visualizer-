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
  onArraySizeChange,
}) {
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

  return (
    <div className="control-panel space-y-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onStart}
          disabled={isRunning}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Play className="h-4 w-4" /> Start
        </button>
        <button
          onClick={onPause}
          disabled={!isRunning}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <StepForward className="h-4 w-4" /> Step
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              ⚡ Speed
            </label>
            <span className="text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded">
              {speed}ms
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="1000"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full cursor-pointer h-2 rounded-lg appearance-none"
            style={{ background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${speed}%, #e5e7eb ${speed}%, #e5e7eb 100%)` }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700">
              📊 Array Size
            </label>
            <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded">
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
            className="w-full cursor-pointer h-2 rounded-lg appearance-none disabled:opacity-50"
            style={{ background: `linear-gradient(to right, #10b981 0%, #10b981 ${(arraySize / 100) * 100}%, #e5e7eb ${(arraySize / 100) * 100}%, #e5e7eb 100%)` }}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Small (5)</span>
            <span>Large (100)</span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-mono text-gray-900">
            <span className="font-bold text-blue-600">{currentStep}</span> / 
            <span className="text-gray-500 ml-1">{totalSteps}</span>
          </span>
        </div>

        {totalSteps > 0 && (
          <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-200 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
