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

  useEffect(() => {
    const algo = getAlgorithmById(selectedAlgorithm)
    setAlgorithm(algo)
    setCurrentStep(0)
    setIsRunning(false)
    if (algo && algo.initialize) {
      const initial = algo.initialize(arraySize)
      setVisualizationState(initial)
    }
  }, [selectedAlgorithm, arraySize])

  useEffect(() => {
    if (!isRunning || !algorithm) return

    const timer = setTimeout(() => {
      if (algorithm.steps && currentStep < algorithm.steps.length) {
        setCurrentStep(prev => prev + 1)
      } else {
        setIsRunning(false)
      }
    }, 1100 - speed)

    return () => clearTimeout(timer)
  }, [isRunning, currentStep, algorithm, speed])

  const handleStart = () => {
    if (algorithm && !isRunning) {
      setIsRunning(true)
    }
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(0)
    if (algorithm && algorithm.initialize) {
      const initial = algorithm.initialize(arraySize)
      setVisualizationState(initial)
    }
  }

  const handleStep = () => {
    if (algorithm && currentStep < (algorithm.steps?.length || 0)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  if (!algorithm) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">Select an algorithm to begin</p>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main visualization area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="control-panel">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                {algorithm.name}
              </h2>
              <VisualizationCanvas 
                algorithm={algorithm}
                state={visualizationState}
                currentStep={currentStep}
              />
            </div>

            <AlgorithmControls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onStep={handleStep}
              currentStep={currentStep}
              totalSteps={algorithm.steps?.length || 0}
              speed={speed}
              onSpeedChange={setSpeed}
              arraySize={arraySize}
              onArraySizeChange={setArraySize}
            />
          </div>

          {/* Info panel */}
          <div className="lg:col-span-1">
            <AlgorithmInfo algorithm={algorithm} />
          </div>
        </div>
      </div>
    </main>
  )
}