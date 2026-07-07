// Binary Search Implementation
export const BinarySearch = {
  name: 'Binary Search',
  description: 'Binary Search is an efficient algorithm for finding a target value in a sorted array. It works by repeatedly dividing the search interval in half. If the target value matches the middle element, the position is returned. If not, the half where the target cannot lie is eliminated.',
  complexity: {
    time: 'O(log n)',
    space: 'O(1)'
  },
  pseudocode: `procedure binarySearch(A : sorted list, target)
    left := 0
    right := length(A) - 1
    while left <= right do
        mid := (left + right) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            left := mid + 1
        else
            right := mid - 1
        end if
    end while
    return -1
end procedure`,
  useCases: [
    'Searching in sorted lists',
    'Large datasets',
    'Database indexing',
    'Finding insertion positions'
  ],
  initialize: (size) => {
    const array = Array.from({ length: size }, (_, i) => i * 2 + Math.random() * 0.5)
    const target = array[Math.floor(Math.random() * size)]
    return {
      array: array.slice(),
      target,
      steps: generateBinarySearchSteps(array, target),
      currentArray: array.slice()
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawArray(ctx, state.currentArray, width, height, state.target, state.steps[currentStep])
  }
}

function generateBinarySearchSteps(array, target) {
  const steps = []
  let left = 0, right = array.length - 1
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    steps.push({ type: 'check', left, mid, right })
    
    if (array[mid] === target) {
      steps.push({ type: 'found', index: mid })
      break
    } else if (array[mid] < target) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return steps
}

function drawArray(ctx, arr, width, height, target, currentStep) {
  const barWidth = width / arr.length
  const maxValue = arr[arr.length - 1] || 100
  
  arr.forEach((value, index) => {
    const barHeight = (value / maxValue) * (height - 40)
    const x = index * barWidth
    const y = height - barHeight - 20
    
    let color = '#3b82f6'
    if (currentStep) {
      if (index === currentStep.mid) {
        color = '#f59e0b'
      } else if (currentStep.type === 'found' && index === currentStep.index) {
        color = '#10b981'
      } else if (index < currentStep.left || index > currentStep.right) {
        color = '#d1d5db'
      }
    }
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth - 2, barHeight)
  })
}
