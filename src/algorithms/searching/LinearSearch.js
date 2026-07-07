import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class LinearSearch extends BaseAlgorithm {
  constructor() {
    super({
      id: 'linear-search',
      name: 'Linear Search',
      category: 'searching',
      description: 'Linear Search sequentially checks each element of a list until a match is found or the end is reached. Simple but effective for unsorted data and small lists.',
      complexity: {
        time: 'O(n)',
        space: 'O(1)',
        best: 'O(1)',
        worst: 'O(n)',
        average: 'O(n)'
      },
      pseudocode: `procedure linearSearch(A : list, target)
    for i := 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure`,
      useCases: [
        'Searching unsorted lists',
        'Small datasets where simplicity matters',
        'Linked lists (no random access available)',
        'Online search where data arrives sequentially'
      ],
      visualizationType: 'array'
    })
  }

  initialize(size) {
    const array = AlgorithmUtils.generateRandomArray(size)
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
    for (let i = 0; i < array.length; i++) {
      AlgorithmUtils.recordOperation(this)
      AlgorithmUtils.addStep(this, {
        type: 'check',
        indices: [i],
        found: array[i] === target,
        array: array.slice()
      })
      if (array[i] === target) {
        this.state.found = true
        this.state.foundIndex = i
        break
      }
    }
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

      let color = '#3b82f6'
      if (this.steps[currentStep]?.indices?.includes(index)) {
        color = this.steps[currentStep]?.found ? '#10b981' : '#f59e0b'
      }

      RenderUtils.drawBar(ctx, x, y, barWidth - 2, barHeight, color)
    })

    RenderUtils.drawText(ctx, `Target: ${state.target.toFixed(2)} | Found: ${state.found ? 'Yes' : 'No'} | Operations: ${this.operations}`, 10, 15, {
      fontSize: 12,
      color: '#333'
    })
  }
}
