// Insertion Sort Implementation
export const InsertionSort = {
  name: 'Insertion Sort',
  description: 'Insertion Sort builds the sorted array one item at a time. It iterates through an input array and removes one element per iteration, finds the element\'s place in the sorted part, and inserts it. It is simple and efficient for small datasets and nearly sorted data.',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)'
  },
  pseudocode: `procedure insertionSort(A : list of sortable items)
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
    'Online sorting (sorting as data arrives)',
    'Memory-efficient sorting'
  ],
  initialize: (size) => {
    const array = Array.from({ length: size }, () => Math.random() * 100)
    return {
      array: array.slice(),
      steps: generateInsertionSortSteps(array),
      currentArray: array.slice()
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const { steps, currentArray } = state
    drawArray(ctx, currentArray, width, height, steps[currentStep])
  }
}

function generateInsertionSortSteps(array) {
  const steps = []
  const arr = array.slice()
  
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      steps.push({ type: 'move', from: j, to: j + 1 })
      j--
    }
    arr[j + 1] = key
    steps.push({ type: 'insert', index: j + 1 })
  }
  return steps
}

function drawArray(ctx, arr, width, height, currentStep) {
  const barWidth = width / arr.length
  const maxValue = 100
  
  arr.forEach((value, index) => {
    const barHeight = (value / maxValue) * (height - 40)
    const x = index * barWidth
    const y = height - barHeight - 20
    
    let color = '#3b82f6'
    if (currentStep) {
      if (currentStep.type === 'insert' && index === currentStep.index) {
        color = '#10b981'
      }
    }
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth - 2, barHeight)
  })
}
