/**
 * Algorithm Visualizer - Core Engine
 * Provides infrastructure for algorithm execution, visualization, and analytics
 */

// Base algorithm structure
export class BaseAlgorithm {
  constructor(config) {
    this.id = config.id
    this.name = config.name
    this.category = config.category
    this.description = config.description
    this.complexity = config.complexity
    this.pseudocode = config.pseudocode
    this.useCases = config.useCases
    this.visualizationType = config.visualizationType || 'array'
    this.steps = []
    this.state = null
    this.comparisons = 0
    this.swaps = 0
    this.operations = 0
  }

  initialize(size) {
    throw new Error('initialize() must be implemented')
  }

  render(ctx, state, currentStep, width, height) {
    throw new Error('render() must be implemented')
  }

  getMetrics() {
    return {
      comparisons: this.comparisons,
      swaps: this.swaps,
      operations: this.operations,
      stepsCount: this.steps.length
    }
  }

  reset() {
    this.comparisons = 0
    this.swaps = 0
    this.operations = 0
    this.steps = []
  }
}

// Utility functions for algorithm execution
export const AlgorithmUtils = {
  recordComparison: (algo) => {
    algo.comparisons++
    algo.operations++
  },

  recordSwap: (algo) => {
    algo.swaps++
    algo.operations++
  },

  recordOperation: (algo) => {
    algo.operations++
  },

  addStep: (algo, stepData) => {
    algo.steps.push({
      index: algo.steps.length,
      timestamp: Date.now(),
      ...stepData
    })
  },

  shuffle: (array) => {
    const arr = [...array]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  },

  generateRandomArray: (size, max = 100) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * max) + 1)
  },

  generateSortedArray: (size, max = 100) => {
    return Array.from({ length: size }, (_, i) => Math.floor((i / size) * max) + 1)
  },

  generateReverseSortedArray: (size, max = 100) => {
    return Array.from({ length: size }, (_, i) => Math.floor(max - (i / size) * max))
  }
}

// Rendering utilities
export const RenderUtils = {
  drawBar: (ctx, x, y, width, height, color, label) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
    
    if (label !== undefined) {
      ctx.fillStyle = '#000'
      ctx.font = '10px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(label, x + width / 2, y + height + 15)
    }
  },

  drawText: (ctx, text, x, y, options = {}) => {
    const {
      fontSize = 14,
      fontFamily = 'Arial',
      color = '#000',
      align = 'left'
    } = options
    
    ctx.font = `${fontSize}px ${fontFamily}`
    ctx.fillStyle = color
    ctx.textAlign = align
    ctx.fillText(text, x, y)
  },

  drawGrid: (ctx, width, height, cellSize, color = '#e0e0e0') => {
    ctx.strokeStyle = color
    ctx.lineWidth = 1
    
    for (let i = 0; i <= width; i += cellSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    
    for (let i = 0; i <= height; i += cellSize) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }
  }
}
