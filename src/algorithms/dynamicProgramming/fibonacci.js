// Fibonacci DP Implementation
export const FibonacciDP = {
  name: 'Fibonacci - Dynamic Programming',
  description: 'Fibonacci sequence using Dynamic Programming optimizes the recursive approach by storing previously computed values, avoiding redundant calculations. This results in O(n) time complexity instead of exponential.',
  complexity: {
    time: 'O(n)',
    space: 'O(n)'
  },
  pseudocode: `procedure fibonacci(n)
    if n <= 1 then
        return n
    end if
    dp[0] := 0
    dp[1] := 1
    for i := 2 to n do
        dp[i] := dp[i-1] + dp[i-2]
    end for
    return dp[n]
end procedure`,
  useCases: [
    'Computing Fibonacci numbers efficiently',
    'Optimization problems with overlapping subproblems',
    'Financial calculations',
    'Game theory and decision making'
  ],
  initialize: (size) => {
    const n = Math.min(size, 30)
    const fib = [0, 1]
    for (let i = 2; i <= n; i++) {
      fib.push(fib[i-1] + fib[i-2])
    }
    return {
      fib,
      steps: fib.map((val, idx) => ({ index: idx, value: val })),
      currentArray: fib.slice()
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawFibonacci(ctx, state.currentArray, width, height, currentStep)
  }
}

function drawFibonacci(ctx, fib, width, height, currentStep) {
  const barWidth = width / fib.length
  const maxValue = Math.max(...fib)
  
  fib.forEach((value, index) => {
    const barHeight = (value / maxValue) * (height - 40)
    const x = index * barWidth
    const y = height - barHeight - 20
    
    const color = index <= currentStep ? '#10b981' : '#3b82f6'
    
    ctx.fillStyle = color
    ctx.fillRect(x, y, barWidth - 2, barHeight)
    
    ctx.fillStyle = '#000'
    ctx.font = '10px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(value, x + barWidth / 2, height - 5)
  })
}
