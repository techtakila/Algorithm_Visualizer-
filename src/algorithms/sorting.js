function makeStep(array, active, action, comparisons, swaps, codeLineKey) {
  return {
    array: [...array],
    active: Array.isArray(active) ? [...active] : [],
    action,
    comparisons,
    swaps,
    codeLineKey,
  };
}

export function bubbleSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      comparisons += 1;
      steps.push(makeStep(a, [j, j + 1], "compare", comparisons, swaps, "compare"));
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps += 1;
        steps.push(makeStep(a, [j, j + 1], "swap", comparisons, swaps, "swap"));
      }
    }
  }

  return steps;
}

export function selectionSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      comparisons += 1;
      steps.push(makeStep(a, [min, j], "compare", comparisons, swaps, "compare"));
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      swaps += 1;
      steps.push(makeStep(a, [i, min], "swap", comparisons, swaps, "swap"));
    }
  }
  return steps;
}

export function insertionSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  let comparisons = 0;
  let swaps = 0;

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      comparisons += 1;
      steps.push(makeStep(a, [j, j + 1], "compare", comparisons, swaps, "compare"));
      a[j + 1] = a[j];
      swaps += 1;
      steps.push(makeStep(a, [j, j + 1], "swap", comparisons, swaps, "swap"));
      j--;
    }

    if (j >= 0) {
      comparisons += 1;
      steps.push(makeStep(a, [j, j + 1], "compare", comparisons, swaps, "compare"));
    }

    a[j + 1] = key;
    swaps += 1;
    steps.push(makeStep(a, [j + 1], "insert", comparisons, swaps, "insert"));
  }

  return steps;
}

export function mergeSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  let comparisons = 0;
  let swaps = 0;

  function mergeSort(start, end) {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);

    const left = a.slice(start, mid);
    const right = a.slice(mid, end);
    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      comparisons += 1;
      steps.push(makeStep(a, [k], "compare", comparisons, swaps, "compare"));
      if (left[i] <= right[j]) {
        a[k] = left[i];
        i++;
      } else {
        a[k] = right[j];
        j++;
      }
      swaps += 1;
      steps.push(makeStep(a, [k], "write", comparisons, swaps, "write"));
      k++;
    }

    while (i < left.length) {
      a[k] = left[i];
      swaps += 1;
      steps.push(makeStep(a, [k], "write", comparisons, swaps, "write"));
      i++;
      k++;
    }

    while (j < right.length) {
      a[k] = right[j];
      swaps += 1;
      steps.push(makeStep(a, [k], "write", comparisons, swaps, "write"));
      j++;
      k++;
    }
  }

  mergeSort(0, a.length);
  return steps;
}

export function quickSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  let comparisons = 0;
  let swaps = 0;

  function quickSort(l, r) {
    if (l >= r) return;

    const pivot = a[r];
    let i = l;

    for (let j = l; j < r; j++) {
      comparisons += 1;
      steps.push(makeStep(a, [j, r], "compare", comparisons, swaps, "compare"));
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        swaps += 1;
        steps.push(makeStep(a, [i, j], "swap", comparisons, swaps, "swap"));
        i++;
      }
    }

    [a[i], a[r]] = [a[r], a[i]];
    swaps += 1;
    steps.push(makeStep(a, [i, r], "swap", comparisons, swaps, "partition"));

    quickSort(l, i - 1);
    quickSort(i + 1, r);
  }

  quickSort(0, a.length - 1);
  return steps;
}

export function heapSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  let comparisons = 0;
  let swaps = 0;

  const n = a.length;

  function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      comparisons += 1;
      steps.push(makeStep(a, [largest, left], "compare", comparisons, swaps, "compare"));
      if (a[left] > a[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      comparisons += 1;
      steps.push(makeStep(a, [largest, right], "compare", comparisons, swaps, "compare"));
      if (a[right] > a[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      swaps += 1;
      steps.push(makeStep(a, [i, largest], "swap", comparisons, swaps, "swap"));
      heapify(n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    swaps += 1;
    steps.push(makeStep(a, [0, i], "swap", comparisons, swaps, "extract"));
    heapify(i, 0);
  }

  return steps;
}