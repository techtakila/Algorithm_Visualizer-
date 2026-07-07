import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class QuickSort extends BaseAlgorithm {
  constructor() {
    super({
      id: 'quick-sort',
      name: 'Quick Sort',
      category: 'sorting',
      description: 'Quick Sort is a highly efficient divide-and-conquer algorithm that selects a pivot and partitions the array around it. While it has O(n²) worst-case complexity, its average-case O(n log n) performance and small space complexity make it one of the most popular sorting algorithms.',
      complexity: {
        time: 'O(n log n)',
        space: 'O(log n)',
        best: 'O(n log n)',
        worst: 'O(n²)',
        average: 'O(n log n)'
      },
      pseudocode: `procedure quickSort(A : list, low, high)
    if low < high then
        p := partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)
    end if
end procedure`,
      useCases: [
        'General-purpose sorting in applications like C++ std::sort',
        'In-place sorting with minimal extra memory',
        'Average-case performance critical applications',
        'Cache-friendly sorting for modern processors'
      ],
      visualizationType: 'array'
    })
  }

  initialize(size) {
    const array = AlgorithmUtils.generateRandomArray(size)
    this.state = { array: array.slice(), sorted: false }
    this.generateSteps(array)
    return this.state
  }

  generateSteps(array) {
    const arr = array.slice()
    this.reset()
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
          array: arr.slice()
        })
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    AlgorithmUtils.recordSwap(this)
    AlgorithmUtils.addStep(this, {
      type: 'partition',
      indices: [i + 1],
      array: arr.slice()
    })

    return i + 1
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return

    const array = state.array
    const barWidth = width / array.length
    const maxValue = 100
    const chartHeight = height - 40

    ctx.clearRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight
      const x = index * barWidth
      const y = height - barHeight - 10

      let color = '#8b5cf6' // purple
      if (this.steps[currentStep]?.indices?.includes(index)) {
        color = this.steps[currentStep]?.type === 'partition' ? '#10b981' : '#ef4444'
      }

      RenderUtils.drawBar(ctx, x, y, barWidth - 2, barHeight, color)
    })

    RenderUtils.drawText(ctx, `Comparisons: ${this.comparisons} | Swaps: ${this.swaps}`, 10, 15, {
      fontSize: 12,
      color: '#333'
    })
  }
}
