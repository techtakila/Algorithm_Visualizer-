import { drawArrayBars, drawTitle } from '../visualHelpers'

export const BubbleSort = {
  name: 'Bubble Sort',
  description: 'Bubble Sort repeatedly compares neighboring values and swaps them when they are out of order. Large values “bubble” toward the end after each pass.',
  complexity: {
    time: 'O(n^2)',
    space: 'O(1)',
  },
  pseudocode: `procedure bubbleSort(A)
    for i := 0 to length(A) - 1 do
        for j := 0 to length(A) - i - 2 do
            if A[j] > A[j+1] then
                swap(A[j], A[j+1])
            end if
        end for
    end for
end procedure`,
  useCases: [
    'Educational purposes',
    'Tiny datasets',
    'Nearly sorted data',
    'Memory-constrained demonstrations',
  ],
  initialize: (size) => {
    const n = Math.min(size, 70)
    const array = Array.from({ length: n }, () => Math.floor(Math.random() * 92) + 8)
    return {
      array: array.slice(),
      steps: generateBubbleSortSteps(array),
      currentArray: array.slice(),
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    drawTitle(ctx, 'Adjacent Comparisons', step?.note || 'Compare neighbors and swap if needed.')
    drawArrayBars(ctx, step?.array || state.currentArray, width, height, {
      active: step ? [step.i, step.j] : [],
      success: step?.sortedIndex !== undefined ? Array.from({ length: state.currentArray.length - step.sortedIndex }, (_, index) => step.sortedIndex + index) : [],
      top: 92,
    })
  },
}

function generateBubbleSortSteps(array) {
  const steps = []
  const arr = array.slice()
  const n = arr.length

  for (let i = 0; i < n - 1; i += 1) {
    for (let j = 0; j < n - i - 1; j += 1) {
      steps.push({ type: 'compare', i: j, j: j + 1, array: arr.slice(), note: `Compare indexes ${j} and ${j + 1}` })
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({ type: 'swap', i: j, j: j + 1, array: arr.slice(), note: 'Swap out-of-order neighbors' })
      }
    }
    steps.push({ type: 'pass', sortedIndex: n - i - 1, array: arr.slice(), note: `Index ${n - i - 1} is fixed` })
  }
  steps.push({ type: 'done', sortedIndex: 0, array: arr.slice(), note: 'Array sorted' })
  return steps
}
