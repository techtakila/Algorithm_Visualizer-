// Bubble Sort Implementation
export const BubbleSort = {
  name: 'Bubble Sort',
  description: 'Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
  complexity: {
    time: 'O(n²)',
    space: 'O(1)'
  },
  pseudocode: `procedure bubbleSort(A : list of sortable items)
    n := length(A)
    for i := 0 to n-1 do
        for j := 0 to n-i-2 do
            if A[j] > A[j+1] then
                swap(A[j], A[j+1])
            end if
        end for
    end for
end procedure`,
  useCases: [
    'Educational purposes - easy to understand',
    'Small datasets where simplicity matters more than performance',
    'Nearly sorted data',
    'Memory-constrained environments'
  ],
  initialize: (size) => {
    const array = Array.from({ length: size }, () => Math.random() * 100)
    return {
      array: array.slice(),
      steps: generateBubbleSortSteps(array),
      currentArray: array.slice()
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const { steps, currentArray } = state
    const arr = currentArray.slice()
    
    if (steps[currentStep]) {
      const step = steps[currentStep]
      arr[step.i] = step.val1
      arr[step.j] = step.val2
    }
    
    drawArray(ctx, arr, width, height, steps[currentStep])
  }
}

function generateBubbleSortSteps(array) {
  const steps = []
  const arr = array.slice()
  const n = arr.length
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ type: 'compare', i: j, j: j + 1, val1: arr[j], val2: arr[j + 1] })
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({ type: 'swap', i: j, j: j + 1, val1: arr[j], val2: arr[j + 1] })
      }
    }
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
    
    // Determine color based on state
    let color = '#3b82f6' // blue default
    if (currentStep) {
      if (index === currentStep.i || index === currentStep.j) {
        color = currentStep.type === 'swap' ? '#ef4444' : '#f59e0b' // red for swap, amber for compare
      }
    }
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth - 2, barHeight)
    
    // Draw value text
    ctx.fillStyle = '#000'
    ctx.font = '10px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(Math.round(value), x + barWidth / 2, height - 5)
  })
}
