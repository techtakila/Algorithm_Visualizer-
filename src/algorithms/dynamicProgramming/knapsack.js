import { cloneMatrix, drawGrid, drawTitle } from '../visualHelpers'

export const KnapsackDP = {
  name: '0/1 Knapsack - Dynamic Programming',
  description: 'Dynamic programming solves 0/1 Knapsack by building a table where each row adds one item and each column represents a capacity. Every cell reuses previous answers instead of recomputing subsets.',
  complexity: {
    time: 'O(n*W)',
    space: 'O(n*W)',
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
    'Budgeted selection problems',
  ],
  initialize: () => {
    const items = [
      { name: 'A', weight: 1, value: 6 },
      { name: 'B', weight: 2, value: 10 },
      { name: 'C', weight: 3, value: 12 },
      { name: 'D', weight: 5, value: 18 },
    ]
    const capacity = 8
    const { table, steps } = buildKnapsackTable(items, capacity)
    return { items, capacity, table, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    const table = step?.table || state.table
    drawTitle(ctx, 'DP Table: Items vs Capacity', step?.note || `Best value: ${state.table[state.items.length][state.capacity]}`)
    drawGrid(ctx, table.length, table[0].length, width, height, {
      values: table,
      activeCell: step ? [step.itemIndex, step.capacityIndex] : null,
      labelRows: ['0', ...state.items.map((item) => item.name)],
      labelCols: Array.from({ length: state.capacity + 1 }, (_, i) => String(i)),
      maxCell: 46,
    })
  },
}

function buildKnapsackTable(items, capacity) {
  const table = Array.from({ length: items.length + 1 }, () => Array(capacity + 1).fill(0))
  const steps = []

  for (let i = 1; i <= items.length; i += 1) {
    const item = items[i - 1]
    for (let w = 1; w <= capacity; w += 1) {
      if (item.weight <= w) {
        table[i][w] = Math.max(table[i - 1][w], item.value + table[i - 1][w - item.weight])
      } else {
        table[i][w] = table[i - 1][w]
      }
      steps.push({
        itemIndex: i,
        capacityIndex: w,
        table: cloneMatrix(table),
        note: `${item.name}: capacity ${w}, best value ${table[i][w]}`,
      })
    }
  }

  return { table, steps }
}
