import { cloneMatrix, drawTitle, getThemeColors } from '../visualHelpers'

export const NQueens = {
  name: 'N-Queens Problem',
  description: 'N-Queens places queens one row at a time and backtracks whenever a placement would share a column or diagonal with an existing queen.',
  complexity: {
    time: 'O(N!)',
    space: 'O(N)',
  },
  pseudocode: `procedure nqueens(board, row, N)
    if row == N then
        return true
    end if
    for col := 0 to N-1 do
        if isSafe(board, row, col) then
            board[row][col] := 1
            if nqueens(board, row + 1, N) then
                return true
            end if
            board[row][col] := 0
        end if
    end for
    return false
end procedure`,
  useCases: [
    'Constraint satisfaction',
    'Puzzle solving',
    'Search with pruning',
    'Teaching recursion and backtracking',
  ],
  initialize: (size) => {
    const n = Math.max(4, Math.min(8, Math.round(size / 8)))
    const board = Array.from({ length: n }, () => Array(n).fill(0))
    const steps = []
    solve(board, 0, steps)
    return { board, n, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawQueens(ctx, state, currentStep, width, height)
  },
}

function solve(board, row, steps) {
  if (row === board.length) {
    steps.push({ board: cloneMatrix(board), row, col: -1, status: 'Solution found' })
    return true
  }

  for (let col = 0; col < board.length; col += 1) {
    steps.push({ board: cloneMatrix(board), row, col, status: `Try row ${row + 1}, column ${col + 1}` })
    if (isSafe(board, row, col)) {
      board[row][col] = 1
      steps.push({ board: cloneMatrix(board), row, col, status: 'Place queen' })
      if (solve(board, row + 1, steps)) return true
      board[row][col] = 0
      steps.push({ board: cloneMatrix(board), row, col, status: 'Backtrack' })
    } else {
      steps.push({ board: cloneMatrix(board), row, col, status: 'Conflict, skip' })
    }
  }
  return false
}

function isSafe(board, row, col) {
  for (let r = 0; r < row; r += 1) {
    if (board[r][col]) return false
  }
  for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r -= 1, c -= 1) {
    if (board[r][c]) return false
  }
  for (let r = row - 1, c = col + 1; r >= 0 && c < board.length; r -= 1, c += 1) {
    if (board[r][c]) return false
  }
  return true
}

function drawQueens(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || { board: state.board }
  const board = step.board
  const size = Math.min(width - 80, height - 118)
  const cell = size / state.n
  const startX = (width - size) / 2
  const startY = 86

  drawTitle(ctx, 'Backtracking Search Board', step.status || 'Place queens safely.')

  for (let r = 0; r < state.n; r += 1) {
    for (let c = 0; c < state.n; c += 1) {
      const x = startX + c * cell
      const y = startY + r * cell
      const active = step.row === r && step.col === c
      ctx.fillStyle = (r + c) % 2 === 0 ? (colors.dark ? '#1e293b' : '#e2e8f0') : (colors.dark ? '#0f172a' : '#f8fafc')
      if (active) ctx.fillStyle = step.status === 'Conflict, skip' ? '#fee2e2' : '#fef3c7'
      if (colors.dark && active) ctx.fillStyle = step.status === 'Conflict, skip' ? '#7f1d1d' : '#78350f'
      ctx.fillRect(x, y, cell, cell)
      ctx.strokeStyle = colors.faint
      ctx.strokeRect(x, y, cell, cell)

      if (board[r][c]) {
        ctx.fillStyle = colors.green
        ctx.beginPath()
        ctx.arc(x + cell / 2, y + cell / 2, cell * 0.28, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.font = `700 ${Math.max(14, cell * 0.32)}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('Q', x + cell / 2, y + cell / 2)
      }
    }
  }
  ctx.textBaseline = 'alphabetic'
}
