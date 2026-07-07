// Import all algorithms
import { BubbleSort } from './sorting/bubbleSort'
import { MergeSort } from './sorting/mergeSort'
import { QuickSort } from './sorting/quickSort'
import { InsertionSort } from './sorting/insertionSort'
import { LinearSearch } from './searching/linearSearch'
import { BinarySearch } from './searching/binarySearch'
import { FibonacciDP } from './dynamicProgramming/fibonacci'
import { KnapsackDP } from './dynamicProgramming/knapsack'
import { LCS } from './dynamicProgramming/lcs'
import { ActivitySelection } from './greedy/activitySelection'
import { HuffmanCoding } from './greedy/huffmanCoding'
import { MergeSortDC } from './divideConquer/mergeSort'
import { BinarySearchDC } from './divideConquer/binarySearch'
import { NQueens } from './backtracking/nqueens'
import { Sudoku } from './backtracking/sudoku'
import { MazeSolver } from './backtracking/mazeSolver'
import { TSPBranchBound } from './branchBound/tsp'
import { KnapsackBB } from './branchBound/knapsack'

export const ALGORITHM_CATEGORIES = {
  'sorting': {
    name: '📊 Sorting Algorithms',
    algorithms: [
      { id: 'bubble-sort', name: 'Bubble Sort' },
      { id: 'insertion-sort', name: 'Insertion Sort' },
      { id: 'merge-sort', name: 'Merge Sort' },
      { id: 'quick-sort', name: 'Quick Sort' },
    ]
  },
  'searching': {
    name: '🔍 Searching Algorithms',
    algorithms: [
      { id: 'linear-search', name: 'Linear Search' },
      { id: 'binary-search', name: 'Binary Search' },
    ]
  },
  'greedy': {
    name: '🎯 Greedy Algorithms',
    algorithms: [
      { id: 'activity-selection', name: 'Activity Selection' },
      { id: 'huffman-coding', name: 'Huffman Coding' },
    ]
  },
  'dynamic-programming': {
    name: '📈 Dynamic Programming',
    algorithms: [
      { id: 'fibonacci-dp', name: 'Fibonacci (DP)' },
      { id: 'knapsack-dp', name: '0/1 Knapsack (DP)' },
      { id: 'lcs', name: 'Longest Common Subsequence' },
    ]
  },
  'divide-conquer': {
    name: '✂️ Divide & Conquer',
    algorithms: [
      { id: 'merge-sort-dc', name: 'Merge Sort' },
      { id: 'binary-search-dc', name: 'Binary Search' },
    ]
  },
  'backtracking': {
    name: '🔄 Backtracking',
    algorithms: [
      { id: 'nqueens', name: 'N-Queens Problem' },
      { id: 'sudoku', name: 'Sudoku Solver' },
      { id: 'maze-solver', name: 'Maze Solver' },
    ]
  },
  'branch-bound': {
    name: '🌳 Branch & Bound',
    algorithms: [
      { id: 'tsp-bb', name: 'Traveling Salesman Problem' },
      { id: 'knapsack-bb', name: '0/1 Knapsack (B&B)' },
    ]
  },
  'brute-force': {
    name: '💪 Brute Force',
    algorithms: [
      { id: 'linear-search', name: 'Linear Search' },
      { id: 'bubble-sort', name: 'Bubble Sort' },
    ]
  }
}

const algorithmMap = {
  'bubble-sort': BubbleSort,
  'merge-sort': MergeSort,
  'quick-sort': QuickSort,
  'insertion-sort': InsertionSort,
  'linear-search': LinearSearch,
  'binary-search': BinarySearch,
  'fibonacci-dp': FibonacciDP,
  'knapsack-dp': KnapsackDP,
  'lcs': LCS,
  'activity-selection': ActivitySelection,
  'huffman-coding': HuffmanCoding,
  'merge-sort-dc': MergeSortDC,
  'binary-search-dc': BinarySearchDC,
  'nqueens': NQueens,
  'sudoku': Sudoku,
  'maze-solver': MazeSolver,
  'tsp-bb': TSPBranchBound,
  'knapsack-bb': KnapsackBB,
}

export function getAlgorithmById(id) {
  return algorithmMap[id]
}

export function getAllAlgorithms() {
  return algorithmMap
}