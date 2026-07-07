function createNode(value) {
  return { value, left: null, right: null };
}

export function bstInsert(root, value) {
  if (root == null) {
    return createNode(value);
  }
  if (value < root.value) {
    return { ...root, left: bstInsert(root.left, value) };
  }
  if (value > root.value) {
    return { ...root, right: bstInsert(root.right, value) };
  }
  // Ignore duplicates
  return root;
}

export function bstDelete(root, value) {
  if (root == null) return null;

  if (value < root.value) {
    return { ...root, left: bstDelete(root.left, value) };
  }
  if (value > root.value) {
    return { ...root, right: bstDelete(root.right, value) };
  }

  // Node to delete found
  if (!root.left && !root.right) return null;
  if (!root.left) return root.right;
  if (!root.right) return root.left;

  // Two children: swap with inorder successor
  let successorParent = root;
  let successor = root.right;
  while (successor.left) {
    successorParent = successor;
    successor = successor.left;
  }

  if (successorParent !== root) {
    successorParent.left = successor.right;
    successor.right = root.right;
  }
  successor.left = root.left;
  return { ...successor };
}

export function inorderSteps(root) {
  const steps = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    steps.push({ value: node.value, codeLineKey: "visit", traversalType: "inorder" });
    traverse(node.right);
  }
  traverse(root);
  return steps;
}

export function preorderSteps(root) {
  const steps = [];
  function traverse(node) {
    if (!node) return;
    steps.push({ value: node.value, codeLineKey: "visit", traversalType: "preorder" });
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return steps;
}

export function postorderSteps(root) {
  const steps = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    steps.push({ value: node.value, codeLineKey: "visit", traversalType: "postorder" });
  }
  traverse(root);
  return steps;
}

export function levelOrderSteps(root) {
  const steps = [];
  if (!root) return steps;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    steps.push({ value: node.value, codeLineKey: "visit", traversalType: "level" });
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return steps;
}

export function toLevelOrderArray(root) {
  return levelOrderSteps(root).map((step) => step.value);
}

function height(node) {
  if (!node) return 0;
  const lh = height(node.left);
  const rh = height(node.right);
  return (lh > rh ? lh : rh) + 1;
}

function getBalance(node) {
  return node ? height(node.left) - height(node.right) : 0;
}

function rotateRight(y) {
  const x = y.left;
  const T2 = x ? x.right : null;
  const newRight = {
    value: y.value,
    left: T2,
    right: y.right,
  };
  return {
    value: x.value,
    left: x.left,
    right: newRight,
  };
}

function rotateLeft(x) {
  const y = x.right;
  const T2 = y ? y.left : null;
  const newLeft = {
    value: x.value,
    left: x.left,
    right: T2,
  };
  return {
    value: y.value,
    left: newLeft,
    right: y.right,
  };
}

export function avlInsert(root, value, rotations = []) {
  if (root == null) {
    return createNode(value);
  }

  if (value < root.value) {
    root = { ...root, left: avlInsert(root.left, value, rotations) };
  } else if (value > root.value) {
    root = { ...root, right: avlInsert(root.right, value, rotations) };
  } else {
    // Ignore duplicates
    return root;
  }

  const balance = getBalance(root);

  // Left Left
  if (balance > 1 && value < root.left.value) {
    rotations.push({ type: "LL", pivot: root.value });
    return rotateRight(root);
  }

  // Right Right
  if (balance < -1 && value > root.right.value) {
    rotations.push({ type: "RR", pivot: root.value });
    return rotateLeft(root);
  }

  // Left Right
  if (balance > 1 && value > root.left.value) {
    rotations.push({ type: "LR", pivot: root.value });
    const newLeft = rotateLeft(root.left);
    const newRoot = { ...root, left: newLeft };
    return rotateRight(newRoot);
  }

  // Right Left
  if (balance < -1 && value < root.right.value) {
    rotations.push({ type: "RL", pivot: root.value });
    const newRight = rotateRight(root.right);
    const newRoot = { ...root, right: newRight };
    return rotateLeft(newRoot);
  }

  return root;
}


