import { BaseAlgorithm, AlgorithmUtils } from '../core/algorithmEngine'

export class BinarySearch extends BaseAlgorithm {
  constructor() {
    super({
      id: 'binary-search',
      name: 'Binary Search',
      category: 'searching',
      description: 'Binary Search efficiently finds a target in a sorted array by dividing the search space in half.',
      complexity: {
        time: 'O(log n)',
        space: 'O(1)'
      },
      pseudocode: `procedure binarySearch(A, target)
    left := 0, right := length(A) - 1
    while left <= right do
        mid := (left + right) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            left := mid + 1
        else
            right := mid - 1
        end if
    end while
end procedure`,
      useCases: ['Sorted arrays', 'Database lookups']
    })
  }

  initialize(size) {
    const array = AlgorithmUtils.generateSortedArray(size, 100)
    const target = array[Math.floor(Math.random() * size)]
    this.reset()
    this.generateSteps(array, target)
    return {
      array: array.slice(),
      target,
      steps: this.steps.length,
      comparisons: this.comparisons
    }
  }

  generateSteps(array, target) {
    let left = 0, right = array.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      AlgorithmUtils.recordOperation(this)
      AlgorithmUtils.addStep(this, {
        type: 'check',
        left,
        mid,
        right,
        found: array[mid] === target,
        array: array.slice(),
        comparisons: this.comparisons
      })

      if (array[mid] === target) break
      else if (array[mid] < target) left = mid + 1
      else right = mid - 1
    }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return

    const step = this.steps[currentStep]
    const array = state.array
    const barWidth = width / array.length
    const maxValue = array[array.length - 1] || 100
    const chartHeight = height - 40

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (chartHeight - 20)
      const x = index * barWidth + 1
      const y = height - barHeight - 20

      let color = '#3b82f6'
      if (step) {
        if (index === step.mid) color = '#f59e0b'
        else if (index < step.left || index > step.right) color = '#d1d5db'
        else if (step.found) color = '#10b981'
      }

      ctx.fillStyle = color
      ctx.fillRect(x, y, barWidth - 2, barHeight)
    })

    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`Target: ${state.target.toFixed(0)} | Operations: ${step?.comparisons || 0}`, 10, 20)
  }
}
