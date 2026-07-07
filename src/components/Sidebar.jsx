import {
  Binary,
  Blocks,
  BrainCircuit,
  ChevronDown,
  ChevronRight,
  GitBranch,
  Layers3,
  Menu,
  Route,
  Search,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { ALGORITHM_CATEGORIES } from '../algorithms/algorithmRegistry'

const categoryIcons = {
  sorting: Blocks,
  searching: Search,
  greedy: Route,
  'dynamic-programming': BrainCircuit,
  'divide-conquer': GitBranch,
  backtracking: Layers3,
  'branch-bound': Binary,
  'brute-force': Blocks,
}

export default function Sidebar({ isOpen, setIsOpen, selectedAlgorithm, setSelectedAlgorithm }) {
  const [expandedCategories, setExpandedCategories] = useState({
    sorting: true,
    searching: true,
    greedy: true,
    'dynamic-programming': true,
    'divide-conquer': false,
    backtracking: false,
    'branch-bound': false,
    'brute-force': false,
  })

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const handleAlgorithmSelect = (algorithmId) => {
    setSelectedAlgorithm(algorithmId)
    if (window.innerWidth < 768) setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-20 z-40 rounded-lg bg-cyan-600 p-2 text-white shadow-lg transition hover:bg-cyan-700 md:hidden"
        title="Toggle algorithm navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-20 bg-slate-950/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } absolute z-30 h-[calc(100%-64px)] w-72 overflow-y-auto border-r border-slate-200 bg-white/95 shadow-xl backdrop-blur transition-transform duration-300 dark:border-slate-800 dark:bg-slate-950/95 md:relative md:h-full md:translate-x-0 md:shadow-none`}
      >
        <div className="p-5">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Library
            </p>
            <h2 className="mt-1 text-lg font-bold text-slate-950 dark:text-white">
              Algorithms
            </h2>
          </div>

          <div className="space-y-2">
            {Object.entries(ALGORITHM_CATEGORIES).map(([categoryKey, category]) => {
              const Icon = categoryIcons[categoryKey] || Blocks
              return (
                <div key={categoryKey}>
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0 text-cyan-700 dark:text-cyan-300" />
                      <span className="truncate">{category.name}</span>
                    </span>
                    {expandedCategories[categoryKey] ? (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-500" />
                    )}
                  </button>

                  {expandedCategories[categoryKey] && (
                    <div className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-2 dark:border-slate-800">
                      {category.algorithms.map((algo) => (
                        <button
                          key={algo.id}
                          onClick={() => handleAlgorithmSelect(algo.id)}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                            selectedAlgorithm === algo.id
                              ? 'bg-cyan-600 text-white shadow-sm'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                          }`}
                        >
                          {algo.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
