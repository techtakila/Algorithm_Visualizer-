import { drawArrayBars, drawTitle } from '../visualHelpers'

export const MergeSort = {
  name: 'Merge Sort',
  description: 'Merge Sort splits the array into halves, recursively sorts each half, and merges the sorted halves. It is stable and guarantees O(n log n) time.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
  },
  pseudocode: `procedure mergeSort(A)
    if length(A) > 1 then
        split A into left and right
        mergeSort(left)
        mergeSort(right)
        merge left and right back into A
    end if
end procedure`,
  useCases: [
    'Large datasets',
    'Stable sorting',
    'External sorting',
    'Linked list sorting',
  ],
  initialize: (size) => {
    const n = Math.min(size, 64)
    const array = Array.from({ length: n }, () => Math.floor(Math.random() * 92) + 8)
    const working = array.slice()
    const steps = []
    mergeSort(working, 0, working.length - 1, steps)
    return { array: array.slice(), steps, currentArray: array.slice() }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    drawTitle(ctx, 'Stable Merge Process', step?.note || 'Merge sorted ranges.')
    drawArrayBars(ctx, step?.array || state.currentArray, width, height, {
      active: step ? range(step.left, step.right) : [],
      success: step?.type === 'merge' ? range(step.left, step.right) : [],
      top: 92,
    })
  },
}

function mergeSort(arr, left, right, steps) {
  if (left >= right) return
  const mid = Math.floor((left + right) / 2)
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
    steps.push({ type: 'merge', left, right, array: arr.slice(), note: `Merge positions ${left}-${right}` })
    k += 1
  }
  while (i < leftArr.length) {
    arr[k++] = leftArr[i++]
    steps.push({ type: 'merge', left, right, array: arr.slice(), note: `Copy remaining left values` })
  }
  while (j < rightArr.length) {
    arr[k++] = rightArr[j++]
    steps.push({ type: 'merge', left, right, array: arr.slice(), note: `Copy remaining right values` })
  }
}

function range(left, right) {
  return Array.from({ length: right - left + 1 }, (_, index) => left + index)
}
