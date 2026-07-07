import React, { useEffect, useRef, useState } from "react";
import {
  bstInsert,
  bstDelete,
  avlInsert,
  inorderSteps,
  preorderSteps,
  postorderSteps,
  levelOrderSteps,
  toLevelOrderArray,
} from "../algorithms/tree";

function buildLayout(root, width, levelHeight) {
  const nodes = [];
  const edges = [];

  let xCounter = 0;
  function assign(node, depth, parent) {
    if (!node) return;
    assign(node.left, depth + 1, node);
    const x = ((xCounter + 1) / (countNodes(root) + 1)) * width;
    const y = (depth + 1) * levelHeight;
    nodes.push({ id: node.value, value: node.value, x, y });
    if (parent) {
      edges.push({ from: parent.value, to: node.value });
    }
    xCounter++;
    assign(node.right, depth + 1, node);
  }

  assign(root, 0, null);
  return { nodes, edges };
}

function countNodes(root) {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}

const TreeVisualizer = ({
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  onStatsChange = () => {},
  onPlaybackStateChange = () => {},
}) => {
  const [root, setRoot] = useState(null);
  const [valueInput, setValueInput] = useState("");
  const [traversalType, setTraversalType] = useState("inorder");

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);
  const [activeValue, setActiveValue] = useState(null);
  const [rotations, setRotations] = useState([]);

  const svgRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(runStep, speed);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, speed, steps]);

  const emitPlaybackState = (nextSteps = steps, currentIndex = currentStep, status = "") => {
    onPlaybackStateChange({ steps: nextSteps, currentStep: currentIndex, status });
  };

  const resetPlayback = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSteps([]);
    setCurrentStep(0);
    setActiveValue(null);
    onStatsChange(0, 0);
    emitPlaybackState([], 0, "");
  };

  const handleInsert = () => {
    const value = Number(valueInput);
    if (!Number.isFinite(value)) {
      alert("Please enter a valid numeric value.");
      return;
    }
    setRoot((prev) => {
      if (algorithm === "avl") {
        const events = [];
        const next = avlInsert(prev, value, events);
        setRotations(events);
        return next;
      }
      setRotations([]);
      return bstInsert(prev, value);
    });
    setValueInput("");
    resetPlayback();
  };

  const handleDelete = () => {
    const value = Number(valueInput);
    if (!Number.isFinite(value)) {
      alert("Please enter a valid numeric value.");
      return;
    }
    if (algorithm === "avl") {
      alert("Delete is not implemented for AVL trees in this visualizer yet. Switch to BST mode to experiment with deletions.");
      return;
    }
    setRoot((prev) => bstDelete(prev, value));
    setValueInput("");
    resetPlayback();
  };

  const prepareTraversal = () => {
    if (!root) {
      alert("Insert at least one node into the tree.");
      return;
    }
    let s = [];
    if (traversalType === "inorder") s = inorderSteps(root);
    else if (traversalType === "preorder") s = preorderSteps(root);
    else if (traversalType === "postorder") s = postorderSteps(root);
    else if (traversalType === "level") s = levelOrderSteps(root);
    setSteps(s);
    setCurrentStep(0);
    setActiveValue(null);
    onStatsChange(0, s.length);
  };

  const runStep = () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length) {
        clearInterval(intervalRef.current);
        setRunning(false);
        return prev;
      }
      const step = steps[prev];
      setActiveValue(step.value);
      const next = prev + 1;
      onStatsChange(next, steps.length);
      emitPlaybackState(steps, next, "");
      return next;
    });
  };

  const handleStart = () => {
    if (running) return;
    if (!steps.length) {
      prepareTraversal();
    }
    if (!steps.length) return;
    emitPlaybackState(steps, currentStep, "");
    setRunning(true);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const handleStepOnce = () => {
    if (!steps.length) {
      prepareTraversal();
    }
    if (!steps.length) return;
    emitPlaybackState(steps, currentStep, "");
    runStep();
  };

  const handleResetTraversal = () => {
    resetPlayback();
  };

  const width = 420;
  const height = 260;
  const layout = root ? buildLayout(root, width, 60) : { nodes: [], edges: [] };
  const inorderArr = root ? inorderSteps(root).map((s) => s.value) : [];
  const preorderArr = root ? preorderSteps(root).map((s) => s.value) : [];
  const postorderArr = root ? postorderSteps(root).map((s) => s.value) : [];
  const levelArr = root ? toLevelOrderArray(root) : [];

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="h-[260px] w-full rounded-2xl bg-slate-950/60 ring-1 ring-slate-800/80"
        >
          {layout.edges.map((edge) => {
            const fromNode = layout.nodes.find((n) => n.id === edge.from);
            const toNode = layout.nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            return (
              <line
                key={`${edge.from}-${edge.to}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                className="stroke-slate-700 stroke-[1.5]"
              />
            );
          })}

          {layout.nodes.map((node) => {
            const isActive = activeValue === node.value;
            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                <circle
                  r={16}
                  className={`stroke-[1.5] ${
                    isActive
                      ? "fill-emerald-500 stroke-emerald-200"
                      : "fill-slate-800 stroke-slate-500"
                  }`}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="select-none text-[11px] font-semibold fill-slate-50"
                >
                  {node.value}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-2xl bg-slate-950/70 p-3 ring-1 ring-slate-800/80 lg:w-64">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Tree Controls
          </p>
          <p className="text-[11px] text-slate-400">
            Build a binary search tree and animate classic traversals.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Tree Type
            </span>
            <select
              value={algorithm === "avl" ? "avl" : "bst"}
              onChange={(e) => {
                setAlgorithm(e.target.value);
                setRoot(null);
                resetPlayback();
              }}
              className="rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="bst">Binary Search Tree (BST)</option>
              <option value="avl">AVL Tree (Self-balancing)</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Value
            </span>
            <input
              type="number"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              placeholder="e.g. 10"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleInsert}
              className="rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={algorithm === "avl"}
              className="rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-600"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {
                setRoot(null);
                resetPlayback();
              }}
              className="rounded-full bg-slate-800 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-700"
            >
              Clear
            </button>
          </div>

          <label className="mt-2 flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Traversal
            </span>
            <select
              value={traversalType}
              onChange={(e) => {
                setTraversalType(e.target.value);
                resetPlayback();
              }}
              className="rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="inorder">Inorder</option>
              <option value="preorder">Preorder</option>
              <option value="postorder">Postorder</option>
              <option value="level">Level Order</option>
            </select>
          </label>

          <div className="mt-1 space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Playback
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleStart}
                disabled={running}
                className="rounded-full bg-emerald-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start
              </button>
              <button
                type="button"
                onClick={handlePause}
                disabled={!running}
                className="rounded-full bg-amber-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Pause
              </button>
              <button
                type="button"
                onClick={handleStepOnce}
                disabled={running}
                className="rounded-full bg-slate-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Step
              </button>
              <button
                type="button"
                onClick={handleResetTraversal}
                className="rounded-full bg-slate-800 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-100 hover:bg-slate-700"
              >
                Reset
              </button>
            </div>
            <label className="mt-2 flex flex-col gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Speed
              </span>
              <input
                type="range"
                min="100"
                max="3000"
                step="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="accent-sky-500"
              />
            </label>
          </div>
        </div>

        <div className="mt-1 rounded-xl bg-slate-950/90 p-2 text-[11px] text-slate-300 ring-1 ring-slate-800/80">
          <p className="font-semibold text-slate-200">Tree Representations</p>
          {!root && (
            <p className="mt-1 text-[10px] text-slate-500">
              Insert a few values to see array and traversal representations.
            </p>
          )}
          {root && (
            <ul className="mt-1 space-y-1">
              <li>
                <span className="font-semibold text-slate-200">Level-order:</span>{" "}
                <span className="font-mono text-[10px]">
                  [{levelArr.join(", ")}]
                </span>
              </li>
              <li>
                <span className="font-semibold text-slate-200">Inorder:</span>{" "}
                <span className="font-mono text-[10px]">
                  [{inorderArr.join(", ")}]
                </span>
              </li>
              <li>
                <span className="font-semibold text-slate-200">Preorder:</span>{" "}
                <span className="font-mono text-[10px]">
                  [{preorderArr.join(", ")}]
                </span>
              </li>
              <li>
                <span className="font-semibold text-slate-200">Postorder:</span>{" "}
                <span className="font-mono text-[10px]">
                  [{postorderArr.join(", ")}]
                </span>
              </li>
            </ul>
          )}
        </div>

        {algorithm === "avl" && (
          <div className="mt-1 rounded-xl bg-slate-950/90 p-2 text-[11px] text-slate-300 ring-1 ring-slate-800/80">
            <p className="font-semibold text-slate-200">AVL Rotations (last insert)</p>
            {rotations.length === 0 ? (
              <p className="mt-1 text-[10px] text-slate-500">
                Insert a value that causes imbalance to see LL, LR, RR, or RL rotations
                logged here.
              </p>
            ) : (
              <ul className="mt-1 space-y-0.5">
                {rotations.map((r, idx) => (
                  <li key={idx} className="flex justify-between gap-2">
                    <span className="font-mono text-[10px]">
                      {idx + 1}. {r.type} rotation
                    </span>
                    <span className="text-[10px] text-slate-400">
                      at node {r.pivot}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeVisualizer;

