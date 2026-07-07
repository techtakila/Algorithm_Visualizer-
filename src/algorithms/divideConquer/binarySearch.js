// Binary Search - Divide & Conquer
export const BinarySearchDC = {
  name: 'Binary Search (Divide & Conquer)',
  description: 'Binary Search is a classic divide-and-conquer algorithm that efficiently searches a sorted array by repeatedly dividing the search space in half.',
  complexity: {
    time: 'O(log n)',
    space: 'O(log n) recursive'
  },
  pseudocode: `procedure binarySearchDC(A, target, left, right)
    if left <= right then
        mid := (left + right) / 2
        if A[mid] == target then
            return mid
        else if A[mid] > target then
            return binarySearchDC(A, target, left, mid - 1)
        else
            return binarySearchDC(A, target, mid + 1, right)
        end if
    end if
    return -1
end procedure`,
  useCases: [
    'Search in sorted data',
    'Finding insertion position'
  ],
  initialize: (size) => {
    const array = Array.from({ length: size }, (_, i) => i * 2)
    return {
      array: array.slice(),
      target: array[Math.floor(Math.random() * size)],
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
  const maxValue = arr[arr.length - 1] || 100
  
  arr.forEach((value, index) => {
    const barHeight = (value / maxValue) * (height - 40)
    const x = index * barWidth
    const y = height - barHeight - 20
    
    ctx.fillStyle = '#3b82f6'
    ctx.fillRect(x, y, barWidth - 2, barHeight)
  })
}
