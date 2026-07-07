import { drawArrayBars, drawTitle } from '../visualHelpers'

export const BinarySearchDC = {
  name: 'Binary Search (Divide and Conquer)',
  description: 'Recursive binary search divides the sorted search interval in half until the target is found or no candidate range remains.',
  complexity: {
    time: 'O(log n)',
    space: 'O(log n) recursive',
  },
  pseudocode: `procedure binarySearchDC(A, target, left, right)
    if left > right then return -1
    mid := (left + right) / 2
    if A[mid] == target then return mid
    if A[mid] > target then
        return binarySearchDC(A, target, left, mid - 1)
    return binarySearchDC(A, target, mid + 1, right)
end procedure`,
  useCases: [
    'Searching sorted data',
    'Finding insertion positions',
    'Recursive divide-and-conquer education',
  ],
  initialize: (size) => {
    const n = Math.min(size, 42)
    const array = Array.from({ length: n }, (_, i) => i * 3 + 2)
    const target = array[Math.floor(n * 0.68)]
    return {
      array: array.slice(),
      target,
      steps: buildSteps(array, target, 0, array.length - 1),
      currentArray: array.slice(),
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    drawTitle(ctx, 'Recursive Halving', step?.found ? `Found ${state.target} at index ${step.mid}` : `Search for ${state.target}`)
    drawArrayBars(ctx, state.currentArray, width, height, {
      active: step ? [step.mid] : [],
      success: step?.found ? [step.mid] : [],
      muted: step ? state.currentArray.map((_, i) => i).filter((i) => i < step.left || i > step.right) : [],
      top: 92,
    })
  },
}

function buildSteps(array, target, left, right, steps = []) {
  if (left > right) return steps
  const mid = Math.floor((left + right) / 2)
  const found = array[mid] === target
  steps.push({ left, right, mid, found })
  if (found) return steps
  if (array[mid] > target) return buildSteps(array, target, left, mid - 1, steps)
  return buildSteps(array, target, mid + 1, right, steps)
}
