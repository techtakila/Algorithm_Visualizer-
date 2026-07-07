import React from "react";
import { getActiveCodeLine, getCodeLines } from "../algorithms/pseudocode";

const SECTION_LABELS = {
  sorting: "Sorting",
  searching: "Searching",
  graphs: "Graphs",
  trees: "Trees",
  structures: "Data Structures",
};

const GUIDE_BY_SECTION = {
  sorting: {
    bubble: {
      title: "Bubble Sort",
      summary:
        "Bubble sort is like letting the biggest number slowly float to the end, one step at a time.",
      watch: [
        "Compare two nearby numbers",
        "Swap them if the left one is bigger",
        "Keep going until everything is in order",
      ],
    },
    selection: {
      title: "Selection Sort",
      summary:
        "Selection sort looks for the smallest number and places it in the next empty spot.",
      watch: [
        "Pick the smallest number in the remaining part",
        "Move it to the front of that part",
        "Repeat until the whole list is sorted",
      ],
    },
    insertion: {
      title: "Insertion Sort",
      summary:
        "Insertion sort builds the sorted part one number at a time, like putting cards in order.",
      watch: [
        "Take one number from the unsorted part",
        "Slide it left until it is in the right place",
        "Repeat until everything is sorted",
      ],
    },
    merge: {
      title: "Merge Sort",
      summary:
        "Merge sort splits the list into tiny pieces and then puts them back together carefully.",
      watch: [
        "Split the list into smaller halves",
        "Sort each half",
        "Join them back in the right order",
      ],
    },
    quick: {
      title: "Quick Sort",
      summary:
        "Quick sort picks one number as a helper and puts smaller numbers on one side and bigger ones on the other.",
      watch: [
        "Choose a helper number",
        "Send smaller numbers left and bigger numbers right",
        "Sort the left and right parts",
      ],
    },
    heap: {
      title: "Heap Sort",
      summary:
        "Heap sort creates a big heap, then takes the biggest number off the top again and again.",
      watch: [
        "Build a heap so the biggest number is easy to find",
        "Swap it to the end",
        "Repeat until the list is sorted",
      ],
    },
  },
  searching: {
    linear: {
      title: "Linear Search",
      summary:
        "Linear search checks each number one by one until it finds the target.",
      watch: [
        "Look at the current number",
        "Compare it with the target",
        "Stop when the target is found",
      ],
    },
    binary: {
      title: "Binary Search",
      summary:
        "Binary search chops the list in half each time, so it finds the target much faster.",
      watch: [
        "Look at the middle number",
        "Choose the half that could still contain the target",
        "Keep cutting the search space in half",
      ],
    },
  },
  graphs: {
    bfs: {
      title: "Breadth-First Search",
      summary:
        "BFS visits nearby places first, like checking all neighbors in a playground before moving farther away.",
      watch: [
        "Visit the current node",
        "Add its neighbors to a waiting line",
        "Explore the line from front to back",
      ],
    },
    dfs: {
      title: "Depth-First Search",
      summary:
        "DFS goes deep first, like following one path until it cannot go farther.",
      watch: [
        "Visit the current node",
        "Go to one neighbor and keep following it",
        "Backtrack when the path ends",
      ],
    },
    dijkstra: {
      title: "Dijkstra's Algorithm",
      summary:
        "Dijkstra finds the cheapest path by always picking the shortest route discovered so far.",
      watch: [
        "Pick the node with the smallest known distance",
        "Try all its roads",
        "Update the route if a shorter one is found",
      ],
    },
  },
  trees: {
    bst: {
      title: "Binary Search Tree",
      summary:
        "A BST helps us find and place values quickly by sending smaller values left and larger values right.",
      watch: [
        "Compare the new value with the current node",
        "Go left for smaller values and right for bigger values",
        "Keep moving until the right spot is found",
      ],
    },
    avl: {
      title: "AVL Tree",
      summary:
        "An AVL tree is like a BST with extra balancing so it stays nice and fast even with many values.",
      watch: [
        "Insert the value the same way as a BST",
        "Check if the tree became too lopsided",
        "Rotate branches to keep it balanced",
      ],
    },
  },
  structures: {
    array: {
      title: "Array",
      summary:
        "An array is a row of boxes where each box has a number and a position.",
      watch: [
        "Use an index to reach a box quickly",
        "Insert or remove values carefully",
        "Each box keeps its own spot",
      ],
    },
    stack: {
      title: "Stack",
      summary:
        "A stack is like a pile of plates; you add and remove from the top.",
      watch: [
        "Push adds a new item on top",
        "Pop removes the top item",
        "The most recent item is handled first",
      ],
    },
    queue: {
      title: "Queue",
      summary:
        "A queue is like a line of people where the first one goes first.",
      watch: [
        "Enqueue adds to the back",
        "Dequeue removes from the front",
        "The first person waits the least",
      ],
    },
    list: {
      title: "Linked List",
      summary:
        "A linked list connects items like beads on a string so they can be added or removed easily.",
      watch: [
        "Each item points to the next one",
        "Add near the front or back",
        "Move from one item to the next",
      ],
    },
    heap: {
      title: "Heap",
      summary:
        "A heap keeps the biggest value easy to reach at the top.",
      watch: [
        "Insert a value and bubble it upward",
        "Remove the top value",
        "Keep the heap structure correct",
      ],
    },
    hashmap: {
      title: "Hash Map",
      summary:
        "A hash map stores values in buckets so they can be found quickly by a key.",
      watch: [
        "Turn the key into a bucket number",
        "Store the value in that bucket",
        "Look it up using the same key",
      ],
    },
  },
};

function describeStep(section, algorithm, step, index, totalSteps) {
  if (!step) {
    return "Press Start to begin the animation.";
  }

  if (section === "sorting") {
    if (step.action === "compare") {
      return `Step ${index} of ${totalSteps}: We compare two values to see which one should come first.`;
    }
    if (step.action === "swap") {
      return `Step ${index} of ${totalSteps}: A swap is happening now — these values change places to make the list more ordered.`;
    }
    if (step.action === "insert") {
      return `Step ${index} of ${totalSteps}: We place the value into its correct spot.`;
    }
    if (step.action === "write") {
      return `Step ${index} of ${totalSteps}: We write a value into its new place in the sorted piece.`;
    }
    return `Step ${index} of ${totalSteps}: The algorithm is moving the list closer to being sorted.`;
  }

  if (section === "searching") {
    if (step.found !== undefined) {
      return `Step ${index} of ${totalSteps}: We found the target!`;
    }
    return `Step ${index} of ${totalSteps}: We check one value and compare it with the target.`;
  }

  if (section === "graphs") {
    if (step.type === "enqueue") {
      return `Step ${index} of ${totalSteps}: We add a neighbor to the waiting line.`;
    }
    if (step.type === "push") {
      return `Step ${index} of ${totalSteps}: We go deeper and push a neighbor onto the stack.`;
    }
    if (step.type === "relax") {
      return `Step ${index} of ${totalSteps}: We try a shorter path and update the best route if needed.`;
    }
    return `Step ${index} of ${totalSteps}: We visit a node and explore what it connects to.`;
  }

  if (section === "trees") {
    if (typeof step.value === "number") {
      return `Step ${index} of ${totalSteps}: We visit the value ${step.value}.`;
    }
    return `Step ${index} of ${totalSteps}: We follow the tree and move to the next node.`;
  }

  return `Step ${index} of ${totalSteps}: The structure is changing right now.`;
}

function buildReason(section, algorithm, step, index, totalSteps) {
  if (!step) {
    return "The animation has not started yet, so there is no step to explain.";
  }

  if (section === "sorting") {
    if (index === 1) {
      return "We start with the first comparison because it gives the algorithm a simple place to begin and reveals how the list should be rearranged.";
    }
    if (step.action === "compare") {
      return "This comparison helps us decide whether the current pair is already in the correct order or needs to move.";
    }
    if (step.action === "swap") {
      return "This is a swap step: the two values are changing places because the smaller number belongs earlier and the larger one belongs later.";
    }
    if (step.action === "insert") {
      return "We place this value into its correct position because the sorted part is growing one item at a time.";
    }
    if (step.action === "write") {
      return "We write this value into place because the merge step is carefully building the next sorted portion.";
    }
    return "This step moves the list closer to a fully sorted order.";
  }

  if (section === "searching") {
    if (index === 1) {
      return "We begin by checking the first value because the algorithm wants to compare the target with a known starting point.";
    }
    if (step.found !== undefined) {
      return "This is the moment when the chosen value matches the target, so the search can stop.";
    }
    return "We inspect this value because it is the next best candidate in the search path.";
  }

  if (section === "graphs") {
    if (step.type === "enqueue") {
      return "We put this neighbor in the waiting line because it is the next place we want to explore.";
    }
    if (step.type === "push") {
      return "We go deeper here because this path still has more nodes to discover.";
    }
    if (step.type === "relax") {
      return "We update the route because a shorter path was discovered through this connection.";
    }
    return "We visit this node because it is the next important point in the traversal.";
  }

  if (section === "trees") {
    return "We follow this branch because it leads to the next node in the tree walk.";
  }

  return "This step shows how the structure is changing in a clear, visual way.";
}

function AlgorithmExplanationPanel({
  section,
  algorithm,
  steps = [],
  currentStep = 0,
  comparisons = 0,
  swaps = 0,
  target = "",
  status = "",
  arrayLength = 0,
}) {
  const guide = GUIDE_BY_SECTION[section]?.[algorithm] || GUIDE_BY_SECTION.sorting.bubble;
  const totalSteps = steps.length;
  const currentIndex = currentStep > 0 ? currentStep : 0;
  const completed = Math.min(currentIndex, totalSteps);
  const activeStep = steps[Math.max(0, completed - 1)] || null;
  const previewCount = 6;
  const previewStart = Math.max(0, totalSteps - previewCount);
  const previewSteps = steps.slice(previewStart, totalSteps);
  const omitted = previewStart;
  const [showWhy, setShowWhy] = React.useState(false);
  const codeLines = getCodeLines(section, algorithm, activeStep);
  const activeCodeLine = getActiveCodeLine(section, algorithm, activeStep);

  return (
    <div className="w-full rounded-3xl border border-slate-800/80 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/30 xl:max-w-[320px]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-sky-400">
            {SECTION_LABELS[section] || "Algorithm"}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-slate-50">{guide.title}</h3>
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-400">{guide.summary}</p>

      <div className="mt-4 rounded-2xl border border-slate-800/80 bg-slate-900/70 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          What to watch
        </p>
        <ul className="mt-2 space-y-2 text-sm text-slate-300">
          {guide.watch.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
          Current step
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-100">
          {describeStep(section, algorithm, activeStep, completed, totalSteps)}
        </p>
        <div className="mt-3 rounded-xl border border-emerald-500/20 bg-slate-950/60 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
            Why this step?
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {buildReason(section, algorithm, activeStep, completed, totalSteps)}
          </p>
        </div>
        <div className="mt-3 rounded-xl border border-sky-500/20 bg-slate-950/60 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-300">
              Executing code
            </p>
            {activeCodeLine && (
              <span className="rounded-full bg-sky-500/15 px-2 py-1 text-[10px] font-semibold text-sky-200">
                Line {activeCodeLine.number}
              </span>
            )}
          </div>
          <div className="mt-2 space-y-2">
            {codeLines.length > 0 ? (
              codeLines.map((line) => {
                const isActive =
                  activeCodeLine &&
                  line.number === activeCodeLine.number &&
                  line.text === activeCodeLine.text;
                return (
                  <div
                    key={`${line.number}-${line.text}`}
                    className={`rounded-lg border px-2.5 py-2 text-xs ${
                      isActive
                        ? "border-sky-400/60 bg-sky-500/15 text-sky-100"
                        : "border-slate-800/80 bg-slate-900/70 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold ${
                          isActive
                            ? "bg-sky-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {line.number}
                      </span>
                      <span className="font-mono">{line.text}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-400">No pseudocode available for this step yet.</p>
            )}
          </div>
        </div>
        {(section === "sorting" || section === "searching") && (
          <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-300">
            <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
              Comparisons: {comparisons}
            </span>
            <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
              Swaps: {swaps}
            </span>
            {section === "searching" && target !== "" && (
              <span className="rounded-full bg-slate-900/80 px-2.5 py-1">
                Target: {target}
              </span>
            )}
          </div>
        )}
        {section === "sorting" && algorithm === "heap" && arrayLength > 0 && (
          <div className="mt-3 rounded-lg border border-slate-800/80 bg-slate-900/70 p-3 text-sm text-slate-300">
            <p className="font-semibold text-slate-100">Heap special note</p>
            <p className="mt-1">Heap building starts from index {Math.max(0, Math.floor(arrayLength / 2) - 1)} (0-based middle parent) and moves upwards to ensure each subtree becomes a heap.</p>
          </div>
        )}
        {status && <p className="mt-2 text-sm text-emerald-300">{status}</p>}
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Step timeline
        </p>
        <div className="mt-2 text-sm text-slate-300">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-slate-400">Recent steps</div>
            <button
              onClick={() => setShowWhy((s) => !s)}
              className="text-[11px] text-sky-400 hover:underline"
            >
              Why so many steps?
            </button>
          </div>

          {showWhy && (
            <div className="mb-2 rounded-lg bg-slate-900/70 p-3 text-xs text-slate-300">
              Algorithms often show many small steps because we record every compare, swap, and write so you can see the exact work they do. This is normal — some algorithms (like Heap or Merge) break work into many tiny operations.
            </div>
          )}

          <div className="max-h-44 overflow-y-auto space-y-2">
            {previewSteps.length > 0 ? (
              previewSteps.map((step, idx) => {
                const absIndex = previewStart + idx + 1;
                return (
                  <div
                    key={`${absIndex}-${step?.action || step?.type || step?.value || "step"}`}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-2 text-xs"
                  >
                    <div className="font-semibold text-slate-100">Step {absIndex} / {totalSteps}</div>
                    <div className="text-slate-300 mt-1">{describeStep(section, algorithm, step, absIndex, totalSteps)}</div>
                  </div>
                );
              })
            ) : (
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 py-2 text-slate-400">
                The animation has not started yet.
              </div>
            )}
          </div>

          {omitted > 0 && (
            <div className="mt-2 text-[11px] text-slate-400">+{omitted} earlier steps hidden</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AlgorithmExplanationPanel;
