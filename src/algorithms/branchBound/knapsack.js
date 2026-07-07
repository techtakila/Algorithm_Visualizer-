// 0/1 Knapsack - Branch & Bound
export const KnapsackBB = {
  name: '0/1 Knapsack (Branch & Bound)',
  description: 'Solves the knapsack problem using Branch and Bound. It explores the solution space by branching on whether to include or exclude items, pruning branches that exceed capacity.',
  complexity: {
    time: 'O(2^n) worst, better with pruning',
    space: 'O(n)'
  },
  pseudocode: `procedure knapsackBranchBound(items, capacity)
    maxProfit := 0
    queue := createQueue()
    queue.enqueue(root)
    while not queue.isEmpty() do
        node := queue.dequeue()
        if promising(node) then
            if isLeaf(node) then
                maxProfit := max(maxProfit, node.profit)
            else
                queue.enqueue(node.left)
                queue.enqueue(node.right)
            end if
        end if
    end while
    return maxProfit
end procedure`,
  useCases: [
    'Resource allocation',
    'Portfolio optimization',
    'Project selection',
    'Manufacturing problems'
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
    ctx.fillText('Knapsack - Branch & Bound', 10, 30)
  }
}
