// Merge Sort Implementation
export const MergeSort = {
  name: 'Merge Sort',
  description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves back together. It is stable and has guaranteed O(n log n) time complexity.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)'
  },
  pseudocode: `procedure mergeSort(A : list of sortable items)
    if length(A) > 1 then
        mid := length(A) / 2
        left := A[0...mid-1]
        right := A[mid...length(A)-1]
        mergeSort(left)
        mergeSort(right)
        merge(A, left, right)
    end if
end procedure`,
  useCases: [
    'Large datasets where O(n log n) performance is critical',
    'When stable sorting is required',
    'External sorting with limited memory',
    'Linked list sorting (no random access needed)'
  ],
  initialize: (size) => {
    const array = Array.from({ length: size }, () => Math.random() * 100)
    return {
      array: array.slice(),
      steps: generateMergeSortSteps(array),
      currentArray: array.slice()
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const { steps, currentArray } = state
    const arr = currentArray.slice()
    
    if (steps[currentStep]) {
      const step = steps[currentStep]
      step.indices.forEach((idx, i) => {
        arr[idx] = step.values[i]
      })
    }
    
    drawArray(ctx, arr, width, height, steps[currentStep])
  }
}

function generateMergeSortSteps(array) {
  const steps = []
  const arr = array.slice()
  
  function mergeSort(left, right) {
    if (left >= right) return
    const mid = Math.floor((left + right) / 2)
    mergeSort(left, mid)
    mergeSort(mid + 1, right)
    merge(left, mid, right)
  }
  
  function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1)
    const rightArr = arr.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++]
      } else {
        arr[k++] = rightArr[j++]
      }
      steps.push({ type: 'merge', indices: Array.from({ length: right - left + 1 }, (_, i) => left + i), values: arr.slice(left, right + 1) })
    }
    
    while (i < leftArr.length) {
      arr[k++] = leftArr[i++]
      steps.push({ type: 'merge', indices: Array.from({ length: right - left + 1 }, (_, i) => left + i), values: arr.slice(left, right + 1) })
    }
    
    while (j < rightArr.length) {
      arr[k++] = rightArr[j++]
      steps.push({ type: 'merge', indices: Array.from({ length: right - left + 1 }, (_, i) => left + i), values: arr.slice(left, right + 1) })
    }
  }
  
  mergeSort(0, arr.length - 1)
  return steps
}

function drawArray(ctx, arr, width, height, currentStep) {
  const barWidth = width / arr.length
  const maxValue = 100
  
  arr.forEach((value, index) => {
    const barHeight = (value / maxValue) * (height - 40)
    const x = index * barWidth
    const y = height - barHeight - 20
    
    let color = '#10b981' // green
    if (currentStep && currentStep.indices?.includes(index)) {
      color = '#f59e0b' // amber
    }
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth - 2, barHeight)
  })
}
