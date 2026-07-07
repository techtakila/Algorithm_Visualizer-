export default function AlgorithmInfo({ algorithm }) {
  if (!algorithm) return null

  return (
    <div className="space-y-4">
      <div className="control-panel space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">📋 Information</h3>

        {algorithm.description && (
          <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {algorithm.description}
            </p>
          </div>
        )}

        {algorithm.complexity && (
          <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">⚡ Complexity</h4>
            <div className="space-y-2 bg-slate-100 dark:bg-slate-800 p-3 rounded">
              <div className="text-sm">
                <span className="text-slate-600 dark:text-slate-400">Time:</span>
                <code className="ml-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-2 py-1 rounded text-xs font-mono">
                  {algorithm.complexity.time}
                </code>
              </div>
              <div className="text-sm">
                <span className="text-slate-600 dark:text-slate-400">Space:</span>
                <code className="ml-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 px-2 py-1 rounded text-xs font-mono">
                  {algorithm.complexity.space}
                </code>
              </div>
            </div>
          </div>
        )}

        {algorithm.pseudocode && (
          <div className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">💻 Pseudocode</h4>
            <pre className="code-block text-xs overflow-x-auto whitespace-pre-wrap break-words">
              {algorithm.pseudocode}
            </pre>
          </div>
        )}

        {algorithm.useCases && algorithm.useCases.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">✅ Use Cases</h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              {algorithm.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">▸</span>
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
