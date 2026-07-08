import { drawArrayBars, drawTitle } from '../visualHelpers'

export const LinearSearch = {
  name: 'Linear Search',
  description: 'Linear Search checks each value one by one until it finds the target or reaches the end of the list. It works without sorted data.',
  complexity: {
    time: 'O(n)',
    space: 'O(1)',
  },
  pseudocode: `procedure linearSearch(A, target)
    for i := 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure`,
  useCases: [
    'Unsorted lists',
    'Small datasets',
    'Linked lists',
    'Simple membership checks',
  ],
  initialize: (size) => {
    const n = Math.min(size, 70)
    const array = Array.from({ length: n }, () => Math.floor(Math.random() * 92) + 8)
    const targetIndex = Math.floor(n * 0.72)
    const target = array[targetIndex]
    return { array: array.slice(), target, steps: buildSteps(array, target), currentArray: array.slice() }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    drawTitle(ctx, 'Sequential Scan', step?.found ? `Found ${state.target} at index ${step.index}` : `Search target: ${state.target}`)
    drawArrayBars(ctx, state.currentArray, width, height, {
      active: step ? [step.index] : [],
      success: step?.found ? [step.index] : [],
      muted: step ? state.currentArray.map((_, i) => i).filter((i) => i < step.index) : [],
      top: 92,
    })
  },
}

function buildSteps(array, target) {
  const steps = []
  for (let i = 0; i < array.length; i += 1) {
    steps.push({ index: i, found: array[i] === target })
    if (array[i] === target) break
  }
  return steps
}
