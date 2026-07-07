import React from "react";

const COMPLEXITY_MAP = {
  // Sorting
  bubble: {
    name: "Bubble Sort",
    category: "Sorting / Comparison-based",
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    summary:
      "Bubble sort repeatedly steps through the array, swapping adjacent elements that are out of order. It is simple but inefficient on large inputs.",
  },
  selection: {
    name: "Selection Sort",
    category: "Sorting / Comparison-based",
    time: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    summary:
      "Selection sort selects the minimum element from the unsorted portion and swaps it into the next position in the sorted portion.",
  },
  insertion: {
    name: "Insertion Sort",
    category: "Sorting / Comparison-based, Adaptive",
    time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    space: "O(1)",
    summary:
      "Insertion sort builds the sorted array one element at a time by inserting each new element into its correct position.",
  },
  merge: {
    name: "Merge Sort",
    category: "Sorting / Divide & Conquer, Stable",
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(n)",
    summary:
      "Merge sort divides the array into halves, sorts each half, and then merges the sorted halves back together.",
  },
  quick: {
    name: "Quick Sort",
    category: "Sorting / Divide & Conquer, In-place",
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    space: "O(log n) average (recursion stack)",
    summary:
      "Quick sort partitions the array around a pivot and recursively sorts the partitions. It is fast in practice and widely used.",
  },
  heap: {
    name: "Heap Sort",
    category: "Sorting / Heap-based, In-place",
    time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    space: "O(1)",
    summary:
      "Heap sort builds a binary heap from the input and repeatedly extracts the maximum element to build a sorted array.",
  },

  // Searching
  linear: {
    name: "Linear Search",
    category: "Searching / Sequential",
    time: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    space: "O(1)",
    summary:
      "Linear search scans each element one by one until it finds the target or reaches the end of the array.",
  },
  binary: {
    name: "Binary Search",
    category: "Searching / Divide & Conquer",
    time: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    space: "O(1)",
    summary:
      "Binary search repeatedly splits a sorted array in half, discarding the half that cannot contain the target.",
  },

  // Graphs
  bfs: {
    name: "Breadth-First Search (BFS)",
    category: "Graph Traversal / Shortest Path on Unweighted Graphs",
    time: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    space: "O(V)",
    summary:
      "BFS explores a graph level by level using a queue. It is ideal for finding the shortest path in unweighted graphs.",
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    category: "Graph Traversal / Backtracking",
    time: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
    space: "O(V)",
    summary:
      "DFS explores as far as possible along each branch before backtracking, using a stack or recursion.",
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    category: "Shortest Path / Greedy",
    time: {
      best: "O((V + E) log V) with heap",
      average: "O((V + E) log V)",
      worst: "O((V + E) log V)",
    },
    space: "O(V)",
    summary:
      "Dijkstra's algorithm computes the shortest path from a source to all vertices in a graph with non-negative edge weights.",
  },

  // Trees
  bst: {
    name: "Binary Search Tree (BST)",
    category: "Tree / Ordered, Linked Structure",
    time: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(n) (skewed)",
    },
    space: "O(h) recursion stack, O(n) storage",
    summary:
      "A BST keeps keys in sorted order so that insert, search, and delete operations can be performed in logarithmic time on average.",
  },
  avl: {
    name: "AVL Tree",
    category: "Tree / Self-balancing Binary Search Tree",
    time: {
      best: "O(log n)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    space: "O(h) recursion stack, O(n) storage",
    summary:
      "An AVL tree is a self-balancing binary search tree that automatically rotates after insertions and deletions to keep its height logarithmic, guaranteeing O(log n) operations.",
  },
  traversal: {
    name: "Tree Traversals",
    category: "Tree / Traversal (Inorder, Preorder, Postorder, Level Order)",
    time: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    space: "O(h) for DFS, O(n) for BFS",
    summary:
      "Traversals visit each node of the tree in a particular order to process or print its values.",
  },

  // Core data structures
  "array-ds": {
    name: "Array",
    category: "Data Structure / Contiguous Memory",
    time: {
      best: "Access: O(1)",
      average: "Insert/Delete (middle): O(n)",
      worst: "Resize: O(n)",
    },
    space: "O(n)",
    summary:
      "An array stores elements in a contiguous block of memory, offering O(1) random access by index but O(n) inserts/deletes in the middle.",
  },
  stack: {
    name: "Stack",
    category: "Data Structure / LIFO",
    time: {
      best: "Push/Pop: O(1)",
      average: "Push/Pop: O(1)",
      worst: "Push/Pop: O(1)",
    },
    space: "O(n)",
    summary:
      "A stack is a last-in, first-out structure that supports push and pop at one end (the top) in constant time.",
  },
  queue: {
    name: "Queue",
    category: "Data Structure / FIFO",
    time: {
      best: "Enqueue/Dequeue: O(1)",
      average: "Enqueue/Dequeue: O(1)",
      worst: "Enqueue/Dequeue: O(1)",
    },
    space: "O(n)",
    summary:
      "A queue is a first-in, first-out structure with elements enqueued at the rear and dequeued from the front, both in constant time.",
  },
  list: {
    name: "Singly Linked List",
    category: "Data Structure / Linked Nodes",
    time: {
      best: "Insert/Delete at head: O(1)",
      average: "Search: O(n)",
      worst: "Search: O(n)",
    },
    space: "O(n)",
    summary:
      "A singly linked list is a chain of nodes where each node points to the next, allowing fast insert/delete at the head but linear-time access by index.",
  },
  "heap-ds": {
    name: "Binary Heap",
    category: "Data Structure / Priority Queue",
    time: {
      best: "Insert: O(1), Extract: O(log n)",
      average: "Insert/Extract: O(log n)",
      worst: "Insert/Extract: O(log n)",
    },
    space: "O(n)",
    summary:
      "A binary heap is a complete binary tree stored in an array where each parent is ordered relative to its children, enabling efficient priority queue operations.",
  },
  hash: {
    name: "Hash Table / Map",
    category: "Data Structure / Key-Value, Hashing",
    time: {
      best: "Get/Put: O(1)",
      average: "Get/Put: O(1)",
      worst: "Get/Put: O(n) (all keys collide)",
    },
    space: "O(n)",
    summary:
      "A hash table maps keys to values using a hash function into buckets, offering average-case constant time for lookups and updates with good hashing and load factors.",
  },
};

function ComplexityPanel({ algorithmKey }) {
  const info = COMPLEXITY_MAP[algorithmKey] ?? null;

  if (!info) {
    return (
      <div className="space-y-2 text-sm text-slate-400">
        <p className="font-medium text-slate-200">Complexity overview</p>
        <p>Select an algorithm to see its time and space complexity.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-sm">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
          Complexity
        </p>
        <h2 className="mt-1 text-base font-semibold text-slate-50">
          {info.name}
        </h2>
        <p className="mt-1 text-xs font-medium text-sky-400">
          {info.category}
        </p>
      </div>

      <dl className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-900/70 p-3 text-xs">
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Time (Best)
          </dt>
          <dd className="mt-0.5 text-slate-100">{info.time.best}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Time (Average)
          </dt>
          <dd className="mt-0.5 text-slate-100">{info.time.average}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Time (Worst)
          </dt>
          <dd className="mt-0.5 text-slate-100">{info.time.worst}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Space
          </dt>
          <dd className="mt-0.5 text-slate-100">{info.space}</dd>
        </div>
      </dl>

      <p className="text-xs leading-relaxed text-slate-300">{info.summary}</p>
    </div>
  );
}

export default ComplexityPanel;

