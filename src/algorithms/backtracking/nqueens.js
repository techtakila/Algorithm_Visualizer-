// N-Queens - Backtracking
export const NQueens = {
  name: 'N-Queens Problem',
  description: 'The N-Queens problem is to place N chess queens on an N×N chessboard such that no two queens threaten each other. It is solved using backtracking by trying different positions and backtracking when a conflict is found.',
  complexity: {
    time: 'O(N!)',
    space: 'O(N)'
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
    'Puzzle solving',
    'Constraint satisfaction problems',
    'Game AI',
    'Optimization with constraints'
  ],
  initialize: (size) => {
    const n = Math.min(size, 8)
    return {
      board: Array(n).fill(0).map(() => Array(n).fill(0)),
      n,
      steps: [],
      currentArray: []
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText('N-Queens Problem', 10, 30)
  }
}
