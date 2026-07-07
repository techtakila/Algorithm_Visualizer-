import { drawArrayBars, drawTitle } from '../visualHelpers'

export const InsertionSort = {
  name: 'Insertion Sort',
  description: 'Insertion Sort grows a sorted prefix by taking one value at a time and shifting larger values to make room for it.',
  complexity: {
    time: 'O(n^2)',
    space: 'O(1)',
  },
  pseudocode: `procedure insertionSort(A)
    for i := 1 to length(A) - 1 do
        key := A[i]
        j := i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] := A[j]
            j := j - 1
        end while
        A[j + 1] := key
    end for
end procedure`,
  useCases: [
    'Small datasets',
    'Nearly sorted data',
    'Online sorting',
    'Memory-efficient sorting',
  ],
  initialize: (size) => {
    const n = Math.min(size, 70)
    const array = Array.from({ length: n }, () => Math.floor(Math.random() * 92) + 8)
    const steps = generateInsertionSortSteps(array)
    return { array: array.slice(), steps, currentArray: array.slice() }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    drawTitle(ctx, 'Grow a Sorted Prefix', step?.note || 'Insert each item into the sorted left side.')
    drawArrayBars(ctx, step?.array || state.currentArray, width, height, {
      active: step ? [step.index, step.from, step.to].filter((value) => value !== undefined) : [],
      success: step ? Array.from({ length: step.sortedUntil + 1 }, (_, i) => i) : [],
      top: 92,
    })
  },
}

function generateInsertionSortSteps(array) {
  const steps = []
  const arr = array.slice()

  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i]
    let j = i - 1
    steps.push({ array: arr.slice(), index: i, sortedUntil: i - 1, note: `Pick ${key} from index ${i}` })
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      steps.push({ array: arr.slice(), from: j, to: j + 1, sortedUntil: i, note: `Shift ${arr[j]} right` })
      j -= 1
    }
    arr[j + 1] = key
    steps.push({ array: arr.slice(), index: j + 1, sortedUntil: i, note: `Insert ${key} at index ${j + 1}` })
  }
  return steps
}
