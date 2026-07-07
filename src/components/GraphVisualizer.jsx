import React, { useEffect, useRef, useState } from "react";
import {
  bfsSteps,
  dfsSteps,
  dijkstraSteps,
  graphToAdjacencyList,
  graphToAdjacencyMatrix,
} from "../algorithms/graph";

const initialNodes = [
  { id: 0, x: 120, y: 80 },
  { id: 1, x: 260, y: 80 },
  { id: 2, x: 80, y: 210 },
  { id: 3, x: 260, y: 210 },
];

const initialEdges = [
  { id: 0, from: 0, to: 1, weight: 1 },
  { id: 1, from: 0, to: 2, weight: 2 },
  { id: 2, from: 1, to: 3, weight: 3 },
  { id: 3, from: 2, to: 3, weight: 1 },
];

const GraphVisualizer = ({
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  onStatsChange = () => {},
  onPlaybackStateChange = () => {},
}) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [startNodeId, setStartNodeId] = useState(0);

  const [fromId, setFromId] = useState(0);
  const [toId, setToId] = useState(1);
  const [weight, setWeight] = useState(1);

  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [running, setRunning] = useState(false);

  const [visited, setVisited] = useState([]);
  const [treeEdges, setTreeEdges] = useState([]);
  const [distances, setDistances] = useState({});
  const [activeNode, setActiveNode] = useState(null);
  const [activeEdge, setActiveEdge] = useState(null);

  const svgRef = useRef(null);
  const intervalRef = useRef(null);
  const [drag, setDrag] = useState(null); // { id, offsetX, offsetY }

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
    setVisited([]);
    setTreeEdges([]);
    setDistances({});
    setActiveNode(null);
    setActiveEdge(null);
    emitPlaybackState([], 0, "");
  };

  const buildGraph = () => ({
    nodes: nodes.map((n) => ({ id: n.id })),
    edges: edges.map((e) => ({ from: e.from, to: e.to, weight: e.weight })),
  });

  const prepareSteps = () => {
    if (!nodes.length) {
      alert("Add at least one node before running a graph algorithm.");
      return [];
    }
    const graph = buildGraph();
    let s = [];
    if (algorithm === "bfs") s = bfsSteps(graph, startNodeId);
    else if (algorithm === "dfs") s = dfsSteps(graph, startNodeId);
    else if (algorithm === "dijkstra") s = dijkstraSteps(graph, startNodeId);
    return s;
  };

  const runStep = () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length) {
        clearInterval(intervalRef.current);
        setRunning(false);
        return prev;
      }

      const step = steps[prev];
      setVisited(step.visited || []);
      setTreeEdges(step.treeEdges || []);
      setActiveNode(step.current ?? null);
      setActiveEdge(step.activeEdge ?? null);
      if (step.distances) {
        setDistances(step.distances);
      }
      const next = prev + 1;
      onStatsChange(next, steps.length);
      emitPlaybackState(steps, next, "");
      return next;
    });
  };

  const handleStart = () => {
    if (running) return;
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps();
      if (!nextSteps || !nextSteps.length) return;
      setSteps(nextSteps);
      setCurrentStep(0);
      setVisited([]);
      setTreeEdges([]);
      setDistances({});
      setActiveNode(null);
      setActiveEdge(null);
      onStatsChange(0, nextSteps.length);
      emitPlaybackState(nextSteps, 0, "");
    }
    setRunning(true);
  };

  const handlePause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const handleStepOnce = () => {
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps();
      if (!nextSteps || !nextSteps.length) return;
      setSteps(nextSteps);
      setCurrentStep(0);
      setVisited([]);
      setTreeEdges([]);
      setDistances({});
      setActiveNode(null);
      setActiveEdge(null);
      onStatsChange(0, nextSteps.length);
      emitPlaybackState(nextSteps, 0, "");
    }
    runStep();
  };

  const handleReset = () => {
    resetPlayback();
    onStatsChange(0, 0);
  };

  const handleAddNode = () => {
    const nextId =
      nodes.length === 0
        ? 0
        : Math.max(...nodes.map((n) => Number(n.id))) + 1;
    const newNode = { id: nextId, x: 200, y: 150 };
    setNodes((prev) => [...prev, newNode]);
    if (nodes.length === 0) {
      setStartNodeId(nextId);
      setFromId(nextId);
      setToId(nextId);
    }
    resetPlayback();
    onStatsChange(0, 0);
  };

  const handleAddEdge = (e) => {
    e.preventDefault();
    if (fromId === toId) {
      alert("Edge must connect two different nodes.");
      return;
    }
    const fromExists = nodes.some((n) => n.id === fromId);
    const toExists = nodes.some((n) => n.id === toId);
    if (!fromExists || !toExists) {
      alert("Please select valid nodes for the edge.");
      return;
    }
    const parsedWeight = Number(weight);
    const w = Number.isFinite(parsedWeight) && parsedWeight > 0 ? parsedWeight : 1;
    const newEdge = {
      id: edges.length ? Math.max(...edges.map((e) => e.id)) + 1 : 0,
      from: fromId,
      to: toId,
      weight: w,
    };
    setEdges((prev) => [...prev, newEdge]);
    resetPlayback();
    onStatsChange(0, 0);
  };

  const handleClearGraph = () => {
    setNodes([]);
    setEdges([]);
    setStartNodeId(null);
    resetPlayback();
    onStatsChange(0, 0);
  };

  const handleMouseDownNode = (id, event) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const node = nodes.find((n) => n.id === id);
    if (!node) return;
    setDrag({
      id,
      offsetX: x - node.x,
      offsetY: y - node.y,
    });
  };

  const handleMouseMove = (event) => {
    if (!drag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setNodes((prev) =>
      prev.map((n) =>
        n.id === drag.id
          ? {
              ...n,
              x: Math.max(20, Math.min(rect.width - 20, x - drag.offsetX)),
              y: Math.max(20, Math.min(rect.height - 20, y - drag.offsetY)),
            }
          : n
      )
    );
  };

  const handleMouseUp = () => {
    setDrag(null);
  };

  const isTreeEdge = (from, to) =>
    treeEdges.some(
      (e) =>
        (e.from === from && e.to === to) || (e.from === to && e.to === from)
    );

  const simpleGraph = buildGraph();
  const adjacencyList = graphToAdjacencyList(simpleGraph);
  const { ids: matrixIds, matrix } = graphToAdjacencyMatrix(simpleGraph);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex-1">
        <svg
          ref={svgRef}
          viewBox="0 0 400 280"
          className="h-[280px] w-full rounded-2xl bg-slate-950/60 ring-1 ring-slate-800/80"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Edges */}
          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.from);
            const toNode = nodes.find((n) => n.id === edge.to);
            if (!fromNode || !toNode) return null;

            const isInTree = isTreeEdge(edge.from, edge.to);
            const isActive =
              activeEdge &&
              ((activeEdge.from === edge.from &&
                activeEdge.to === edge.to) ||
                (activeEdge.from === edge.to &&
                  activeEdge.to === edge.from));

            return (
              <g key={edge.id}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  className={`stroke-[1.5] ${
                    isActive
                      ? "stroke-emerald-400"
                      : isInTree
                      ? "stroke-sky-400"
                      : "stroke-slate-700"
                  }`}
                />
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 6}
                  className="select-none text-[10px] fill-slate-300"
                >
                  {edge.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isVisited = visited.includes(node.id);
            const isCurrent = activeNode === node.id;
            const isStart = startNodeId === node.id;
            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseDown={(e) => handleMouseDownNode(node.id, e)}
                className="cursor-pointer"
              >
                <circle
                  r={18}
                  className={`stroke-[1.5] ${
                    isCurrent
                      ? "fill-emerald-500 stroke-emerald-200"
                      : isVisited
                      ? "fill-sky-500 stroke-sky-200"
                      : "fill-slate-800 stroke-slate-500"
                  }`}
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="select-none text-[11px] font-semibold fill-slate-50"
                >
                  {node.id}
                </text>
                {isStart && (
                  <text
                    x={0}
                    y={26}
                    textAnchor="middle"
                    className="select-none text-[9px] font-semibold uppercase tracking-wide fill-amber-300"
                  >
                    start
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex w-full flex-col gap-3 rounded-2xl bg-slate-950/70 p-3 ring-1 ring-slate-800/80 lg:w-64">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Graph Controls
          </p>
          <p className="text-[11px] text-slate-400">
            Add nodes and edges, drag them around, then animate a traversal.
          </p>
        </div>

        <div className="space-y-2 text-xs">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Algorithm
            </span>
            <select
              value={algorithm}
              onChange={(e) => {
                setAlgorithm(e.target.value);
                resetPlayback();
              }}
              className="rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              <option value="bfs">BFS</option>
              <option value="dfs">DFS</option>
              <option value="dijkstra">Dijkstra</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Start Node
            </span>
            <select
              value={startNodeId ?? ""}
              onChange={(e) => setStartNodeId(Number(e.target.value))}
              className="rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            >
              {nodes.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id}
                </option>
              ))}
            </select>
          </label>

          <form
            onSubmit={handleAddEdge}
            className="mt-1 space-y-2 rounded-xl bg-slate-950/80 p-2 ring-1 ring-slate-800/80"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Add Edge
            </p>
            <div className="flex items-center gap-2">
              <select
                value={fromId}
                onChange={(e) => setFromId(Number(e.target.value))}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-[11px]"
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.id}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-slate-500">→</span>
              <select
                value={toId}
                onChange={(e) => setToId(Number(e.target.value))}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-[11px]"
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                step="1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-16 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-[11px] text-slate-100"
                placeholder="w"
              />
              <button
                type="submit"
                className="flex-1 rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
              >
                Add
              </button>
            </div>
          </form>

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
                onClick={handleReset}
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
          <p className="font-semibold text-slate-200">Distances (Dijkstra)</p>
          {algorithm !== "dijkstra" && (
            <p className="mt-1 text-[10px] text-slate-500">
              Switch to Dijkstra to see shortest path estimates from the start
              node.
            </p>
          )}
          {algorithm === "dijkstra" && (
            <ul className="mt-1 space-y-0.5">
              {nodes.map((n) => (
                <li key={n.id} className="flex justify-between gap-2">
                  <span>dist({n.id})</span>
                  <span className="font-mono">
                    {distances[n.id] === undefined ||
                    distances[n.id] === Infinity
                      ? "∞"
                      : distances[n.id]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-1 rounded-xl bg-slate-950/90 p-2 text-[11px] text-slate-300 ring-1 ring-slate-800/80">
          <p className="font-semibold text-slate-200">Graph Representations</p>
          <p className="mt-1 text-[10px] text-slate-500">
            Current graph as adjacency list and adjacency matrix.
          </p>
          <div className="mt-2 grid gap-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Adjacency List
              </p>
              <pre className="mt-1 max-h-24 overflow-auto rounded-lg bg-slate-950/90 p-2 font-mono text-[10px] text-slate-200">
{Object.keys(adjacencyList).map((id) => {
  const neighbors = adjacencyList[id]
    .map((n) => `${n.to}${n.weight !== 1 ? `(${n.weight})` : ""}`)
    .join(", ");
  return `${id}: [${neighbors}]`;
}).join("\n") || "∅"}
              </pre>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Adjacency Matrix
              </p>
              <pre className="mt-1 max-h-24 overflow-auto rounded-lg bg-slate-950/90 p-2 font-mono text-[10px] text-slate-200">
{matrixIds.length === 0
  ? "∅"
  : [
      "   " + matrixIds.join("  "),
      ...matrix.map((row, i) => {
        const label = matrixIds[i];
        const values = row
          .map((v) => (v === Infinity ? "∞" : String(v)))
          .join("  ");
        return `${label}: ${values}`;
      }),
    ].join("\n")}
              </pre>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddNode}
          className="mt-1 w-full rounded-full border border-dashed border-slate-600/80 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-200 hover:border-sky-500/80 hover:text-sky-200"
        >
          Add Node
        </button>
        <button
          type="button"
          onClick={handleClearGraph}
          className="w-full rounded-full border border-transparent bg-rose-900/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-200 hover:bg-rose-800/80"
        >
          Clear Graph
        </button>
      </div>
    </div>
  );
};

export default GraphVisualizer;
