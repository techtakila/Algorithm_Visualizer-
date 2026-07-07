import { useEffect, useState } from 'react'
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
  const totalSteps = visualizationState?.steps?.length || 0

  useEffect(() => {
    const algo = getAlgorithmById(selectedAlgorithm)
    setAlgorithm(algo)
    setCurrentStep(0)
    setIsRunning(false)
    setVisualizationState(algo?.initialize ? algo.initialize(arraySize) : null)
  }, [selectedAlgorithm, arraySize])

  useEffect(() => {
    if (!isRunning || !algorithm) return

    const timer = setTimeout(() => {
      if (currentStep < totalSteps) {
        setCurrentStep((prev) => prev + 1)
      } else {
        setIsRunning(false)
      }
    }, 1100 - speed)

    return () => clearTimeout(timer)
  }, [isRunning, currentStep, algorithm, speed, totalSteps])

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
    setVisualizationState(algorithm?.initialize ? algorithm.initialize(arraySize) : null)
  }

  const handleStep = () => {
    if (algorithm && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  if (!algorithm) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-lg text-slate-600 dark:text-slate-300">Select an algorithm to begin</p>
      </div>
    )
  }

  return (
    <main className="flex-1 overflow-auto bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_48%,#ecfeff_100%)] dark:bg-[linear-gradient(135deg,#020617_0%,#111827_48%,#0f172a_100%)]">
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <div className="mb-5 rounded-lg border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700 dark:text-cyan-300">
            Interactive Algorithm Lab
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">
            {algorithm.name}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Step through the strategy, inspect the current decision, and compare time and space costs without leaving the visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
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

            <AlgorithmControls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onStep={handleStep}
              currentStep={currentStep}
              totalSteps={totalSteps}
              speed={speed}
              onSpeedChange={setSpeed}
              arraySize={arraySize}
              onArraySizeChange={setArraySize}
            />
          </div>

          <div>
            <AlgorithmInfo algorithm={algorithm} />
          </div>
        </div>
      </div>
    </main>
  )
}
