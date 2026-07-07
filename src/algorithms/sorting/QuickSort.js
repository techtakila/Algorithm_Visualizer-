import { BaseAlgorithm, AlgorithmUtils } from '../core/algorithmEngine'

export class QuickSort extends BaseAlgorithm {
  constructor() {
    super({
      id: 'quick-sort',
      name: 'Quick Sort',
      category: 'sorting',
      description: 'Quick Sort is a divide-and-conquer algorithm that selects a pivot and partitions the array around it.',
      complexity: {
        time: 'O(n log n)',
        space: 'O(log n)',
        best: 'O(n log n)',
        worst: 'O(n²)',
        average: 'O(n log n)'
      },
      pseudocode: `procedure quickSort(A, low, high)
    if low < high then
        p := partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)
    end if
end procedure`,
      useCases: ['General sorting', 'In-place sorting', 'Average O(n log n)']
    })
  }

  initialize(size) {
    const array = AlgorithmUtils.generateRandomArray(size, 100)
    this.reset()
    this.generateSteps(array)
    return {
      array: array.slice(),
      steps: this.steps.length,
      comparisons: this.comparisons,
      swaps: this.swaps
    }
  }

  generateSteps(array) {
    const arr = array.slice()
    this.quickSort(arr, 0, arr.length - 1)
  }

  quickSort(arr, low, high) {
    if (low < high) {
      const pi = this.partition(arr, low, high)
      this.quickSort(arr, low, pi - 1)
      this.quickSort(arr, pi + 1, high)
    }
  }

  partition(arr, low, high) {
    const pivot = arr[high]
    let i = low - 1

    for (let j = low; j < high; j++) {
      AlgorithmUtils.recordComparison(this)
      if (arr[j] < pivot) {
        i++
        [arr[i], arr[j]] = [arr[j], arr[i]]
        AlgorithmUtils.recordSwap(this)
        AlgorithmUtils.addStep(this, {
          type: 'swap',
          indices: [i, j],
          array: arr.slice(),
          comparisons: this.comparisons,
          swaps: this.swaps
        })
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    AlgorithmUtils.recordSwap(this)
    AlgorithmUtils.addStep(this, {
      type: 'partition',
      indices: [i + 1],
      array: arr.slice(),
      comparisons: this.comparisons,
      swaps: this.swaps
    })

    return i + 1
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return

    const step = this.steps[currentStep]
    const array = step ? step.array : state.array
    const barWidth = width / array.length
    const maxValue = 100
    const chartHeight = height - 40

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (chartHeight - 20)
      const x = index * barWidth + 1
      const y = height - barHeight - 20

      let color = '#8b5cf6'
      if (step && step.indices && step.indices.includes(index)) {
        color = step.type === 'partition' ? '#10b981' : '#ef4444'
      }

      ctx.fillStyle = color
      ctx.fillRect(x, y, barWidth - 2, barHeight)
    })

    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`Comparisons: ${step?.comparisons || 0} | Swaps: ${step?.swaps || 0}`, 10, 20)
  }
}
