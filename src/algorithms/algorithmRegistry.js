import { BubbleSort } from './sorting/BubbleSort'
import { MergeSort } from './sorting/MergeSort'
import { QuickSort } from './sorting/QuickSort'
import { LinearSearch } from './searching/LinearSearch'
import { BinarySearch } from './searching/BinarySearch'
import { NQueens } from './backtracking/NQueens'

const algorithmInstances = {
  'bubble-sort': new BubbleSort(),
  'merge-sort': new MergeSort(),
  'quick-sort': new QuickSort(),
  'linear-search': new LinearSearch(),
  'binary-search': new BinarySearch(),
  'nqueens': new NQueens()
}

export const ALGORITHM_CATEGORIES = {
  'sorting': {
    name: '📊 Sorting Algorithms',
    algorithms: [
      { id: 'bubble-sort', name: 'Bubble Sort' },
      { id: 'merge-sort', name: 'Merge Sort' },
      { id: 'quick-sort', name: 'Quick Sort' }
    ]
  },
  'searching': {
    name: '🔍 Searching Algorithms',
    algorithms: [
      { id: 'linear-search', name: 'Linear Search' },
      { id: 'binary-search', name: 'Binary Search' }
    ]
  },
  'backtracking': {
    name: '🔄 Backtracking',
    algorithms: [
      { id: 'nqueens', name: 'N-Queens Problem' }
    ]
  },
  'greedy': {
    name: '🎯 Greedy Algorithms',
    algorithms: []
  },
  'dynamic-programming': {
    name: '📈 Dynamic Programming',
    algorithms: []
  },
  'divide-conquer': {
    name: '✂️ Divide & Conquer',
    algorithms: []
  },
  'branch-bound': {
    name: '🌳 Branch & Bound',
    algorithms: []
  },
  'brute-force': {
    name: '💪 Brute Force',
    algorithms: []
  }
}

export function getAlgorithmById(id) {
  return algorithmInstances[id]
}

export function getAllAlgorithms() {
  return algorithmInstances
}
