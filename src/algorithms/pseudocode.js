const CODE_LINES_BY_SECTION = {
  sorting: {
    bubble: [
      { key: "forI", number: 1, text: "for i = 0 to n - 1" },
      { key: "forJ", number: 2, text: "for j = 0 to n - i - 2" },
      { key: "compare", number: 3, text: "if a[j] > a[j + 1]" },
      { key: "swap", number: 4, text: "swap(a[j], a[j + 1])" },
    ],
    selection: [
      { key: "forI", number: 1, text: "for i = 0 to n - 1" },
      { key: "findMin", number: 2, text: "minIndex = find smallest in remaining list" },
      { key: "compare", number: 3, text: "if a[j] < a[minIndex]" },
      { key: "swap", number: 4, text: "swap(a[i], a[minIndex])" },
    ],
    insertion: [
      { key: "forI", number: 1, text: "for i = 1 to n - 1" },
      { key: "compare", number: 2, text: "while j >= 0 and a[j] > key" },
      { key: "swap", number: 3, text: "shift a[j] right" },
      { key: "insert", number: 4, text: "insert key into its correct position" },
    ],
    merge: [
      { key: "compare", number: 1, text: "while left[i] <= right[j]" },
      { key: "write", number: 2, text: "copy next value into merged result" },
    ],
    quick: [
      { key: "compare", number: 1, text: "while j < r and a[j] < pivot" },
      { key: "swap", number: 2, text: "swap a[i] with a[j]" },
      { key: "partition", number: 3, text: "swap pivot into its final position" },
    ],
    heap: [
      { key: "compare", number: 1, text: "compare parent with children" },
      { key: "swap", number: 2, text: "swap root with largest child" },
      { key: "extract", number: 3, text: "move max value to the end" },
    ],
  },
  searching: {
    linear: [
      { key: "compare", number: 1, text: "for each value in the array" },
      { key: "found", number: 2, text: "if value == target return index" },
    ],
    binary: [
      { key: "compare", number: 1, text: "mid = (left + right) / 2" },
      { key: "found", number: 2, text: "if arr[mid] == target return mid" },
    ],
  },
  graphs: {
    bfs: [
      { key: "visit", number: 1, text: "visit current node" },
      { key: "enqueue", number: 2, text: "enqueue each unvisited neighbor" },
    ],
    dfs: [
      { key: "visit", number: 1, text: "visit current node" },
      { key: "push", number: 2, text: "push each unvisited neighbor onto the stack" },
    ],
    dijkstra: [
      { key: "relax", number: 1, text: "relax edges and update the best distance" },
    ],
  },
  trees: {
    inorder: [
      { key: "visit", number: 1, text: "traverse(left)" },
      { key: "visit", number: 2, text: "visit(node.value)" },
      { key: "visit", number: 3, text: "traverse(right)" },
    ],
    preorder: [
      { key: "visit", number: 1, text: "visit(node.value)" },
      { key: "visit", number: 2, text: "traverse(left)" },
      { key: "visit", number: 3, text: "traverse(right)" },
    ],
    postorder: [
      { key: "visit", number: 1, text: "traverse(left)" },
      { key: "visit", number: 2, text: "traverse(right)" },
      { key: "visit", number: 3, text: "visit(node.value)" },
    ],
    level: [
      { key: "visit", number: 1, text: "visit(node.value)" },
      { key: "visit", number: 2, text: "enqueue(left/right children)" },
    ],
  },
};

export function getCodeLines(section, algorithm, step = null) {
  if (section === "trees") {
    const traversalType = step?.traversalType || "inorder";
    return CODE_LINES_BY_SECTION.trees[traversalType] || CODE_LINES_BY_SECTION.trees.inorder;
  }

  return CODE_LINES_BY_SECTION[section]?.[algorithm] || [];
}

export function getActiveCodeLine(section, algorithm, step = null) {
  const lines = getCodeLines(section, algorithm, step);
  if (!step?.codeLineKey) return lines[0] || null;
  return lines.find((line) => line.key === step.codeLineKey) || lines[0] || null;
}
