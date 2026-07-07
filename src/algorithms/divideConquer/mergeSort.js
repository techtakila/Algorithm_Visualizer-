import { drawArrayBars, drawTitle } from '../visualHelpers'

export const MergeSortDC = {
  name: 'Merge Sort (Divide and Conquer)',
  description: 'Merge Sort demonstrates divide and conquer by recursively splitting the array, solving each half, and merging the sorted ranges.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
  },
  pseudocode: `procedure mergeSort(A, left, right)
    if left < right then
        mid := (left + right) / 2
        mergeSort(A, left, mid)
        mergeSort(A, mid + 1, right)
        merge(A, left, mid, right)
    end if
end procedure`,
  useCases: [
    'Stable general-purpose sorting',
    'External sorting',
    'Teaching recursive decomposition',
  ],
  initialize: (size) => {
    const n = Math.min(size, 48)
    const array = Array.from({ length: n }, () => Math.floor(Math.random() * 92) + 8)
    const steps = []
    const working = array.slice()
    mergeSort(working, 0, working.length - 1, steps)
    return { array, steps, currentArray: array.slice() }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    const values = step?.array || state.currentArray
    drawTitle(ctx, 'Split, Solve, Merge', step?.note || 'Recursive merge sort ranges')
    drawArrayBars(ctx, values, width, height, {
      active: step ? range(step.left, step.right) : [],
      success: step?.type === 'merge' ? range(step.left, step.right) : [],
      top: 92,
    })
  },
}

function mergeSort(arr, left, right, steps) {
  if (left >= right) return
  const mid = Math.floor((left + right) / 2)
  steps.push({ type: 'split', left, right, array: arr.slice(), note: `Split range ${left}-${right}` })
  mergeSort(arr, left, mid, steps)
  mergeSort(arr, mid + 1, right, steps)
  merge(arr, left, mid, right, steps)
}

function merge(arr, left, mid, right, steps) {
  const leftArr = arr.slice(left, mid + 1)
  const rightArr = arr.slice(mid + 1, right + 1)
  let i = 0
  let j = 0
  let k = left

  while (i < leftArr.length && j < rightArr.length) {
    arr[k] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++]
    steps.push({ type: 'merge', left, right, array: arr.slice(), note: `Merge range ${left}-${right}` })
    k += 1
  }
  while (i < leftArr.length) {
    arr[k++] = leftArr[i++]
    steps.push({ type: 'merge', left, right, array: arr.slice(), note: `Merge range ${left}-${right}` })
  }
  while (j < rightArr.length) {
    arr[k++] = rightArr[j++]
    steps.push({ type: 'merge', left, right, array: arr.slice(), note: `Merge range ${left}-${right}` })
  }
}

function range(left, right) {
  return Array.from({ length: right - left + 1 }, (_, index) => left + index)
}
