/**
 * Algorithm Visualizer - Core Engine
 * Provides infrastructure for algorithm execution, visualization, and analytics
 */

import useAlgorithmStore from '../store/algorithmStore'

// Algorithm execution contexts
export const AlgorithmContext = {
  SORTING: 'sorting',
  SEARCHING: 'searching',
  GREEDY: 'greedy',
  DYNAMIC_PROGRAMMING: 'dynamic_programming',
  DIVIDE_CONQUER: 'divide_conquer',
  BACKTRACKING: 'backtracking',
  BRANCH_BOUND: 'branch_bound',
  BRUTE_FORCE: 'brute_force'
}

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

  executeStep(stepIndex) {
    throw new Error('executeStep() must be implemented')
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
    return Array.from({ length: size }, () => Math.random() * max)
  },

  generateSortedArray: (size, max = 100) => {
    return Array.from({ length: size }, (_, i) => (i / size) * max)
  },

  generateReverseSortedArray: (size, max = 100) => {
    return Array.from({ length: size }, (_, i) => max - (i / size) * max)
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
  },

  drawGraph: (ctx, nodes, edges, width, height, highlightedNodes = []) => {
    // Draw edges
    ctx.strokeStyle = '#666'
    ctx.lineWidth = 2
    edges.forEach(([from, to]) => {
      const fromNode = nodes[from]
      const toNode = nodes[to]
      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.stroke()
    })
    
    // Draw nodes
    nodes.forEach((node, idx) => {
      const isHighlighted = highlightedNodes.includes(idx)
      ctx.fillStyle = isHighlighted ? '#ff6b6b' : '#3b82f6'
      ctx.beginPath()
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI)
      ctx.fill()
      
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 14px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, node.x, node.y)
    })
  }
}
