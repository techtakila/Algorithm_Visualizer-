import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class MergeSort extends BaseAlgorithm {
  constructor() {
    super({
      id: 'merge-sort',
      name: 'Merge Sort',
      category: 'sorting',
      description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges them back.',
      complexity: {
        time: 'O(n log n)',
        space: 'O(n)',
        best: 'O(n log n)',
        worst: 'O(n log n)',
        average: 'O(n log n)'
      },
      pseudocode: `procedure mergeSort(A, left, right)
    if left < right then
        mid := (left + right) / 2
        mergeSort(A, left, mid)
        mergeSort(A, mid + 1, right)
        merge(A, left, mid, right)
    end if
end procedure`,
      useCases: [
        'Large datasets',
        'Guaranteed O(n log n)',
        'External sorting'
      ],
      visualizationType: 'array'
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
        indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
        array: arr.slice(),
        comparisons: this.comparisons,
        swaps: this.swaps
      })
    }

    while (i < leftArr.length) {
      arr[k++] = leftArr[i++]
      AlgorithmUtils.addStep(this, {
        type: 'merge',
        indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
        array: arr.slice(),
        comparisons: this.comparisons,
        swaps: this.swaps
      })
    }

    while (j < rightArr.length) {
      arr[k++] = rightArr[j++]
      AlgorithmUtils.addStep(this, {
        type: 'merge',
        indices: Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
        array: arr.slice(),
        comparisons: this.comparisons,
        swaps: this.swaps
      })
    }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return

    const step = this.steps[currentStep]
    const array = step ? step.array : state.array
    const barWidth = width / array.length
    const maxValue = 100
    const padding = 40
    const chartHeight = height - padding

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (chartHeight - 20)
      const x = index * barWidth + 1
      const y = height - barHeight - 20

      let color = '#10b981'
      if (step && step.indices && step.indices.includes(index)) {
        color = '#f59e0b'
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
