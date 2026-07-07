import { BaseAlgorithm, AlgorithmUtils } from '../core/algorithmEngine'

export class LinearSearch extends BaseAlgorithm {
  constructor() {
    super({
      id: 'linear-search',
      name: 'Linear Search',
      category: 'searching',
      description: 'Linear Search sequentially checks each element until a match is found.',
      complexity: {
        time: 'O(n)',
        space: 'O(1)'
      },
      pseudocode: `procedure linearSearch(A, target)
    for i := 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure`,
      useCases: ['Unsorted lists', 'Small datasets']
    })
  }

  initialize(size) {
    const array = AlgorithmUtils.generateRandomArray(size, 100)
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
    for (let i = 0; i < array.length; i++) {
      AlgorithmUtils.recordOperation(this)
      AlgorithmUtils.addStep(this, {
        type: 'check',
        indices: [i],
        found: array[i] === target,
        array: array.slice(),
        comparisons: this.comparisons
      })
      if (array[i] === target) break
    }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.array) return

    const step = this.steps[currentStep]
    const array = state.array
    const barWidth = width / array.length
    const maxValue = 100
    const chartHeight = height - 40

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    array.forEach((value, index) => {
      const barHeight = (value / maxValue) * (chartHeight - 20)
      const x = index * barWidth + 1
      const y = height - barHeight - 20

      let color = '#3b82f6'
      if (step && step.indices && step.indices.includes(index)) {
        color = step.found ? '#10b981' : '#f59e0b'
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
