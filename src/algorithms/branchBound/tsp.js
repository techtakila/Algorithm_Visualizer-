import { drawTitle, getThemeColors } from '../visualHelpers'

export const TSPBranchBound = {
  name: 'Traveling Salesman Problem (Branch and Bound)',
  description: 'This TSP visualizer grows partial tours and prunes routes whose current cost already exceeds the best complete tour found so far.',
  complexity: {
    time: 'O(n^2*2^n)',
    space: 'O(n^2)',
  },
  pseudocode: `procedure tspBranchBound(graph)
    best := infinity
    search(path, cost)
        if cost >= best then prune
        if path visits every city then
            best := min(best, cost + returnCost)
        for each unvisited city do
            search(path + city, cost + edgeCost)
    return best
end procedure`,
  useCases: [
    'Route optimization',
    'Delivery planning',
    'Circuit board drilling',
    'Exact combinatorial optimization',
  ],
  initialize: () => {
    const cities = [
      { name: 'A', x: 0.5, y: 0.18 },
      { name: 'B', x: 0.78, y: 0.35 },
      { name: 'C', x: 0.66, y: 0.72 },
      { name: 'D', x: 0.28, y: 0.74 },
      { name: 'E', x: 0.2, y: 0.36 },
    ]
    const distances = buildDistances(cities)
    const steps = []
    search([0], 0, new Set([0]), distances, steps, { cost: Infinity, path: [] })
    return { cities, distances, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawTsp(ctx, state, currentStep, width, height)
  },
}

function buildDistances(cities) {
  return cities.map((a) => cities.map((b) => Math.round(Math.hypot(a.x - b.x, a.y - b.y) * 100)))
}

function search(path, cost, visited, distances, steps, best) {
  const last = path[path.length - 1]
  if (cost >= best.cost) {
    steps.push({ path: path.slice(), cost, best: { ...best }, pruned: true, note: 'Prune route: cost already exceeds best' })
    return
  }

  steps.push({ path: path.slice(), cost, best: { ...best }, pruned: false, note: 'Expand partial tour' })

  if (path.length === distances.length) {
    const total = cost + distances[last][0]
    if (total < best.cost) {
      best.cost = total
      best.path = [...path, 0]
    }
    steps.push({ path: [...path, 0], cost: total, best: { ...best }, pruned: false, note: 'Complete tour' })
    return
  }

  for (let next = 1; next < distances.length; next += 1) {
    if (!visited.has(next) && steps.length < 80) {
      visited.add(next)
      path.push(next)
      search(path, cost + distances[last][next], visited, distances, steps, best)
      path.pop()
      visited.delete(next)
    }
  }
}

function drawTsp(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || state.steps[0]
  drawTitle(ctx, 'Route Search with Pruning', `${step.note}. Current cost ${step.cost}, best ${step.best.cost === Infinity ? 'none' : step.best.cost}`)

  const plot = state.cities.map((city) => ({
    ...city,
    px: 70 + city.x * (width - 140),
    py: 98 + city.y * (height - 170),
  }))

  drawPath(ctx, plot, step.best.path, colors.green, 4)
  drawPath(ctx, plot, step.path, step.pruned ? colors.red : colors.amber, 3)

  plot.forEach((city, index) => {
    ctx.beginPath()
    ctx.arc(city.px, city.py, 18, 0, Math.PI * 2)
    ctx.fillStyle = step.path.includes(index) ? colors.blue : colors.panel
    ctx.fill()
    ctx.strokeStyle = colors.text
    ctx.stroke()
    ctx.fillStyle = step.path.includes(index) ? '#ffffff' : colors.text
    ctx.font = '700 13px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(city.name, city.px, city.py)
  })

  ctx.textBaseline = 'alphabetic'
}

function drawPath(ctx, cities, path, color, width) {
  if (!path?.length) return
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.beginPath()
  path.forEach((cityIndex, index) => {
    const city = cities[cityIndex]
    if (index === 0) ctx.moveTo(city.px, city.py)
    else ctx.lineTo(city.px, city.py)
  })
  ctx.stroke()
  ctx.lineWidth = 1
}
