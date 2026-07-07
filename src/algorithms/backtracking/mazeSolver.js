// Maze Solver - Backtracking
export const MazeSolver = {
  name: 'Maze Solver',
  description: 'A backtracking algorithm to find a path through a maze. It explores each possible direction and backtracks when it hits a dead end.',
  complexity: {
    time: 'O(4^(m*n))',
    space: 'O(m*n)'
  },
  pseudocode: `procedure solveMaze(maze, x, y, destination)
    if (x, y) == destination then
        return true
    end if
    if isWall(maze, x, y) or visited[x][y] then
        return false
    end if
    visited[x][y] := true
    for each direction in [up, down, left, right] do
        nx, ny := x + direction.x, y + direction.y
        if solveMaze(maze, nx, ny, destination) then
            return true
        end if
    end for
    return false
end procedure`,
  useCases: [
    'Maze solving',
    'Path finding',
    'Robot navigation',
    'Game pathfinding'
  ],
  initialize: (size) => {
    return {
      maze: [],
      steps: [],
      currentArray: []
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText('Maze Solver', 10, 30)
  }
}
