import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class BinarySearch extends BaseAlgorithm {
  constructor() {
    super({
      id: 'binary-search',
      name: 'Binary Search',
      category: 'searching',
      description: 'Binary Search efficiently finds a target in a sorted array by repeatedly dividing the search space in half. Requires the array to be sorted but provides logarithmic time complexity.',
      complexity: {
        time: 'O(log n)',
        space: 'O(1)',
        best: 'O(1)',
        worst: 'O(log n)',
        average: 'O(log n)'
      },
      pseudocode: `procedure binarySearch(A : sorted list, target)
    left := 0
    right := length(A) - 1
    while left <= right do
        mid := ⌊(left + right) / 2⌋
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            left := mid + 1
        else
            right := mid - 1
        end if
    end while
    return -1
end procedure`,
      useCases: [
        'Searching sorted arrays and lists',
        'Database indexing and lookups',
        'Finding insertion positions',
        'Large-scale data retrieval systems'
      ],
      visualizationType: 'array'
    })
  }

  initialize(size) {
    const array = AlgorithmUtils.generateSortedArray(size)
    const target = array[Math.floor(Math.random() * size)]
    this.state = {
      array: array.slice(),
      target,
      found: false,
      foundIndex: -1
    }
    this.generateSteps(array, target)
    return this.state
  }

  generateSteps(array, target) {
    this.reset()
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
        array: array.slice()
      })

      if (array[mid] === target) {
        this.state.found = true
        this.state.foundIndex = mid
        break
      } else if (array[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return

    const array = state.array
    const step = this.steps[currentStep]
    const barWidth = width / array.length
    const maxValue = array[array.length - 1] || 100
    const chartHeight = height - 40

    ctx.clearRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight
      const x = index * barWidth
      const y = height - barHeight - 10

      let color = '#3b82f6'
      if (step) {
        if (index === step.mid) {
          color = '#f59e0b'
        } else if (index < step.left || index > step.right) {
          color = '#d1d5db'
        } else if (step.found) {
          color = '#10b981'
        }
      }

      RenderUtils.drawBar(ctx, x, y, barWidth - 2, barHeight, color)
    })

    RenderUtils.drawText(ctx, `Target: ${state.target.toFixed(2)} | Found: ${state.found} | Operations: ${this.operations}`, 10, 15, {
      fontSize: 12,
      color: '#333'
    })
  }
}
