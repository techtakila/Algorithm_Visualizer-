import { cloneMatrix, drawTitle, getThemeColors } from '../visualHelpers'

export const Sudoku = {
  name: 'Sudoku Solver',
  description: 'Sudoku solving is a constraint-satisfaction backtracking problem. The solver fills an empty cell, tries valid digits, and backtracks when later choices become impossible.',
  complexity: {
    time: 'O(9^(n^2)) worst case',
    space: 'O(n^2)',
  },
  pseudocode: `procedure solveSudoku(board)
    cell := first empty cell
    if no empty cell then
        return true
    end if
    for num := 1 to 9 do
        if isValid(board, cell, num) then
            board[cell] := num
            if solveSudoku(board) then return true
            board[cell] := 0
        end if
    end for
    return false
end procedure`,
  useCases: [
    'Puzzle solving',
    'Constraint satisfaction',
    'Teaching recursive search',
    'Validation of candidate choices',
  ],
  initialize: () => {
    const board = [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ]
    const fixed = board.map((row) => row.map((value) => value !== 0))
    const steps = []
    solve(board, fixed, steps, 180)
    return { board, fixed, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    drawSudoku(ctx, state, currentStep, width, height)
  },
}

function solve(board, fixed, steps, limit) {
  if (steps.length >= limit) return true
  const empty = findEmpty(board)
  if (!empty) {
    steps.push({ board: cloneMatrix(board), row: -1, col: -1, status: 'Solved' })
    return true
  }

  const [row, col] = empty
  for (let num = 1; num <= 9; num += 1) {
    steps.push({ board: cloneMatrix(board), row, col, value: num, status: `Try ${num}` })
    if (isValid(board, row, col, num)) {
      board[row][col] = num
      steps.push({ board: cloneMatrix(board), row, col, value: num, status: `Place ${num}` })
      if (solve(board, fixed, steps, limit)) return true
      board[row][col] = 0
      steps.push({ board: cloneMatrix(board), row, col, value: num, status: `Remove ${num}` })
    }
  }
  return false
}

function findEmpty(board) {
  for (let r = 0; r < 9; r += 1) {
    for (let c = 0; c < 9; c += 1) {
      if (board[r][c] === 0) return [r, c]
    }
  }
  return null
}

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i += 1) {
    if (board[row][i] === num || board[i][col] === num) return false
  }
  const startRow = Math.floor(row / 3) * 3
  const startCol = Math.floor(col / 3) * 3
  for (let r = startRow; r < startRow + 3; r += 1) {
    for (let c = startCol; c < startCol + 3; c += 1) {
      if (board[r][c] === num) return false
    }
  }
  return true
}

function drawSudoku(ctx, state, currentStep, width, height) {
  const colors = getThemeColors()
  const step = state.steps[Math.min(currentStep, state.steps.length - 1)] || { board: state.board }
  const size = Math.min(width - 88, height - 122)
  const cell = size / 9
  const startX = (width - size) / 2
  const startY = 88

  drawTitle(ctx, 'Backtracking Sudoku Trace', step.status || 'Try valid digits one cell at a time.')

  for (let r = 0; r < 9; r += 1) {
    for (let c = 0; c < 9; c += 1) {
      const x = startX + c * cell
      const y = startY + r * cell
      const active = step.row === r && step.col === c
      ctx.fillStyle = active ? '#fef3c7' : state.fixed[r][c] ? (colors.dark ? '#1e293b' : '#e2e8f0') : colors.panel
      if (colors.dark && active) ctx.fillStyle = '#78350f'
      ctx.fillRect(x, y, cell, cell)
      ctx.strokeStyle = colors.faint
      ctx.strokeRect(x, y, cell, cell)

      const value = step.board[r][c]
      if (value) {
        ctx.fillStyle = state.fixed[r][c] ? colors.text : colors.blue
        ctx.font = `700 ${Math.max(13, cell * 0.42)}px Arial`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(String(value), x + cell / 2, y + cell / 2)
      }
    }
  }

  ctx.strokeStyle = colors.text
  ctx.lineWidth = 2
  for (let i = 0; i <= 9; i += 3) {
    ctx.beginPath()
    ctx.moveTo(startX + i * cell, startY)
    ctx.lineTo(startX + i * cell, startY + size)
    ctx.moveTo(startX, startY + i * cell)
    ctx.lineTo(startX + size, startY + i * cell)
    ctx.stroke()
  }
  ctx.lineWidth = 1
  ctx.textBaseline = 'alphabetic'
}
