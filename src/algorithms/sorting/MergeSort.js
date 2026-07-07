import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class MergeSort extends BaseAlgorithm {
  constructor() {
    super({
      id: 'merge-sort',
      name: 'Merge Sort',
      category: 'sorting',
      description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together. It guarantees O(n log n) time complexity and is stable, making it ideal for large datasets.',
      complexity: {
        time: 'O(n log n)',
        space: 'O(n)',
        best: 'O(n log n)',
        worst: 'O(n log n)',
        average: 'O(n log n)'
      },
      pseudocode: `procedure mergeSort(A : list, left, right)
    if left < right then
        mid := ⌊(left + right) / 2⌋
        mergeSort(A, left, mid)
        mergeSort(A, mid + 1, right)
        merge(A, left, mid, right)
    end if
end procedure`,
      useCases: [
        'Large datasets requiring guaranteed O(n log n) performance',
        'External sorting with limited memory (disk-based sorting)',
        'Linked list sorting where random access is unavailable',
        'Stable sorting requirement (preserving order of equal elements)'
      ],
      visualizationType: 'array'
    })
  }

  initialize(size) {
    const array = AlgorithmUtils.generateRandomArray(size)
    this.state = {
      array: array.slice(),
      sorted: false
    }
    this.generateSteps(array)
    return this.state
  }

  generateSteps(array) {
    const arr = array.slice()
    this.reset()
    this.mergeSort(arr, 0, arr.length - 1)
  }

  mergeSort(arr, left, right) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2)
      this.mergeSort(arr, left, mid)
      this.mergeSort(arr, mid + 1, right)
      this.merge(arr, left, mid, right)
    }
  }

  merge(arr, left, mid, right) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    while (i < leftArr.length && j < rightArr.length) {
      AlgorithmUtils.recordComparison(this)
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++]
      } else {
        arr[k++] = rightArr[j++]
      }
      AlgorithmUtils.recordSwap(this)
      AlgorithmUtils.addStep(this, {
        type: 'merge',
        indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        array: arr.slice()
      })
    }

    while (i < leftArr.length) {
      arr[k++] = leftArr[i++]
      AlgorithmUtils.addStep(this, {
        type: 'merge',
        indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        array: arr.slice()
      })
    }

    while (j < rightArr.length) {
      arr[k++] = rightArr[j++]
      AlgorithmUtils.addStep(this, {
        type: 'merge',
        indices: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        array: arr.slice()
      })
    }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return

    const array = state.array
    const barWidth = width / array.length
    const maxValue = 100
    const padding = 20
    const chartHeight = height - padding

    ctx.clearRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (chartHeight - padding)
      const x = index * barWidth
      const y = height - barHeight - 10

      let color = '#10b981' // green
      if (this.steps[currentStep]?.indices?.includes(index)) {
        color = '#f59e0b' // amber
      }

      RenderUtils.drawBar(ctx, x, y, barWidth - 2, barHeight, color)
    })

    RenderUtils.drawText(ctx, `Comparisons: ${this.comparisons} | Swaps: ${this.swaps}`, 10, 15, {
      fontSize: 12,
      color: '#666'
    })
  }
}
