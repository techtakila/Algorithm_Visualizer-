import { cloneMatrix, drawGrid, drawTitle } from '../visualHelpers'

export const LCS = {
  name: 'Longest Common Subsequence (LCS)',
  description: 'LCS compares two sequences and records the best subsequence length for every prefix pair. Matching characters extend a diagonal answer; mismatches keep the best neighboring answer.',
  complexity: {
    time: 'O(m*n)',
    space: 'O(m*n)',
  },
  pseudocode: `procedure lcs(X, Y)
    m := length(X)
    n := length(Y)
    L[0..m][0..n] := 0
    for i := 1 to m do
        for j := 1 to n do
            if X[i-1] == Y[j-1] then
                L[i][j] := L[i-1][j-1] + 1
            else
                L[i][j] := max(L[i-1][j], L[i][j-1])
            end if
        end for
    end for
    return L[m][n]
end procedure`,
  useCases: [
    'DNA sequence analysis',
    'File comparison',
    'Version control diff tools',
    'Similarity scoring',
  ],
  initialize: () => {
    const seq1 = 'AGGTAB'
    const seq2 = 'GXTXAYB'
    const { table, steps } = buildLcsTable(seq1, seq2)
    return { seq1, seq2, table, steps, currentArray: [] }
  },
  render: (ctx, state, currentStep, width, height) => {
    if (!state) return
    const step = state.steps[Math.min(currentStep, state.steps.length - 1)]
    const table = step?.table || state.table
    drawTitle(ctx, 'LCS Dynamic Programming Matrix', step?.note || `LCS length: ${state.table[state.seq1.length][state.seq2.length]}`)
    drawGrid(ctx, table.length, table[0].length, width, height, {
      values: table,
      activeCell: step ? [step.i, step.j] : null,
      labelRows: ['-', ...state.seq1.split('')],
      labelCols: ['-', ...state.seq2.split('')],
      maxCell: 44,
    })
  },
}

function buildLcsTable(seq1, seq2) {
  const table = Array.from({ length: seq1.length + 1 }, () => Array(seq2.length + 1).fill(0))
  const steps = []

  for (let i = 1; i <= seq1.length; i += 1) {
    for (let j = 1; j <= seq2.length; j += 1) {
      const matches = seq1[i - 1] === seq2[j - 1]
      table[i][j] = matches
        ? table[i - 1][j - 1] + 1
        : Math.max(table[i - 1][j], table[i][j - 1])
      steps.push({
        i,
        j,
        table: cloneMatrix(table),
        note: matches
          ? `${seq1[i - 1]} matches ${seq2[j - 1]}: extend diagonal`
          : `${seq1[i - 1]} vs ${seq2[j - 1]}: keep best neighbor`,
      })
    }
  }

  return { table, steps }
}
