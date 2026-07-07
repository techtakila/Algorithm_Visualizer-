import React, { useState, useEffect, useRef } from "react";
import Bar from "./Bar";
import Controls from "./Controls";
import Sidebar from "./Sidebar";
import GraphVisualizer from "./GraphVisualizer";
import ComplexityPanel from "./ComplexityPanel";
import AlgorithmExplanationPanel from "./AlgorithmExplanationPanel";
import {
  bubbleSortSteps,
  selectionSortSteps,
  insertionSortSteps,
  mergeSortSteps,
  quickSortSteps,
  heapSortSteps,
} from "../algorithms/sorting";
import { linearSearchSteps, binarySearchSteps } from "../algorithms/searching";
import TreeVisualizer from "./TreeVisualizer";
import DataStructuresVisualizer from "./DataStructuresVisualizer";

const Visualizer = () => {
  const [section, setSection] = useState("sorting");
  const [sortingAlgo, setSortingAlgo] = useState("bubble");
  const [searchingAlgo, setSearchingAlgo] = useState("linear");
  const [graphAlgo, setGraphAlgo] = useState("bfs");
  const [treeAlgo, setTreeAlgo] = useState("bst");
  const [structureKey, setStructureKey] = useState("array");

  const algorithm =
    section === "sorting"
      ? sortingAlgo
      : section === "searching"
      ? searchingAlgo
      : section === "graphs"
      ? graphAlgo
      : section === "trees"
      ? treeAlgo
      : structureKey;

  const setAlgorithm = (value) => {
    switch (section) {
      case "sorting":
        setSortingAlgo(value);
        break;
      case "searching":
        setSearchingAlgo(value);
        break;
      case "graphs":
        setGraphAlgo(value);
        break;
      case "trees":
        setTreeAlgo(value);
        break;
      default:
        setStructureKey(value);
    }
  };

  const [array, setArray] = useState([]);
  const [size, setSize] = useState(10);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [active, setActive] = useState([]);
  const [chosenIndex, setChosenIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(2200);
  const [target, setTarget] = useState("");
  const [explanationState, setExplanationState] = useState({
    steps: [],
    currentStep: 0,
    status: "",
  });
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [searchStatus, setSearchStatus] = useState("");

  const intervalRef = useRef(null);

  const isArraySection = section === "sorting" || section === "searching";
  const isSearchingAlgorithm = section === "searching" && (algorithm === "linear" || algorithm === "binary");

  useEffect(() => {
    if (!isArraySection) return;
    generateArray();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    if (isArraySection) {
      generateArray();
    } else {
      resetRunner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useEffect(() => {
    if (!running) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(runStep, speed);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, speed, steps]);

  const resetRunner = () => {
    clearInterval(intervalRef.current);
    setSteps([]);
    setCurrentStep(0);
    setActive([]);
    setChosenIndex(null);
    setFoundIndex(-1);
    setRunning(false);
    setComparisons(0);
    setSwaps(0);
    setSearchStatus("");
  };

  const generateArray = () => {
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setArray(arr);
    resetRunner();
  };

  const setCustomArray = (arr) => {
    if (!Array.isArray(arr) || arr.length === 0) return;
    const cleaned = arr.filter((v) => Number.isFinite(v));
    if (cleaned.length === 0) return;
    setArray(cleaned.slice(0, 200)); // allow large custom arrays (cap at 200)
    resetRunner();
  };

  const prepareSteps = () => {
    if (!isArraySection) return [];
    if (!array.length) return [];

    let s = [];

    if (section === "sorting") {
      if (algorithm === "bubble") s = bubbleSortSteps(array);
      else if (algorithm === "selection") s = selectionSortSteps(array);
      else if (algorithm === "insertion") s = insertionSortSteps(array);
      else if (algorithm === "merge") s = mergeSortSteps(array);
      else if (algorithm === "quick") s = quickSortSteps(array);
      else if (algorithm === "heap") s = heapSortSteps(array);
    } else if (section === "searching") {
      if (target === "" || Number.isNaN(Number(target))) {
        alert("Please enter a valid numeric target value.");
        return [];
      }
      const numericTarget = Number(target);
      if (algorithm === "linear") {
        s = linearSearchSteps(array, numericTarget);
      } else if (algorithm === "binary") {
        const sorted = [...array].sort((a, b) => a - b);
        setArray(sorted);
        s = binarySearchSteps(sorted, numericTarget);
      }
    }

    return s;
  };

  const runStep = () => {
    setCurrentStep((prev) => {
      if (prev >= steps.length) {
        clearInterval(intervalRef.current);
        setRunning(false);
        if (section === "searching" && steps.length > 0) {
          const foundStep = steps.find((st) => st.found !== undefined);
          if (foundStep) {
            setSearchStatus(
              `Found ${target} at index ${foundStep.found} (0-based index).`
            );
          } else {
            setSearchStatus(`Value ${target} was not found in the array.`);
          }
        }
        return prev;
      }

      const step = steps[prev];
      if (step.array) setArray(step.array);
      setActive(step.active || []);

      if (step.found !== undefined) {
        setFoundIndex(step.found);
      }
      if (typeof step.comparisons === "number") {
        setComparisons(step.comparisons);
      }
      if (typeof step.swaps === "number") {
        setSwaps(step.swaps);
      }

      return prev + 1;
    });
  };

  const start = () => {
    if (running) return;
    setSearchStatus("");
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps();
      if (!nextSteps || !nextSteps.length) return;
      setSteps(nextSteps);
      setCurrentStep(0);
      setActive([]);
      setFoundIndex(-1);
      setComparisons(0);
      setSwaps(0);
    }
    setRunning(true);
  };

  const pause = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const stepForward = () => {
    let nextSteps = steps;
    if (!nextSteps.length) {
      nextSteps = prepareSteps();
      if (!nextSteps || !nextSteps.length) return;
      setSteps(nextSteps);
      setCurrentStep(0);
      setActive([]);
      setFoundIndex(-1);
      setComparisons(0);
      setSwaps(0);
    }
    runStep();
  };

  const reset = () => {
    if (isArraySection) {
      generateArray();
    } else {
      resetRunner();
    }
  };

  const handleSectionChange = (nextSection) => {
    if (nextSection === section) return;
    pause();
    setSection(nextSection);
    setSearchStatus("");
  };

  const effectiveAlgorithmKey =
    section === "trees"
      ? algorithm === "avl"
        ? "avl"
        : "bst"
      : section === "structures"
      ? structureKey === "hashmap"
        ? "hash"
        : structureKey === "heap"
        ? "heap-ds"
        : structureKey === "array"
        ? "array-ds"
        : structureKey
      : algorithm;

  const activeStep = steps[Math.max(0, currentStep - 1)] || null;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <Sidebar activeSection={section} onChange={handleSectionChange} />

      <div className="flex flex-1 flex-col gap-4">
        <div className="glass-panel flex flex-1 flex-col gap-4 p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                {section === "sorting"
                  ? "Sorting Visualizer"
                  : section === "searching"
                  ? "Searching Visualizer"
                  : section === "graphs"
                  ? "Graph Algorithms Visualizer"
                  : section === "trees"
                  ? "Tree Visualizer"
                  : "Data Structures Visualizer"}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {section === "sorting" &&
                  "Manipulate the input array and watch how different sorting algorithms reorganize the data step by step."}
                {section === "searching" &&
                  "Provide a target value and see how different search strategies locate it in the array."}
                {section === "graphs" &&
                  "Build a graph interactively and animate BFS, DFS, and Dijkstra traversals."}
                {section === "trees" &&
                  "Insert and delete nodes from binary and AVL search trees and visualize classic traversals."}
                {section === "structures" &&
                  "Interact with fundamental data structures like arrays, stacks, queues, linked lists, heaps, and hash tables."}
              </p>
            </div>
          </div>

          {isArraySection && (
            <div key={section} className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-4 xl:flex-row">
                <div className="flex-1">
                  <Controls
                    algorithm={algorithm}
                    setAlgorithm={setAlgorithm}
                    size={size}
                    setSize={setSize}
                    speed={speed}
                    setSpeed={setSpeed}
                    start={start}
                    pause={pause}
                    step={stepForward}
                    reset={reset}
                    target={target}
                    setTarget={setTarget}
                    isSearching={isSearchingAlgorithm}
                    setCustomArray={setCustomArray}
                    disableControls={false}
                    isRunning={running}
                    section={section}
                  />

                  <div className="mt-4 flex-1 overflow-x-auto">
                    <div className="bar-container min-w-full">
                      {array.map((val, i) => (
                        <Bar
                          key={i}
                          value={val}
                          index={i}
                          active={active.includes(i)}
                          compare={active.includes(i) && activeStep?.action === "compare"}
                          swap={active.includes(i) && activeStep?.action === "swap"}
                          found={i === foundIndex}
                          chosen={chosenIndex === i}
                          onClick={(idx) => setChosenIndex(idx)}
                        />
                      ))}
                    </div>
                  </div>

                  {section === "searching" && searchStatus && (
                    <p className="mt-3 text-center text-xs font-medium text-slate-300">
                      {searchStatus}
                    </p>
                  )}
                </div>

                <AlgorithmExplanationPanel
                  section={section}
                  algorithm={algorithm}
                  steps={steps}
                  currentStep={currentStep}
                  comparisons={comparisons}
                  swaps={swaps}
                  target={target}
                  arrayLength={array.length}
                  status={searchStatus}
                />
              </div>
            </div>
          )}

          {section === "graphs" && (
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="flex-1">
                <GraphVisualizer
                  key="graphs"
                  algorithm={graphAlgo}
                  setAlgorithm={setGraphAlgo}
                  speed={speed}
                  setSpeed={setSpeed}
                  onPlaybackStateChange={setExplanationState}
                />
              </div>
              <AlgorithmExplanationPanel
                section={section}
                algorithm={graphAlgo}
                steps={explanationState.steps}
                currentStep={explanationState.currentStep}
                comparisons={0}
                swaps={0}
                target={target}
                status={explanationState.status}
              />
            </div>
          )}

          {section === "trees" && (
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="flex-1">
                <TreeVisualizer
                  key="trees"
                  algorithm={treeAlgo}
                  setAlgorithm={setTreeAlgo}
                  speed={speed}
                  setSpeed={setSpeed}
                  onPlaybackStateChange={setExplanationState}
                />
              </div>
              <AlgorithmExplanationPanel
                section={section}
                algorithm={treeAlgo}
                steps={explanationState.steps}
                currentStep={explanationState.currentStep}
                comparisons={0}
                swaps={0}
                target={target}
                status={explanationState.status}
              />
            </div>
          )}

          {section === "structures" && (
            <div className="flex flex-col gap-4 xl:flex-row">
              <div className="flex-1">
                <DataStructuresVisualizer
                  key="structures"
                  structureKey={structureKey}
                  setStructureKey={setStructureKey}
                />
              </div>
              <AlgorithmExplanationPanel
                section={section}
                algorithm={structureKey}
                steps={[]}
                currentStep={0}
                comparisons={0}
                swaps={0}
                target={target}
                status=""
              />
            </div>
          )}
        </div>

        <div className="glass-panel p-4 sm:p-5">
          <ComplexityPanel algorithmKey={effectiveAlgorithmKey} />
        </div>
      </div>
    </div>
  );
};

export default Visualizer; 
