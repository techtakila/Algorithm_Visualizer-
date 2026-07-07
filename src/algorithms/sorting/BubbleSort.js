import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class BubbleSort extends BaseAlgorithm {
  constructor() {
    super({
      id: 'bubble-sort',
      name: 'Bubble Sort',
      category: 'sorting',
      description: 'Bubble Sort is a simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
      complexity: {
        time: 'O(n²)',
        space: 'O(1)',
        best: 'O(n)',
        worst: 'O(n²)',
        average: 'O(n²)'
      },
      pseudocode: `procedure bubbleSort(A : list)
    n := length(A)
    for i := 0 to n-1 do
        for j := 0 to n-i-2 do
            if A[j] > A[j+1] then
                swap(A[j], A[j+1])
            end if
        end for
    end for
end procedure`,
      useCases: [
        'Educational purposes',
        'Small datasets',
        'Nearly sorted data'
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
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        AlgorithmUtils.recordComparison(this)
        AlgorithmUtils.addStep(this, {
          type: 'compare',
          indices: [j, j + 1],
          array: arr.slice(),
          comparisons: this.comparisons,
          swaps: this.swaps
        })

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          AlgorithmUtils.recordSwap(this)
          AlgorithmUtils.addStep(this, {
            type: 'swap',
            indices: [j, j + 1],
            array: arr.slice(),
            comparisons: this.comparisons,
            swaps: this.swaps
          })
        }
      }
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

    // Clear canvas
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Draw bars
    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (chartHeight - 20)
      const x = index * barWidth + 1
      const y = height - barHeight - 20

      let color = '#3b82f6'
      if (step && step.indices && step.indices.includes(index)) {
        color = step.type === 'swap' ? '#ef4444' : '#f59e0b'
      }

      ctx.fillStyle = color
      ctx.fillRect(x, y, barWidth - 2, barHeight)
    })

    // Draw stats
    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`Comparisons: ${step?.comparisons || 0} | Swaps: ${step?.swaps || 0}`, 10, 20)
  }
}
