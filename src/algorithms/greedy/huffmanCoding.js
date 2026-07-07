import { drawTitle, getThemeColors } from '../visualHelpers'

export const HuffmanCoding = {
  name: 'Huffman Coding',
  description: 'Huffman Coding repeatedly merges the two lowest-frequency nodes to build an optimal prefix-free code. Frequent symbols end up closer to the root and get shorter bit patterns.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
  },
  pseudocode: `procedure huffmanCoding(frequencies)
    queue := createMinHeap(frequencies)
    while length(queue) > 1 do
        left := extractMin(queue)
        right := extractMin(queue)
        parent := node(left.freq + right.freq)
        insert(queue, parent)
    end while
    return queue[0]
end procedure`,
  useCases: [
    'Lossless data compression',
    'Text encoding',
    'Compression education',
    'Prefix-code generation',
  ],
  initialize: () => {
    const leaves = [
      { label: 'A', freq: 45 },
      { label: 'B', freq: 13 },
      { label: 'C', freq: 12 },
      { label: 'D', freq: 16 },
      { label: 'E', freq: 9 },
      { label: 'F', freq: 5 },
    ]
    const steps = buildHuffmanSteps(leaves)
    return { leaves, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawHuffman(ctx, state, currentStep, width, height)
  },
}

function buildHuffmanSteps(leaves) {
  let queue = leaves.map((leaf) => ({ ...leaf, id: leaf.label }))
  const merged = []
  const steps = []
  let count = 1

  while (queue.length > 1) {
    queue = queue.sort((a, b) => a.freq - b.freq)
    const left = queue.shift()
    const right = queue.shift()
    const parent = {
      label: `N${count}`,
      id: `N${count}`,
      freq: left.freq + right.freq,
      left,
      right,
    }
    count += 1
    merged.push(parent)
    queue.push(parent)
    steps.push({
      left,
      right,
      parent,
      queue: queue.slice().sort((a, b) => a.freq - b.freq),
      merged: merged.slice(),
      note: `Merge ${left.label}:${left.freq} and ${right.label}:${right.freq}`,
    })
  }

  return steps
}

function drawHuffman(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || state.steps[0]
  drawTitle(ctx, 'Greedy Min-Frequency Merges', step?.note || 'Pick the two smallest nodes.')

  drawNodeRow(ctx, step.queue, width, 94, 'Priority queue after merge', colors, step.parent?.id)
  drawNodeRow(ctx, step.merged, width, height - 120, 'Merged internal nodes', colors, step.parent?.id)

  if (step.left && step.right) {
    ctx.fillStyle = colors.muted
    ctx.font = '13px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(`Active pair: ${step.left.label} + ${step.right.label} -> ${step.parent.label}`, width / 2, height / 2)
  }
}

function drawNodeRow(ctx, nodes, width, y, label, colors, activeId) {
  ctx.fillStyle = colors.muted
  ctx.font = '12px Arial'
  ctx.textAlign = 'left'
  ctx.fillText(label, 28, y - 18)

  if (!nodes.length) return

  const spacing = Math.min(88, (width - 56) / nodes.length)
  const startX = (width - spacing * (nodes.length - 1)) / 2

  nodes.forEach((node, index) => {
    const x = startX + index * spacing
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2)
    ctx.fillStyle = node.id === activeId ? colors.green : colors.blue
    ctx.fill()
    ctx.strokeStyle = colors.panel
    ctx.stroke()

    ctx.fillStyle = '#ffffff'
    ctx.font = '700 12px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(node.label, x, y - 3)
    ctx.font = '11px Arial'
    ctx.fillText(node.freq, x, y + 12)
  })
}
