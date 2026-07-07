// Graph algorithms work with a simple graph representation:
// {
//   nodes: [{ id: string | number }, ...],
//   edges: [{ from: id, to: id, weight?: number }, ...]  // treated as undirected
// }

function buildAdjacency(graph) {
  const adj = new Map();
  graph.nodes.forEach((n) => {
    adj.set(n.id, []);
  });

  graph.edges.forEach((e) => {
    const weight = typeof e.weight === "number" ? e.weight : 1;
    if (!adj.has(e.from)) adj.set(e.from, []);
    if (!adj.has(e.to)) adj.set(e.to, []);
    adj.get(e.from).push({ to: e.to, weight });
    adj.get(e.to).push({ to: e.from, weight });
  });

  // Deterministic traversal
  for (const [key, list] of adj.entries()) {
    list.sort((a, b) => {
      if (a.to < b.to) return -1;
      if (a.to > b.to) return 1;
      return 0;
    });
  }

  return adj;
}

export function graphToAdjacencyList(graph) {
  const adj = buildAdjacency(graph);
  const result = {};
  const ids = graph.nodes.map((n) => n.id).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  ids.forEach((id) => {
    const neighbors = (adj.get(id) || []).map((n) => ({
      to: n.to,
      weight: n.weight,
    }));
    result[id] = neighbors;
  });
  return result;
}

export function graphToAdjacencyMatrix(graph) {
  const ids = graph.nodes.map((n) => n.id).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  const indexById = new Map();
  ids.forEach((id, idx) => indexById.set(id, idx));

  const size = ids.length;
  const matrix = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Infinity)
  );

  for (let i = 0; i < size; i++) {
    matrix[i][i] = 0;
  }

  const adj = graphToAdjacencyList(graph);
  ids.forEach((id, i) => {
    (adj[id] || []).forEach((neighbor) => {
      const j = indexById.get(neighbor.to);
      matrix[i][j] = neighbor.weight ?? 1;
    });
  });

  return { ids, matrix };
}

export function bfsSteps(graph, startId) {
  if (!graph.nodes.length) return [];

  const adj = buildAdjacency(graph);
  const steps = [];
  const visited = new Set();
  const queue = [startId];
  const treeEdges = [];

  while (queue.length) {
    const node = queue.shift();
    if (visited.has(node)) continue;

    visited.add(node);
    steps.push({
      type: "visit",
      current: node,
      visited: Array.from(visited),
      frontier: [...queue],
      treeEdges: [...treeEdges],
      codeLineKey: "visit",
    });

    const neighbors = adj.get(node) || [];
    for (const { to } of neighbors) {
      if (!visited.has(to)) {
        queue.push(to);
        treeEdges.push({ from: node, to });
        steps.push({
          type: "enqueue",
          current: node,
          next: to,
          visited: Array.from(visited),
          frontier: [...queue],
          treeEdges: [...treeEdges],
          codeLineKey: "enqueue",
        });
      }
    }
  }

  return steps;
}

export function dfsSteps(graph, startId) {
  if (!graph.nodes.length) return [];

  const adj = buildAdjacency(graph);
  const steps = [];
  const visited = new Set();
  const stack = [startId];
  const treeEdges = [];

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    steps.push({
      type: "visit",
      current: node,
      visited: Array.from(visited),
      frontier: [...stack],
      treeEdges: [...treeEdges],
      codeLineKey: "visit",
    });

    const neighbors = (adj.get(node) || []).slice().reverse();
    for (const { to } of neighbors) {
      if (!visited.has(to)) {
        stack.push(to);
        treeEdges.push({ from: node, to });
        steps.push({
          type: "push",
          current: node,
          next: to,
          visited: Array.from(visited),
          frontier: [...stack],
          treeEdges: [...treeEdges],
          codeLineKey: "push",
        });
      }
    }
  }

  return steps;
}

export function dijkstraSteps(graph, startId) {
  if (!graph.nodes.length) return [];

  const adj = buildAdjacency(graph);
  const steps = [];
  const dist = new Map();
  const visited = new Set();
  const treeEdges = [];

  graph.nodes.forEach((n) => {
    dist.set(n.id, Infinity);
  });
  dist.set(startId, 0);

  function snapshot(current, activeEdge) {
    const distancesObj = {};
    dist.forEach((v, k) => {
      distancesObj[k] = v;
    });
    steps.push({
      type: "relax",
      current,
      activeEdge,
      visited: Array.from(visited),
      distances: distancesObj,
      treeEdges: [...treeEdges],
      codeLineKey: "relax",
    });
  }

  // Simple O(V^2) Dijkstra for small interactive graphs
  while (visited.size < graph.nodes.length) {
    let u = null;
    let minDist = Infinity;
    for (const node of graph.nodes) {
      if (visited.has(node.id)) continue;
      const d = dist.get(node.id);
      if (d < minDist) {
        minDist = d;
        u = node.id;
      }
    }

    if (u === null || minDist === Infinity) break;

    visited.add(u);
    snapshot(u, null);

    const neighbors = adj.get(u) || [];
    for (const { to, weight } of neighbors) {
      if (visited.has(to)) continue;
      const alt = dist.get(u) + weight;
      if (alt < dist.get(to)) {
        dist.set(to, alt);
        treeEdges.push({ from: u, to });
        snapshot(u, { from: u, to });
      }
    }
  }

  return steps;
}