import { drawArrayBars, drawTitle } from '../visualHelpers'

export const BinarySearch = {
  name: 'Binary Search',
  description: 'Binary Search finds a target in sorted data by repeatedly checking the middle value and discarding the half that cannot contain the answer.',
  complexity: {
    time: 'O(log n)',
    space: 'O(1)',
  },
  pseudocode: `procedure binarySearch(A, target)
    left := 0
    right := length(A) - 1
    while left <= right do
        mid := (left + right) / 2
        if A[mid] == target then return mid
        if A[mid] < target then left := mid + 1
        else right := mid - 1
    end while
    return -1
end procedure`,
  useCases: [
    'Sorted arrays',
    'Database indexes',
    'Large ordered datasets',
    'Finding insertion positions',
  ],
  initialize: (size) => {
    const n = Math.min(size, 70)
    const array = Array.from({ length: n }, (_, i) => i * 2 + 3)
    const target = array[Math.floor(n * 0.62)]
    return { array: array.slice(), target, steps: buildSteps(array, target), currentArray: array.slice() }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    drawTitle(ctx, 'Halve the Candidate Range', step?.found ? `Found ${state.target} at index ${step.mid}` : `Search target: ${state.target}`)
    drawArrayBars(ctx, state.currentArray, width, height, {
      active: step ? [step.mid] : [],
      success: step?.found ? [step.mid] : [],
      muted: step ? state.currentArray.map((_, i) => i).filter((i) => i < step.left || i > step.right) : [],
      top: 92,
    })
  },
}

function buildSteps(array, target) {
  const steps = []
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const found = array[mid] === target
    steps.push({ left, right, mid, found })
    if (found) break
    if (array[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return steps
}
