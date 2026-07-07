import { BaseAlgorithm, AlgorithmUtils } from '../core/algorithmEngine'

export class NQueens extends BaseAlgorithm {
  constructor() {
    super({
      id: 'nqueens',
      name: 'N-Queens Problem',
      category: 'backtracking',
      description: 'Place N queens on an N×N board such that no two threaten each other.',
      complexity: {
        time: 'O(N!)',
        space: 'O(N)'
      },
      pseudocode: `procedure nqueens(board, row, N)
    if row == N then return true
    for col := 0 to N-1 do
        if isSafe(board, row, col) then
            board[row][col] := 1
            if nqueens(board, row+1, N) then
                return true
            board[row][col] := 0
        end if
    end for
end procedure`,
      useCases: ['Puzzle solving', 'Constraint satisfaction']
    })
  }

  initialize(size) {
    const n = Math.min(Math.max(size, 4), 8)
    const solutions = []
    const board = Array(n).fill(0).map(() => Array(n).fill(0))
    
    this.reset()
    this.solve(board, 0, n, solutions)
    
    return {
      board: board.map(row => [...row]),
      n,
      solutions,
      steps: this.steps.length,
      comparisons: this.comparisons
    }
  }

  isSafe(board, row, col, n) {
    for (let j = 0; j < col; j++) {
      if (board[row][j]) return false
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j]) return false
    }
    for (let i = row, j = col; i < n && j >= 0; i++, j--) {
      if (board[i][j]) return false
    }
    return true
  }

  solve(board, row, n, solutions) {
    if (row === n) {
      solutions.push(board.map(r => [...r]))
      AlgorithmUtils.recordOperation(this)
      return
    }

    for (let col = 0; col < n; col++) {
      AlgorithmUtils.recordComparison(this)
      if (this.isSafe(board, row, col, n)) {
        board[row][col] = 1
        AlgorithmUtils.addStep(this, {
          type: 'place',
          row,
          col,
          board: board.map(r => [...r]),
          comparisons: this.comparisons
        })
        this.solve(board, row + 1, n, solutions)
        board[row][col] = 0
      }
    }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.board) return

    const { board, n } = state
    const cellSize = Math.min(width, height) / n

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = j * cellSize
        const y = i * cellSize

        ctx.fillStyle = (i + j) % 2 === 0 ? '#f0f0f0' : '#ffffff'
        ctx.fillRect(x, y, cellSize, cellSize)
        ctx.strokeStyle = '#999'
        ctx.lineWidth = 1
        ctx.strokeRect(x, y, cellSize, cellSize)

        if (board[i][j]) {
          ctx.fillStyle = '#ef4444'
          ctx.beginPath()
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 3, 0, 2 * Math.PI)
          ctx.fill()
        }
      }
    }

    ctx.fillStyle = '#333'
    ctx.font = '12px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(`Solutions: ${state.solutions.length}`, 10, height + 20)
  }
}
