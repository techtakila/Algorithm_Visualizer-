import { drawArrayBars, drawTitle } from '../visualHelpers'

export const QuickSort = {
  name: 'Quick Sort',
  description: 'Quick Sort chooses a pivot, partitions values around it, and recursively sorts the smaller ranges. It is usually fast in practice and works in place.',
  complexity: {
    time: 'O(n log n) average, O(n^2) worst',
    space: 'O(log n)',
  },
  pseudocode: `procedure quickSort(A, low, high)
    if low < high then
        p := partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)
    end if
end procedure`,
  useCases: [
    'General-purpose sorting',
    'In-place sorting',
    'Average-case performance',
    'Cache-friendly array sorting',
  ],
  initialize: (size) => {
    const n = Math.min(size, 64)
    const array = Array.from({ length: n }, () => Math.floor(Math.random() * 92) + 8)
    const working = array.slice()
    const steps = []
    quickSort(working, 0, working.length - 1, steps)
    return { array, steps, currentArray: array.slice() }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    drawTitle(ctx, 'Pivot Partitioning', step?.note || 'Choose a pivot and partition the range.')
    drawArrayBars(ctx, step?.array || state.currentArray, width, height, {
      active: step ? [step.i, step.j, step.pivot].filter((value) => value !== undefined) : [],
      success: step?.pivotFinal !== undefined ? [step.pivotFinal] : [],
      top: 92,
    })
  },
}

function quickSort(arr, low, high, steps) {
  if (low >= high) return
  const pivotIndex = partition(arr, low, high, steps)
  steps.push({ array: arr.slice(), pivotFinal: pivotIndex, note: `Pivot fixed at index ${pivotIndex}` })
  quickSort(arr, low, pivotIndex - 1, steps)
  quickSort(arr, pivotIndex + 1, high, steps)
}

function partition(arr, low, high, steps) {
  const pivot = arr[high]
  let i = low - 1
  steps.push({ array: arr.slice(), pivot: high, note: `Partition range ${low}-${high}` })

  for (let j = low; j < high; j += 1) {
    steps.push({ array: arr.slice(), i, j, pivot: high, note: `Compare ${arr[j]} with pivot ${pivot}` })
    if (arr[j] <= pivot) {
      i += 1
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      steps.push({ array: arr.slice(), i, j, pivot: high, note: `Swap into the left partition` })
    }
  }

  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
  steps.push({ array: arr.slice(), i: i + 1, pivot: high, note: 'Move pivot into final position' })
  return i + 1
}
