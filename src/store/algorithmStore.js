import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useAlgorithmStore = create(
  immer((set) => ({
    algorithms: [],
    currentAlgorithm: null,
    isRunning: false,
    currentStep: 0,
    speed: 500,
    arraySize: 20,
    visualizationState: null,
    darkMode: false,
    sidebarOpen: true,
    executionStats: {
      comparisons: 0,
      swaps: 0,
      startTime: null,
      endTime: null
    },
    
    setAlgorithm: (algorithm) => set((state) => {
      state.currentAlgorithm = algorithm
      state.currentStep = 0
      state.isRunning = false
      state.executionStats = {
        comparisons: 0,
        swaps: 0,
        startTime: null,
        endTime: null
      }
    }),
    
    setRunning: (running) => set((state) => {
      state.isRunning = running
      if (running && !state.executionStats.startTime) {
        state.executionStats.startTime = Date.now()
      }
      if (!running && state.executionStats.startTime && !state.executionStats.endTime) {
        state.executionStats.endTime = Date.now()
      }
    }),
    
    setCurrentStep: (step) => set((state) => {
      state.currentStep = step
    }),
    
    setSpeed: (speed) => set((state) => {
      state.speed = speed
    }),
    
    setArraySize: (size) => set((state) => {
      state.arraySize = size
    }),
    
    setVisualizationState: (state) => set((s) => {
      s.visualizationState = state
    }),
    
    setDarkMode: (dark) => set((state) => {
      state.darkMode = dark
    }),
    
    setSidebarOpen: (open) => set((state) => {
      state.sidebarOpen = open
    }),
    
    updateStats: (updates) => set((state) => {
      state.executionStats = { ...state.executionStats, ...updates }
    }),
    
    reset: () => set((state) => {
      state.currentStep = 0
      state.isRunning = false
      state.visualizationState = null
      state.executionStats = {
        comparisons: 0,
        swaps: 0,
        startTime: null,
        endTime: null
      }
    })
  }))
)

export default useAlgorithmStore
