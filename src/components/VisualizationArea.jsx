import { useState, useEffect } from 'react'
import { getAlgorithmById } from '../algorithms/algorithmRegistry'
import AlgorithmControls from './AlgorithmControls'
import VisualizationCanvas from './VisualizationCanvas'
import AlgorithmInfo from './AlgorithmInfo'

export default function VisualizationArea({ selectedAlgorithm }) {
  const [algorithm, setAlgorithm] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [speed, setSpeed] = useState(500)
  const [arraySize, setArraySize] = useState(20)
  const [visualizationState, setVisualizationState] = useState(null)
  const [totalSteps, setTotalSteps] = useState(0)

  // Initialize algorithm when selected
  useEffect(() => {
    const algo = getAlgorithmById(selectedAlgorithm)
    if (!algo) return
    
    setAlgorithm(algo)
    setCurrentStep(0)
    setIsRunning(false)
    
    try {
      const state = algo.initialize(arraySize)
      setVisualizationState(state)
      setTotalSteps(algo.steps?.length || 0)
    } catch (error) {
      console.error('Error initializing algorithm:', error)
    }
  }, [selectedAlgorithm, arraySize])

  // Auto-play animation
  useEffect(() => {
    if (!isRunning || !algorithm || currentStep >= totalSteps) {
      if (currentStep >= totalSteps && isRunning) {
        setIsRunning(false)
      }
      return
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1)
    }, 1100 - speed)

    return () => clearTimeout(timer)
  }, [isRunning, currentStep, speed, totalSteps, algorithm])

  const handleStart = () => {
    if (algorithm && !isRunning && currentStep < totalSteps) {
      setIsRunning(true)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(0)
    try {
      const state = algorithm.initialize(arraySize)
      setVisualizationState(state)
      setTotalSteps(algorithm.steps?.length || 0)
    } catch (error) {
      console.error('Error resetting algorithm:', error)
    }
  }

  const handleStep = () => {
    if (algorithm && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed)
  }

  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize)
  }

  if (!algorithm) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">Select an algorithm to begin</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 rounded-lg border border-white bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Interactive Algorithm Visualizer
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
            {algorithm.name}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Visualize how the algorithm works step by step
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Canvas */}
            <div className="control-panel">
              <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                Visualization
              </h3>
              <VisualizationCanvas
                algorithm={algorithm}
                state={visualizationState}
                currentStep={currentStep}
              />
            </div>

            {/* Controls */}
            <AlgorithmControls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onStep={handleStep}
              currentStep={currentStep}
              totalSteps={totalSteps}
              speed={speed}
              onSpeedChange={handleSpeedChange}
              arraySize={arraySize}
              onArraySizeChange={handleArraySizeChange}
            />
          </div>

          {/* Info panel */}
          <div>
            <AlgorithmInfo algorithm={algorithm} />
          </div>
        </div>
      </div>
    </main>
  )
}
