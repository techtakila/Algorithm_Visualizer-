export default function AlgorithmInfo({ algorithm }) {
  if (!algorithm) return null

  return (
    <div className="space-y-4 h-full">
      <div className="control-panel sticky top-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>ℹ️</span> Information
        </h3>

        {algorithm.description && (
          <div className="mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span>📝</span> Description
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {algorithm.description}
            </p>
          </div>
        )}

        {algorithm.complexity && (
          <div className="mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <span>⚡</span> Time & Space Complexity
            </h4>
            <div className="space-y-2 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Time:</span>
                <code className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-200 px-3 py-1 rounded-md font-mono font-bold">
                  {algorithm.complexity.time}
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Space:</span>
                <code className="text-xs bg-green-100 dark:bg-green-900/50 text-green-900 dark:text-green-200 px-3 py-1 rounded-md font-mono font-bold">
                  {algorithm.complexity.space}
                </code>
              </div>
            </div>
          </div>
        )}

        {algorithm.pseudocode && (
          <div className="mb-5 pb-5 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span>💻</span> Pseudocode
            </h4>
            <pre className="code-block text-xs overflow-x-auto whitespace-pre-wrap break-words">
              {algorithm.pseudocode}
            </pre>
          </div>
        )}

        {algorithm.useCases && (
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
              <span>🎯</span> Use Cases
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              {algorithm.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">▸</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
