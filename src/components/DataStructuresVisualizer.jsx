import React, { useState } from "react";

const STRUCTURES = ["array", "stack", "queue", "list", "heap", "hashmap"];

function DataStructuresVisualizer({ structureKey, setStructureKey }) {
  const [arrayValues, setArrayValues] = useState([3, 7, 1, 9]);
  const [arrayValueInput, setArrayValueInput] = useState("");
  const [arrayIndexInput, setArrayIndexInput] = useState("");

  const [stackValues, setStackValues] = useState([]);
  const [stackInput, setStackInput] = useState("");

  const [queueValues, setQueueValues] = useState([]);
  const [queueInput, setQueueInput] = useState("");

  const [listValues, setListValues] = useState([]);
  const [listInput, setListInput] = useState("");

  const [heapValues, setHeapValues] = useState([]);
  const [heapInput, setHeapInput] = useState("");

  const [hashBuckets, setHashBuckets] = useState(
    Array.from({ length: 7 }, () => [])
  );
  const [hashKey, setHashKey] = useState("");
  const [hashValue, setHashValue] = useState("");

  const active = STRUCTURES.includes(structureKey)
    ? structureKey
    : "array";

  const handleChangeStructure = (next) => {
    setStructureKey(next);
  };

  // Simple helpers
  const parseIndex = (text) => {
    const n = Number(text);
    return Number.isInteger(n) && n >= 0 ? n : null;
  };

  const hashFn = (key) => {
    if (!key) return 0;
    let sum = 0;
    for (let i = 0; i < key.length; i++) sum += key.charCodeAt(i);
    return sum % hashBuckets.length;
  };

  // Array operations
  const handleArrayInsert = () => {
    const v = Number(arrayValueInput);
    if (!Number.isFinite(v)) return;
    const idx = parseIndex(arrayIndexInput);
    if (idx == null || idx > arrayValues.length) {
      setArrayValues((prev) => [...prev, v]);
    } else {
      setArrayValues((prev) => [
        ...prev.slice(0, idx),
        v,
        ...prev.slice(idx),
      ]);
    }
    setArrayValueInput("");
    setArrayIndexInput("");
  };

  const handleArrayRemove = () => {
    const idx = parseIndex(arrayIndexInput);
    if (idx == null || idx >= arrayValues.length) return;
    setArrayValues((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    setArrayIndexInput("");
  };

  // Stack
  const handleStackPush = () => {
    if (!stackInput) return;
    setStackValues((prev) => [...prev, stackInput]);
    setStackInput("");
  };
  const handleStackPop = () => {
    setStackValues((prev) => prev.slice(0, -1));
  };

  // Queue
  const handleQueueEnqueue = () => {
    if (!queueInput) return;
    setQueueValues((prev) => [...prev, queueInput]);
    setQueueInput("");
  };
  const handleQueueDequeue = () => {
    setQueueValues((prev) => prev.slice(1));
  };

  // Linked list (represented as array, operations at head/tail)
  const handleListPushBack = () => {
    if (!listInput) return;
    setListValues((prev) => [...prev, listInput]);
    setListInput("");
  };
  const handleListPushFront = () => {
    if (!listInput) return;
    setListValues((prev) => [listInput, ...prev]);
    setListInput("");
  };
  const handleListPopFront = () => {
    setListValues((prev) => prev.slice(1));
  };

  // Heap (simple max-heap)
  const heapifyUp = (arr, idx) => {
    let i = idx;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (arr[p] >= arr[i]) break;
      [arr[p], arr[i]] = [arr[i], arr[p]];
      i = p;
    }
  };
  const heapifyDown = (arr, idx) => {
    let i = idx;
    const n = arr.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let largest = i;
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
      if (largest === i) break;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      i = largest;
    }
  };
  const handleHeapInsert = () => {
    const v = Number(heapInput);
    if (!Number.isFinite(v)) return;
    setHeapValues((prev) => {
      const next = [...prev, v];
      heapifyUp(next, next.length - 1);
      return next;
    });
    setHeapInput("");
  };
  const handleHeapExtract = () => {
    setHeapValues((prev) => {
      if (!prev.length) return prev;
      const next = [...prev];
      const n = next.length;
      [next[0], next[n - 1]] = [next[n - 1], next[0]];
      next.pop();
      if (next.length) heapifyDown(next, 0);
      return next;
    });
  };

  // Hash map (key -> value, separate chaining)
  const handleHashPut = () => {
    if (!hashKey) return;
    const bucketIndex = hashFn(hashKey);
    setHashBuckets((prev) => {
      const next = prev.map((b) => [...b]);
      const bucket = next[bucketIndex];
      const existingIndex = bucket.findIndex((p) => p.key === hashKey);
      if (existingIndex >= 0) {
        bucket[existingIndex] = { key: hashKey, value: hashValue };
      } else {
        bucket.push({ key: hashKey, value: hashValue });
      }
      return next;
    });
    setHashValue("");
  };
  const handleHashRemove = () => {
    if (!hashKey) return;
    const bucketIndex = hashFn(hashKey);
    setHashBuckets((prev) => {
      const next = prev.map((b) => [...b]);
      next[bucketIndex] = next[bucketIndex].filter((p) => p.key !== hashKey);
      return next;
    });
  };

  const renderArray = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400">
        A contiguous block of memory where each element has an index and can be
        accessed in O(1) time.
      </p>
      <div className="flex flex-wrap items-end gap-3 text-xs">
        <div className="space-y-1">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Value
            </span>
            <input
              type="number"
              className="w-28 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              value={arrayValueInput}
              onChange={(e) => setArrayValueInput(e.target.value)}
            />
          </label>
        </div>
        <div className="space-y-1">
          <label className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Index (optional)
            </span>
            <input
              type="number"
              className="w-24 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              value={arrayIndexInput}
              onChange={(e) => setArrayIndexInput(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleArrayInsert}
            className="rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={handleArrayRemove}
            className="rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-600"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1 rounded-2xl bg-slate-950/80 p-2 ring-1 ring-slate-800/80">
        {arrayValues.map((v, i) => (
          <div
            key={i}
            className="flex min-w-[48px] flex-col items-center rounded-xl border border-slate-700/80 bg-slate-900/80 px-2 py-1"
          >
            <span className="text-[10px] text-slate-400">[{i}]</span>
            <span className="mt-0.5 text-xs font-mono text-slate-100">{v}</span>
          </div>
        ))}
        {arrayValues.length === 0 && (
          <span className="text-[11px] text-slate-500">Array is empty.</span>
        )}
      </div>
    </div>
  );

  const renderStack = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400">
        LIFO (last-in, first-out) structure. Only the top element can be
        pushed/popped.
      </p>
      <div className="flex flex-wrap items-end gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Value
          </span>
          <input
            type="text"
            className="w-32 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleStackPush}
            className="rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            Push
          </button>
          <button
            type="button"
            onClick={handleStackPop}
            className="rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-600"
          >
            Pop
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-col items-center gap-1 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
        {stackValues
          .slice()
          .reverse()
          .map((v, idx) => (
            <div
              key={stackValues.length - 1 - idx}
              className={`flex w-32 items-center justify-center rounded-lg border px-2 py-1 text-xs font-mono ${
                idx === 0
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-100"
                  : "border-slate-700 bg-slate-900/80 text-slate-100"
              }`}
            >
              {v}
            </div>
          ))}
        {stackValues.length === 0 && (
          <span className="text-[11px] text-slate-500">Stack is empty.</span>
        )}
        <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Top
        </span>
      </div>
    </div>
  );

  const renderQueue = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400">
        FIFO (first-in, first-out) structure. Elements enter at the rear and
        leave from the front.
      </p>
      <div className="flex flex-wrap items-end gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Value
          </span>
          <input
            type="text"
            className="w-32 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={queueInput}
            onChange={(e) => setQueueInput(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleQueueEnqueue}
            className="rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            Enqueue
          </button>
          <button
            type="button"
            onClick={handleQueueDequeue}
            className="rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-600"
          >
            Dequeue
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-500">Front →</span>
          <div className="flex flex-1 flex-wrap gap-1">
            {queueValues.map((v, i) => (
              <div
                key={i}
                className="flex min-w-[52px] flex-col items-center rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1"
              >
                <span className="text-[10px] text-slate-400">[{i}]</span>
                <span className="mt-0.5 text-xs font-mono text-slate-100">
                  {v}
                </span>
              </div>
            ))}
            {queueValues.length === 0 && (
              <span className="text-[11px] text-slate-500">
                Queue is empty.
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">← Rear</span>
        </div>
      </div>
    </div>
  );

  const renderList = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400">
        Singly linked list represented as a chain of nodes connected by
        pointers, stored non-contiguously.
      </p>
      <div className="flex flex-wrap items-end gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Value
          </span>
          <input
            type="text"
            className="w-32 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={listInput}
            onChange={(e) => setListInput(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleListPushFront}
            className="rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            Push Front
          </button>
          <button
            type="button"
            onClick={handleListPushBack}
            className="rounded-full bg-sky-500 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-400"
          >
            Push Back
          </button>
          <button
            type="button"
            onClick={handleListPopFront}
            className="rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-600"
          >
            Pop Front
          </button>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1 rounded-2xl bg-slate-950/80 p-3 ring-1 ring-slate-800/80">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-500">Head</span>
          <div className="flex flex-1 flex-wrap items-center gap-1">
            {listValues.map((v, i) => (
              <React.Fragment key={i}>
                <div className="flex min-w-[60px] flex-col items-center rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1">
                  <span className="text-[10px] text-slate-400">Node</span>
                  <span className="mt-0.5 text-xs font-mono text-slate-100">
                    {v}
                  </span>
                </div>
                {i < listValues.length - 1 && (
                  <span className="text-[14px] text-slate-500">→</span>
                )}
              </React.Fragment>
            ))}
            {listValues.length === 0 && (
              <span className="text-[11px] text-slate-500">
                List is empty (null).
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">null</span>
        </div>
      </div>
    </div>
  );

  const renderHeap = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400">
        Binary max-heap stored in an array. Each parent is greater than or equal
        to its children.
      </p>
      <div className="flex flex-wrap items-end gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Value
          </span>
          <input
            type="number"
            className="w-28 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={heapInput}
            onChange={(e) => setHeapInput(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleHeapInsert}
            className="rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={handleHeapExtract}
            className="rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-600"
          >
            Extract Max
          </button>
        </div>
      </div>

      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-950/80 p-2 ring-1 ring-slate-800/80">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Array Storage
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {heapValues.map((v, i) => (
              <div
                key={i}
                className="flex min-w-[48px] flex-col items-center rounded-lg border border-slate-700 bg-slate-900/80 px-2 py-1"
              >
                <span className="text-[10px] text-slate-400">[{i}]</span>
                <span className="mt-0.5 text-xs font-mono text-slate-100">
                  {v}
                </span>
              </div>
            ))}
            {heapValues.length === 0 && (
              <span className="text-[11px] text-slate-500">
                Heap is empty.
              </span>
            )}
          </div>
        </div>
        <div className="rounded-2xl bg-slate-950/80 p-2 ring-1 ring-slate-800/80">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Index Relationships
          </p>
          <pre className="mt-1 max-h-24 overflow-auto whitespace-pre-wrap font-mono text-[10px] text-slate-200">
            parent(i) = floor((i - 1) / 2)
{"\n"}
            left(i) = 2i + 1, right(i) = 2i + 2
          </pre>
        </div>
      </div>
    </div>
  );

  const renderHashMap = () => (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-slate-400">
        Hash map using separate chaining. Keys are hashed into buckets; each
        bucket stores a small linked list of key-value pairs.
      </p>
      <div className="flex flex-wrap items-end gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Key
          </span>
          <input
            type="text"
            className="w-32 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={hashKey}
            onChange={(e) => setHashKey(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Value
          </span>
          <input
            type="text"
            className="w-32 rounded-lg border border-slate-700 bg-slate-900/90 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={hashValue}
            onChange={(e) => setHashValue(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleHashPut}
            className="rounded-full bg-sky-600 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-500"
          >
            Put
          </button>
          <button
            type="button"
            onClick={handleHashRemove}
            className="rounded-full bg-rose-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-rose-50 hover:bg-rose-600"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-950/80 p-2 ring-1 ring-slate-800/80">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Buckets
          </p>
          <div className="mt-1 space-y-1 font-mono text-[10px] text-slate-200">
            {hashBuckets.map((bucket, i) => (
              <div key={i} className="flex gap-1">
                <span className="text-slate-500">{i}:</span>
                {bucket.length === 0 ? (
                  <span className="text-slate-600">∅</span>
                ) : (
                  <span>
                    {bucket
                      .map((p) => `${p.key} → ${p.value ?? "null"}`)
                      .join(" , ")}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-slate-950/80 p-2 ring-1 ring-slate-800/80">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Hash Function
          </p>
          <p className="mt-1 text-[10px] text-slate-300">
            This demo uses a simple hash: sum of character codes of the key,
            modulo the number of buckets.
          </p>
        </div>
      </div>
    </div>
  );

  let content;
  if (active === "array") content = renderArray();
  else if (active === "stack") content = renderStack();
  else if (active === "queue") content = renderQueue();
  else if (active === "list") content = renderList();
  else if (active === "heap") content = renderHeap();
  else content = renderHashMap(); // hashmap or map

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-3 text-xs">
        <label className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Data Structure
          </span>
          <select
            value={active}
            onChange={(e) => handleChangeStructure(e.target.value)}
            className="w-56 rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-100 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
          >
            <option value="array">Array</option>
            <option value="stack">Stack</option>
            <option value="queue">Queue</option>
            <option value="list">Linked List</option>
            <option value="heap">Heap</option>
            <option value="hashmap">Hash Table / Map</option>
          </select>
        </label>
      </div>

      <div className="rounded-2xl bg-slate-950/70 p-3 ring-1 ring-slate-800/80">
        {content}
      </div>
    </div>
  );
}

export default DataStructuresVisualizer;

