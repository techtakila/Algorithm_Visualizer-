import { drawTitle, getThemeColors } from '../visualHelpers'

export const BruteForceKnapsack = {
  name: 'Brute Force Knapsack Subsets',
  description: 'The brute-force knapsack strategy evaluates every possible subset of items and keeps the best valid combination. It is exponential, but it clearly shows the full search space that optimized methods try to avoid.',
  complexity: {
    time: 'O(2^n)',
    space: 'O(n)',
  },
  pseudocode: `procedure bruteForceKnapsack(items, capacity)
    bestValue := 0
    bestSubset := []
    for each subset of items do
        if weight(subset) <= capacity and value(subset) > bestValue then
            bestValue := value(subset)
            bestSubset := subset
        end if
    end for
    return bestSubset
end procedure`,
  useCases: [
    'Small optimization problems',
    'Validating dynamic programming solutions',
    'Teaching exhaustive search',
    'Finding exact answers when n is tiny',
  ],
  initialize: () => {
    const items = [
      { name: 'A', weight: 2, value: 12 },
      { name: 'B', weight: 3, value: 18 },
      { name: 'C', weight: 4, value: 24 },
      { name: 'D', weight: 5, value: 30 },
      { name: 'E', weight: 7, value: 42 },
    ]
    const capacity = 10
    const steps = generateSubsetSteps(items, capacity)
    return { items, capacity, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawSubsetSearch(ctx, state, currentStep, width, height)
  },
}

function generateSubsetSteps(items, capacity) {
  const steps = []
  let bestValue = 0
  let bestMask = 0
  const total = 2 ** items.length

  for (let mask = 0; mask < total; mask += 1) {
    const subset = items.filter((_, index) => mask & (1 << index))
    const weight = subset.reduce((sum, item) => sum + item.weight, 0)
    const value = subset.reduce((sum, item) => sum + item.value, 0)
    const valid = weight <= capacity
    if (valid && value > bestValue) {
      bestValue = value
      bestMask = mask
    }
    steps.push({ mask, weight, value, valid, bestMask, bestValue })
  }

  return steps
}

function drawSubsetSearch(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || state.steps[0]
  const cardWidth = Math.min(118, (width - 64) / state.items.length)
  const startX = (width - cardWidth * state.items.length) / 2
  const y = 118

  drawTitle(
    ctx,
    'Exhaustive Subset Search',
    `Capacity ${state.capacity}. Current value ${step.value}, best value ${step.bestValue}.`,
  )

  state.items.forEach((item, index) => {
    const selected = Boolean(step.mask & (1 << index))
    const best = Boolean(step.bestMask & (1 << index))
    const x = startX + index * cardWidth
    ctx.fillStyle = selected ? (step.valid ? '#dcfce7' : '#fee2e2') : colors.panel
    if (colors.dark) ctx.fillStyle = selected ? (step.valid ? '#064e3b' : '#7f1d1d') : '#111827'
    ctx.strokeStyle = best ? colors.green : selected ? colors.amber : colors.faint
    ctx.lineWidth = best ? 3 : 1
    ctx.fillRect(x + 6, y, cardWidth - 12, 118)
    ctx.strokeRect(x + 6, y, cardWidth - 12, 118)

    ctx.fillStyle = colors.text
    ctx.font = '700 20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(item.name, x + cardWidth / 2, y + 34)
    ctx.font = '12px Arial'
    ctx.fillText(`w ${item.weight}`, x + cardWidth / 2, y + 66)
    ctx.fillText(`v ${item.value}`, x + cardWidth / 2, y + 88)
  })

  ctx.lineWidth = 1
  ctx.fillStyle = step.valid ? colors.green : colors.red
  ctx.font = '700 15px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(
    step.valid ? 'Valid subset' : 'Over capacity',
    width / 2,
    height - 86,
  )
  ctx.fillStyle = colors.muted
  ctx.font = '13px Arial'
  ctx.fillText(`Subset mask ${step.mask.toString(2).padStart(state.items.length, '0')}`, width / 2, height - 56)
}
