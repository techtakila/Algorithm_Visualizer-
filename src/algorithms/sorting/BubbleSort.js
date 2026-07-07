import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class BubbleSort extends BaseAlgorithm {
  constructor() {
    super({
      id: 'bubble-sort',
      name: 'Bubble Sort',
      category: 'sorting',
      description: 'Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Despite its simplicity, it is rarely used in practice due to poor performance on large lists.',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)',
        best: 'O(n)',
        worst: 'O(n²)',
        average: 'O(n²)'
      },
      pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    repeat
        swapped := false
        for i := 1 to n-1 do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped := true
            end if
        end for
        n := n - 1
    until not swapped
end procedure`,
      useCases: [
        'Educational purposes - demonstrates sorting concepts clearly',
        'Nearly sorted data where performance is acceptable',
        'Small datasets with memory constraints',
        'Testing sorting algorithm implementations'
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
    const n = arr.length
    this.reset()

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        AlgorithmUtils.recordComparison(this)
        AlgorithmUtils.addStep(this, {
          type: 'compare',
          indices: [j, j + 1],
          array: arr.slice()
        })

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          AlgorithmUtils.recordSwap(this)
          AlgorithmUtils.addStep(this, {
            type: 'swap',
            indices: [j, j + 1],
            array: arr.slice()
          })
        }
      }
    }
  }

  executeStep(stepIndex) {
    const step = this.steps[stepIndex]
    if (!step) return null
    return { ...step, currentIndex: stepIndex }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return
    
    const array = state.array
    const barWidth = width / array.length
    const maxValue = 100
    const padding = 20
    const chartHeight = height - padding

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw bars
    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (chartHeight - padding)
      const x = index * barWidth
      const y = height - barHeight - 10

      let color = '#3b82f6' // blue
      if (this.steps[currentStep]?.indices?.includes(index)) {
        color = this.steps[currentStep]?.type === 'swap' ? '#ef4444' : '#f59e0b' // red or amber
      }

      RenderUtils.drawBar(ctx, x, y, barWidth - 2, barHeight, color)
    })

    // Draw stats
    RenderUtils.drawText(ctx, `Comparisons: ${this.comparisons} | Swaps: ${this.swaps}`, 10, 15, {
      fontSize: 12,
      color: '#666'
    })
  }
}
