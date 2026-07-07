import { drawTitle, getThemeColors } from '../visualHelpers'

export const ActivitySelection = {
  name: 'Activity Selection',
  description: 'Activity Selection chooses the maximum number of non-overlapping activities by sorting by finish time and greedily accepting the next compatible interval.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)',
  },
  pseudocode: `procedure activitySelection(activities)
    sort activities by finish time
    selected := []
    lastFinish := -infinity
    for each activity in activities do
        if activity.start >= lastFinish then
            selected.append(activity)
            lastFinish := activity.finish
        end if
    end for
    return selected
end procedure`,
  useCases: [
    'Classroom scheduling',
    'Meeting room booking',
    'Task scheduling',
    'Single-resource allocation',
  ],
  initialize: () => {
    const activities = [
      { id: 'A', start: 1, finish: 4 },
      { id: 'B', start: 3, finish: 5 },
      { id: 'C', start: 0, finish: 6 },
      { id: 'D', start: 5, finish: 7 },
      { id: 'E', start: 3, finish: 9 },
      { id: 'F', start: 5, finish: 9 },
      { id: 'G', start: 6, finish: 10 },
      { id: 'H', start: 8, finish: 11 },
      { id: 'I', start: 8, finish: 12 },
      { id: 'J', start: 12, finish: 14 },
    ].sort((a, b) => a.finish - b.finish)
    const steps = buildActivitySteps(activities)
    return { activities, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawTimeline(ctx, state, currentStep, width, height)
  },
}

function buildActivitySteps(activities) {
  const selected = []
  const steps = []
  let lastFinish = -Infinity

  activities.forEach((activity, index) => {
    const accepted = activity.start >= lastFinish
    if (accepted) {
      selected.push(activity.id)
      lastFinish = activity.finish
    }
    steps.push({
      index,
      activity,
      accepted,
      selected: selected.slice(),
      note: accepted ? `Accept ${activity.id}` : `Reject ${activity.id}: overlaps selected interval`,
    })
  })

  return steps
}

function drawTimeline(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || state.steps[0]
  const maxFinish = Math.max(...state.activities.map((activity) => activity.finish))
  const left = 70
  const right = width - 28
  const usable = right - left
  const rowHeight = Math.min(30, (height - 120) / state.activities.length)

  drawTitle(ctx, 'Greedy Earliest-Finish Strategy', step?.note || 'Sort by finish time, then scan once.')

  state.activities.forEach((activity, index) => {
    const y = 92 + index * rowHeight
    const x = left + (activity.start / maxFinish) * usable
    const w = Math.max(18, ((activity.finish - activity.start) / maxFinish) * usable)
    const active = step?.index === index
    const selected = step?.selected.includes(activity.id)

    ctx.fillStyle = selected ? colors.green : active ? colors.amber : colors.blue
    ctx.globalAlpha = selected || active ? 1 : 0.42
    ctx.fillRect(x, y, w, Math.max(16, rowHeight - 8))
    ctx.globalAlpha = 1

    ctx.fillStyle = colors.text
    ctx.font = '12px Arial'
    ctx.textAlign = 'right'
    ctx.fillText(activity.id, left - 14, y + 14)
  })

  ctx.strokeStyle = colors.faint
  ctx.beginPath()
  ctx.moveTo(left, height - 32)
  ctx.lineTo(right, height - 32)
  ctx.stroke()

  ctx.fillStyle = colors.muted
  ctx.font = '12px Arial'
  ctx.textAlign = 'center'
  for (let t = 0; t <= maxFinish; t += 2) {
    const x = left + (t / maxFinish) * usable
    ctx.fillText(String(t), x, height - 12)
  }
}
