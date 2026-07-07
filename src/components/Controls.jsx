import React from "react";

function Controls({
  algorithm,
  setAlgorithm,
  size,
  setSize,
  speed,
  setSpeed,
  start,
  pause,
  step,
  reset,
  target,
  setTarget,
  isSearching,
  setCustomArray,
  disableControls = false,
  isRunning = false,
  section = "sorting",
}) {
  const handleCustomArray = (e) => {
    const value = e.target.value;
    const arr = value
      .split(",")
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v));

    if (arr.length > 0) setCustomArray(arr);
  };

  const algorithmOptions =
    section === "searching"
      ? [
          { value: "linear", label: "Linear Search" },
          { value: "binary", label: "Binary Search" },
        ]
      : [
          { value: "bubble", label: "Bubble Sort" },
          { value: "selection", label: "Selection Sort" },
          { value: "insertion", label: "Insertion Sort" },
          { value: "merge", label: "Merge Sort" },
          { value: "quick", label: "Quick Sort" },
          { value: "heap", label: "Heap Sort" },
        ];

  return (
    <div className="controls-panel">
      <div className="control-row">
        <label>Algorithm</label>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={disableControls || isRunning}
        >
          {algorithmOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="control-row">
        <label>Array Size</label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="5"
            max="30"
            value={size}
            disabled={disableControls || isRunning}
            onChange={(e) => setSize(Number(e.target.value))}
          />
          <div className="ml-auto text-sm font-mono text-slate-200">{size}</div>
        </div>
      </div>

      <div className="control-row">
        <label>Speed</label>
        <input
          type="range"
          min="100"
          max="3000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      <div className="control-row">
        <label>Custom Array</label>
        <input
          type="text"
          placeholder="e.g. 10,5,8,3 (any length)"
          disabled={disableControls || isRunning}
          onBlur={handleCustomArray}
        />
      </div>

      {isSearching && (
        <div className="control-row">
          <label>Search Target</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
        </div>
      )}

      <div className="buttons">
        <button disabled={disableControls || isRunning} onClick={start}>
          Start
        </button>
        <button disabled={!isRunning} onClick={pause}>
          Pause
        </button>
        <button disabled={isRunning} onClick={step}>
          Step
        </button>
        <button disabled={isRunning} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Controls;