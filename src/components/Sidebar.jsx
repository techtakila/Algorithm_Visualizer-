import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ALGORITHM_CATEGORIES } from '../algorithms/algorithmRegistry'

export default function Sidebar({ isOpen, setIsOpen, selectedAlgorithm, setSelectedAlgorithm }) {
  const [expandedCategories, setExpandedCategories] = useState({
    'sorting': true,
    'searching': true,
    'greedy': false,
    'dynamic-programming': false,
    'divide-conquer': false,
    'backtracking': false,
    'branch-bound': false,
    'brute-force': false
  })

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const handleAlgorithmSelect = (algorithmId) => {
    setSelectedAlgorithm(algorithmId)
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-16 left-4 z-40 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-20 top-16"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 absolute md:relative w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto z-30 h-[calc(100%-64px)] md:h-full shadow-lg md:shadow-none`}>
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span>📚 Algorithms</span>
          </h2>
          
          <div className="space-y-1">
            {Object.entries(ALGORITHM_CATEGORIES).map(([categoryKey, category]) => (
              <div key={categoryKey}>
                <button
                  onClick={() => toggleCategory(categoryKey)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white font-medium text-sm"
                >
                  <span>{category.name}</span>
                  {expandedCategories[categoryKey] ? (
                    <ChevronDown className="w-4 h-4 text-blue-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {expandedCategories[categoryKey] && (
                  <div className="ml-4 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                    {category.algorithms.map(algo => (
                      <button
                        key={algo.id}
                        onClick={() => handleAlgorithmSelect(algo.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                          selectedAlgorithm === algo.id
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {algo.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}