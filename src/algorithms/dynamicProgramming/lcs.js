// Longest Common Subsequence Implementation
export const LCS = {
  name: 'Longest Common Subsequence (LCS)',
  description: 'LCS finds the longest subsequence common to two sequences. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous. This is useful in DNA analysis, file comparison, and more.',
  complexity: {
    time: 'O(m*n)',
    space: 'O(m*n)'
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
    'File comparison (diff tools)',
    'Version control systems',
    'Pattern matching'
  ],
  initialize: (size) => {
    return {
      seq1: 'AGGTAB',
      seq2: 'GXTXAYB',
      steps: [],
      currentArray: []
    }
  },
  render: (ctx, state, currentStep, width, height) => {
    ctx.fillStyle = '#000'
    ctx.font = '16px Arial'
    ctx.fillText('Longest Common Subsequence', 10, 30)
  }
}
