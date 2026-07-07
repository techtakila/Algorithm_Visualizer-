// Linear Search Implementation
export const LinearSearch = {
  name: 'Linear Search',
  description: 'Linear Search is the simplest search algorithm. It checks every element in the list one by one until the target element is found or the end of the list is reached. It works on both sorted and unsorted lists.',
  complexity: {
    time: 'O(n)',
    space: 'O(1)'
  },
  pseudocode: `procedure linearSearch(A : list, target)
    for i := 0 to length(A) - 1 do
        if A[i] == target then
            return i
        end if
    end for
    return -1
end procedure`,
  useCases: [
    'Searching in unsorted lists',
    'Small datasets',
    'Linked lists (no random access)',
    'When simplicity is more important than speed'
  ],
  initialize: (size) => {
    const array = Array.from({ length: size }, () => Math.random() * 100)
    const target = array[Math.floor(Math.random() * size)]
    return {
      array: array.slice(),
      target,
      steps: generateLinearSearchSteps(array, target),
      currentArray: array.slice()
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawArray(ctx, state.currentArray, width, height, state.target, state.steps[currentStep])
  }
}

function generateLinearSearchSteps(array, target) {
  const steps = []
  for (let i = 0; i < array.length; i++) {
    steps.push({ type: 'check', index: i, found: array[i] === target })
    if (array[i] === target) break
  }
  return steps
}

function drawArray(ctx, arr, width, height, target, currentStep) {
  const barWidth = width / arr.length
  const maxValue = 100
  
  arr.forEach((value, index) => {
    const barHeight = (value / maxValue) * (height - 40)
    const x = index * barWidth
    const y = height - barHeight - 20
    
    let color = '#3b82f6'
    if (currentStep && currentStep.index === index) {
      color = currentStep.found ? '#10b981' : '#f59e0b'
    }
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth - 2, barHeight)
  })
}
