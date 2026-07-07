// Traveling Salesman Problem - Branch & Bound
export const TSPBranchBound = {
  name: 'Traveling Salesman Problem (Branch & Bound)',
  description: 'TSP using Branch and Bound algorithm finds the shortest route that visits each city exactly once and returns to the starting city. It uses pruning to eliminate suboptimal paths.',
  complexity: {
    time: 'O(n²*2^n)',
    space: 'O(n²)'
  },
  pseudocode: `procedure tspBranchBound(graph, n)
    minCost := infinity
    currentPath := [0]
    visited[0] := true
    dfs(0, 0, 1, visited, graph, currentPath, minCost)
    return minCost
end procedure`,
  useCases: [
    'Route optimization',
    'Delivery route planning',
    'Circuit board drilling',
    'Job sequencing'
  ],
  initialize: (size) => {
    return {
      cities: [],
      graph: [],
      steps: [],
      currentArray: []
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText('TSP - Branch & Bound', 10, 30)
  }
}
