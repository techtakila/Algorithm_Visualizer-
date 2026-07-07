// Merge Sort - Divide & Conquer
export const MergeSortDC = {
  name: 'Merge Sort (Divide & Conquer)',
  description: 'Merge Sort exemplifies the divide-and-conquer paradigm. It divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)'
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
    'General-purpose sorting',
    'External sorting',
    'Stable sorting requirement'
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
    drawArray(ctx, state.currentArray, width, height)
  }
}

function drawArray(ctx, arr, width, height) {
  const barWidth = width / arr.length
  const maxValue = 100
  
  arr.forEach((value, index) => {
    const barHeight = (value / maxValue) * (height - 40)
    const x = index * barWidth
    const y = height - barHeight - 20
    
    ctx.fillStyle = '#10b981'
    ctx.fillRect(x, y, barWidth - 2, barHeight)
  })
}
