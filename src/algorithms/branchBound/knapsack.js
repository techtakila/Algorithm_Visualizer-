import { drawTitle, getThemeColors } from '../visualHelpers'

export const KnapsackBB = {
  name: '0/1 Knapsack (Branch and Bound)',
  description: 'Branch and Bound explores include/exclude decisions while using an optimistic value bound to skip branches that cannot beat the current best solution.',
  complexity: {
    time: 'O(2^n) worst, often less with pruning',
    space: 'O(2^n)',
  },
  pseudocode: `procedure knapsackBranchBound(items, capacity)
    best := 0
    queue := [root]
    while queue is not empty do
        node := queue.pop()
        if bound(node) <= best then continue
        branch by including and excluding next item
        update best for valid nodes
    end while
    return best
end procedure`,
  useCases: [
    'Exact optimization with pruning',
    'Resource allocation',
    'Portfolio selection',
    'Operations research demos',
  ],
  initialize: () => {
    const items = [
      { name: 'A', weight: 2, value: 40 },
      { name: 'B', weight: 3, value: 50 },
      { name: 'C', weight: 5, value: 100 },
      { name: 'D', weight: 4, value: 60 },
    ].sort((a, b) => b.value / b.weight - a.value / a.weight)
    const capacity = 8
    const steps = buildSteps(items, capacity)
    return { items, capacity, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawBranchBound(ctx, state, currentStep, width, height)
  },
}

function bound(node, items, capacity) {
  if (node.weight >= capacity) return node.value
  let result = node.value
  let totalWeight = node.weight
  let index = node.level + 1

  while (index < items.length && totalWeight + items[index].weight <= capacity) {
    totalWeight += items[index].weight
    result += items[index].value
    index += 1
  }
  if (index < items.length) {
    result += (capacity - totalWeight) * (items[index].value / items[index].weight)
  }
  return Math.round(result)
}

function buildSteps(items, capacity) {
  const root = { id: 'root', level: -1, value: 0, weight: 0, taken: [], bound: 0 }
  root.bound = bound(root, items, capacity)
  const queue = [root]
  const steps = []
  let best = 0
  let id = 1

  while (queue.length && steps.length < 32) {
    const node = queue.shift()
    const pruned = node.bound <= best || node.weight > capacity
    if (!pruned && node.weight <= capacity && node.value > best) best = node.value
    steps.push({ node, queue: queue.slice(), best, pruned, note: pruned ? 'Prune: bound cannot improve best' : 'Branch from this node' })
    if (pruned || node.level === items.length - 1) continue

    const next = node.level + 1
    const include = {
      id: `N${id++}`,
      level: next,
      value: node.value + items[next].value,
      weight: node.weight + items[next].weight,
      taken: [...node.taken, items[next].name],
    }
    include.bound = bound(include, items, capacity)
    const exclude = {
      id: `N${id++}`,
      level: next,
      value: node.value,
      weight: node.weight,
      taken: node.taken.slice(),
    }
    exclude.bound = bound(exclude, items, capacity)
    queue.push(include, exclude)
  }
  return steps
}

function drawBranchBound(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || state.steps[0]
  drawTitle(ctx, 'Branch and Bound Queue', `${step.note}. Best value: ${step.best}`)

  const node = step.node
  const centerX = width / 2
  ctx.fillStyle = step.pruned ? '#fee2e2' : '#dcfce7'
  if (colors.dark) ctx.fillStyle = step.pruned ? '#7f1d1d' : '#064e3b'
  ctx.strokeStyle = step.pruned ? colors.red : colors.green
  ctx.fillRect(centerX - 120, 98, 240, 118)
  ctx.strokeRect(centerX - 120, 98, 240, 118)

  ctx.fillStyle = colors.text
  ctx.font = '700 15px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`Current ${node.id}`, centerX, 128)
  ctx.font = '13px Arial'
  ctx.fillText(`weight ${node.weight}/${state.capacity} | value ${node.value} | bound ${node.bound}`, centerX, 158)
  ctx.fillText(`taken: ${node.taken.join(', ') || 'none'}`, centerX, 186)

  ctx.fillStyle = colors.muted
  ctx.textAlign = 'left'
  ctx.fillText('Items sorted by value density:', 28, height - 100)
  state.items.forEach((item, index) => {
    ctx.fillText(`${item.name} w${item.weight} v${item.value}`, 32 + index * 112, height - 70)
  })

  ctx.textAlign = 'center'
  ctx.fillText(`Queue size: ${step.queue.length}`, width / 2, height - 34)
}
