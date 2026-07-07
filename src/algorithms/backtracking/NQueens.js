import { BaseAlgorithm, AlgorithmUtils, RenderUtils } from '../core/algorithmEngine'

export class NQueens extends BaseAlgorithm {
  constructor() {
    super({
      id: 'nqueens',
      name: 'N-Queens Problem',
      category: 'backtracking',
      description: 'The N-Queens problem solves the challenge of placing N chess queens on an N×N chessboard such that no two queens threaten each other. Uses backtracking to explore and prune the solution space.',
      complexity: {
        time: 'O(N!) in worst case',
        space: 'O(N)',
        best: 'O(N)',
        worst: 'O(N!)',
        average: 'O(N!)'
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
            board[row][col] := 0  // Backtrack
        end if
    end for
    return false
end procedure`,
      useCases: [
        'Puzzle solving and constraint satisfaction',
        'Demonstrating backtracking algorithms',
        'Game AI and decision trees',
        'Optimization with multiple constraints'
      ],
      visualizationType: 'grid'
    })
  }

  initialize(size) {
    const n = Math.min(size, 8)
    const solutions = []
    const board = Array(n).fill(0).map(() => Array(n).fill(0))
    
    this.reset()
    this.solve(board, 0, n, solutions)
    
    this.state = {
      board: board.map(row => [...row]),
      n,
      solutions,
      currentSolution: solutions[0] || null
    }
    
    return this.state
  }

  isSafe(board, row, col, n) {
    // Check row
    for (let j = 0; j < col; j++) {
      if (board[row][j]) return false
    }
    // Check diagonal
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
          board: board.map(r => [...r])
        })
        this.solve(board, row + 1, n, solutions)
        board[row][col] = 0
        AlgorithmUtils.addStep(this, {
          type: 'backtrack',
          row,
          col,
          board: board.map(r => [...r])
        })
      }
    }
  }

  render(ctx, state, currentStep, width, height) {
    if (!state || !state.board) return

    const { board, n } = state
    const cellSize = Math.min(width, height) / n

    ctx.clearRect(0, 0, width, height)

    // Draw chessboard
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = j * cellSize
        const y = i * cellSize

        ctx.fillStyle = (i + j) % 2 === 0 ? '#f0f0f0' : '#ffffff'
        ctx.fillRect(x, y, cellSize, cellSize)
        ctx.strokeStyle = '#999'
        ctx.strokeRect(x, y, cellSize, cellSize)

        if (board[i][j]) {
          ctx.fillStyle = '#ef4444'
          ctx.beginPath()
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 3, 0, 2 * Math.PI)
          ctx.fill()
        }
      }
    }

    RenderUtils.drawText(ctx, `Solutions Found: ${state.solutions.length} | Comparisons: ${this.comparisons}`, 10, height + 20, {
      fontSize: 12,
      color: '#333'
    })
  }
}
