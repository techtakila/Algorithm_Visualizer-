import { cloneMatrix, drawTitle, getThemeColors } from '../visualHelpers'

export const MazeSolver = {
  name: 'Maze Solver',
  description: 'A maze solver uses backtracking to explore open cells, mark visited paths, and unwind whenever a branch reaches a wall or dead end.',
  complexity: {
    time: 'O(4^(m*n))',
    space: 'O(m*n)',
  },
  pseudocode: `procedure solveMaze(maze, x, y, destination)
    if (x, y) == destination then
        return true
    end if
    if outside maze or wall or visited then
        return false
    end if
    visited[x][y] := true
    for each direction do
        if solveMaze(next cell) then
            mark path
            return true
        end if
    end for
    unmark cell
    return false
end procedure`,
  useCases: [
    'Maze solving',
    'Robot navigation basics',
    'Game path search',
    'Teaching recursive exploration',
  ],
  initialize: () => {
    const maze = [
      [0, 0, 1, 0, 0, 0, 0],
      [1, 0, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 1, 0],
    ]
    const marks = maze.map((row) => row.map(() => 0))
    const steps = []
    solveMaze(maze, marks, 0, 0, steps)
    return { maze, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawMaze(ctx, state, currentStep, width, height)
  },
}

function solveMaze(maze, marks, row, col, steps) {
  const n = maze.length
  if (row < 0 || col < 0 || row >= n || col >= n || maze[row][col] === 1 || marks[row][col] === 1) {
    return false
  }

  marks[row][col] = 1
  steps.push({ marks: cloneMatrix(marks), row, col, status: 'Explore cell' })
  if (row === n - 1 && col === n - 1) {
    steps.push({ marks: cloneMatrix(marks), row, col, status: 'Exit reached' })
    return true
  }

  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  for (const [dr, dc] of directions) {
    if (solveMaze(maze, marks, row + dr, col + dc, steps)) return true
  }

  marks[row][col] = 2
  steps.push({ marks: cloneMatrix(marks), row, col, status: 'Dead end, backtrack' })
  return false
}

function drawMaze(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || { marks: state.maze.map((row) => row.map(() => 0)) }
  const n = state.maze.length
  const size = Math.min(width - 86, height - 120)
  const cell = size / n
  const startX = (width - size) / 2
  const startY = 88

  drawTitle(ctx, 'Backtracking Maze Search', step.status || 'Explore until the exit is found.')

  for (let r = 0; r < n; r += 1) {
    for (let c = 0; c < n; c += 1) {
      const x = startX + c * cell
      const y = startY + r * cell
      const mark = step.marks[r][c]
      let fill = state.maze[r][c] === 1 ? (colors.dark ? '#020617' : '#1e293b') : colors.panel
      if (mark === 1) fill = '#bfdbfe'
      if (mark === 2) fill = '#fee2e2'
      if (colors.dark && mark === 1) fill = '#1d4ed8'
      if (colors.dark && mark === 2) fill = '#7f1d1d'
      if (r === n - 1 && c === n - 1) fill = '#dcfce7'
      if (colors.dark && r === n - 1 && c === n - 1) fill = '#064e3b'

      ctx.fillStyle = fill
      ctx.fillRect(x, y, cell, cell)
      ctx.strokeStyle = colors.faint
      ctx.strokeRect(x, y, cell, cell)
    }
  }
}
