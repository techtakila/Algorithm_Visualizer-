// Quick Sort Implementation
export const QuickSort = {
  name: 'Quick Sort',
  description: 'Quick Sort is a highly efficient divide-and-conquer sorting algorithm. It works by selecting a pivot element and partitioning the array around it, then recursively sorting the sub-arrays. On average, it is faster than merge sort despite having O(n²) worst-case complexity.',
  complexity: {
    time: 'O(n log n) average, O(n²) worst',
    space: 'O(log n)'
  },
  pseudocode: `procedure quickSort(A : list, low, high)
    if low < high then
        p := partition(A, low, high)
        quickSort(A, low, p - 1)
        quickSort(A, p + 1, high)
    end if
end procedure`,
  useCases: [
    'General-purpose sorting',
    'When average-case performance matters more than worst-case',
    'In-place sorting requirements',
    'Cache-friendly sorting for large datasets'
  ],
  initialize: (size) => {
    const array = Array.from({ length: size }, () => Math.random() * 100)
    return {
      array: array.slice(),
      steps: [],
      currentArray: array.slice()
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawArray(ctx, state.currentArray, width, height)
  }
}
