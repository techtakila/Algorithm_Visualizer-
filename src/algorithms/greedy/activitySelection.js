// Activity Selection - Greedy Algorithm
export const ActivitySelection = {
  name: 'Activity Selection',
  description: 'The Activity Selection problem is a classic greedy algorithm problem. Given a set of activities with start and end times, select the maximum number of activities that can be performed without overlapping.',
  complexity: {
    time: 'O(n log n)',
    space: 'O(n)'
  },
  pseudocode: `procedure activitySelection(activities)
    sort activities by end time
    selected := [activities[0]]
    lastEnd := activities[0].end
    for i := 1 to length(activities) - 1 do
        if activities[i].start >= lastEnd then
            selected.append(activities[i])
            lastEnd := activities[i].end
        end if
    end for
    return selected
end procedure`,
  useCases: [
    'Classroom scheduling',
    'Meeting room booking',
    'Task scheduling',
    'Resource allocation'
  ],
  initialize: (size) => {
    return {
      activities: [],
      steps: [],
      currentArray: []
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText('Activity Selection Problem', 10, 30)
  }
}
