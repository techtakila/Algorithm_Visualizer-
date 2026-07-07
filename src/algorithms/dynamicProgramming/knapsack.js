// 0/1 Knapsack DP Implementation
export const KnapsackDP = {
  name: '0/1 Knapsack - Dynamic Programming',
  description: 'The 0/1 Knapsack problem is solved using Dynamic Programming. Given weights and values of items, and a capacity, find the maximum value that can be obtained by selecting a subset of items without exceeding the capacity.',
  complexity: {
    time: 'O(n*W)',
    space: 'O(n*W)'
  },
  pseudocode: `procedure knapsack(weights, values, capacity)
    n := length(weights)
    dp[0..n][0..capacity] := 0
    for i := 1 to n do
        for w := 1 to capacity do
            if weights[i-1] <= w then
                dp[i][w] := max(dp[i-1][w],
                                values[i-1] + dp[i-1][w-weights[i-1]])
            else
                dp[i][w] := dp[i-1][w]
            end if
        end for
    end for
    return dp[n][capacity]
end procedure`,
  useCases: [
    'Resource allocation problems',
    'Cargo loading optimization',
    'Portfolio optimization',
    'Cutting stock problems'
  ],
  initialize: (size) => {
    return {
      items: [],
      capacity: 50,
      steps: [],
      currentArray: []
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText('0/1 Knapsack Problem', 10, 30)
  }
}
