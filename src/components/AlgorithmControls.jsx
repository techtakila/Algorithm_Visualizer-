import { Play, Pause, RotateCcw, StepForward, Zap } from 'lucide-react'

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
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={onStart}
          disabled={isRunning}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Play className="w-4 h-4" /> Start
        </button>
        <button
          onClick={onPause}
          disabled={!isRunning}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <Pause className="w-4 h-4" /> Pause
        </button>
        <button
          onClick={onReset}
          className="btn-secondary flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={onStep}
          disabled={isRunning || currentStep >= totalSteps}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          <StepForward className="w-4 h-4" /> Step
        </button>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Speed
            </label>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded">
              {speed}ms
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="1000"
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none slider"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              📊 Array Size
            </label>
            <span className="text-lg font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded">
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
            className="w-full cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none slider disabled:opacity-50"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-mono text-gray-900 dark:text-white">
            <span className="font-bold text-blue-600 dark:text-blue-400">{currentStep}</span> / 
            <span className="text-gray-500 dark:text-gray-400 ml-1">{totalSteps}</span>
          </span>
        </div>

        {totalSteps > 0 && (
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-200 rounded-full shadow-lg"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  }
