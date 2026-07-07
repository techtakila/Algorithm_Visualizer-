function makeStep(array, active, comparisons, found, codeLineKey) {
  const step = {
    array: [...array],
    active: Array.isArray(active) ? [...active] : [],
    comparisons,
    codeLineKey,
  };
  if (typeof found === "number") {
    step.found = found;
  }
  return step;
}

export function linearSearchSteps(arr, target) {
  const steps = [];
  let comparisons = 0;

  for (let i = 0; i < arr.length; i++) {
    comparisons += 1;
    steps.push(makeStep(arr, [i], comparisons, undefined, "compare"));
    if (arr[i] === target) {
      steps.push(makeStep(arr, [i], comparisons, i, "found"));
      break;
    }
  }

  return steps;
}

export function binarySearchSteps(arr, target) {
  const steps = [];
  let left = 0;
  let right = arr.length - 1;
  let comparisons = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons += 1;
    steps.push(makeStep(arr, [mid], comparisons, undefined, "compare"));

    if (arr[mid] === target) {
      steps.push(makeStep(arr, [mid], comparisons, mid, "found"));
      break;
    }

    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return steps;
}