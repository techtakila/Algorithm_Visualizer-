import { drawTitle, getThemeColors } from '../visualHelpers'

export const BruteForceStringMatch = {
  name: 'Brute Force String Matching',
  description: 'Brute force string matching checks every possible alignment of a pattern against a text. It is simple, transparent, and useful as a baseline before studying KMP, Boyer-Moore, or Rabin-Karp.',
  complexity: {
    time: 'O(n*m)',
    space: 'O(1)',
  },
  pseudocode: `procedure bruteForceMatch(text, pattern)
    for i := 0 to length(text) - length(pattern) do
        j := 0
        while j < length(pattern) and text[i+j] == pattern[j] do
            j := j + 1
        end while
        if j == length(pattern) then
            return i
        end if
    end for
    return -1
end procedure`,
  useCases: [
    'Small text search',
    'Teaching pattern matching',
    'Baseline comparison for advanced string algorithms',
    'Cases where implementation simplicity matters',
  ],
  initialize: () => {
    const text = 'ALGORITHMVISUALIZER'
    const pattern = 'VIS'
    const steps = generateSteps(text, pattern)
    return { text, pattern, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawStringMatch(ctx, state, currentStep, width, height)
  },
}

function generateSteps(text, pattern) {
  const steps = []
  for (let i = 0; i <= text.length - pattern.length; i += 1) {
    let matched = 0
    for (let j = 0; j < pattern.length; j += 1) {
      const equal = text[i + j] === pattern[j]
      steps.push({ shift: i, patternIndex: j, textIndex: i + j, equal, matched })
      if (!equal) break
      matched += 1
    }
    if (matched === pattern.length) {
      steps.push({ shift: i, found: true, matched })
      break
    }
  }
  return steps
}

function drawStringMatch(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || state.steps[0]
  const cell = Math.min(38, (width - 64) / state.text.length)
  const startX = (width - cell * state.text.length) / 2
  const textY = height / 2 - 42
  const patternY = textY + 72

  drawTitle(
    ctx,
    'Naive Pattern Scan',
    step?.found ? `Pattern found at index ${step.shift}` : `Trying alignment at index ${step?.shift ?? 0}`,
  )

  state.text.split('').forEach((letter, index) => {
    const active = step && index === step.textIndex
    const matched = step?.found && index >= step.shift && index < step.shift + state.pattern.length
    ctx.fillStyle = matched ? '#dcfce7' : active ? '#fef3c7' : colors.panel
    if (colors.dark) ctx.fillStyle = matched ? '#064e3b' : active ? '#78350f' : '#111827'
    ctx.strokeStyle = active ? colors.amber : colors.faint
    ctx.strokeRect(startX + index * cell, textY, cell, cell)
    ctx.fillRect(startX + index * cell, textY, cell, cell)
    ctx.strokeRect(startX + index * cell, textY, cell, cell)
    ctx.fillStyle = colors.text
    ctx.font = '700 15px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(letter, startX + index * cell + cell / 2, textY + cell / 2)
  })

  state.pattern.split('').forEach((letter, index) => {
    const x = startX + (step?.shift ?? 0) * cell + index * cell
    const active = step && index === step.patternIndex
    ctx.fillStyle = active ? colors.amber : colors.blue
    if (step?.found) ctx.fillStyle = colors.green
    ctx.fillRect(x, patternY, cell, cell)
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 15px Arial'
    ctx.fillText(letter, x + cell / 2, patternY + cell / 2)
  })

  ctx.textBaseline = 'alphabetic'
  ctx.fillStyle = colors.muted
  ctx.font = '13px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`Pattern: ${state.pattern}`, width / 2, patternY + 72)
}
