import { BookOpen, CheckCircle2, Code2, Gauge } from 'lucide-react'

export default function AlgorithmInfo({ algorithm }) {
  if (!algorithm) return null

  return (
    <div className="h-full space-y-4">
      <div className="control-panel sticky top-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <BookOpen className="h-5 w-5 text-cyan-700 dark:text-cyan-300" />
          Information
        </h3>

        {algorithm.description && (
          <section className="mb-5 border-b border-slate-200 pb-5 dark:border-slate-800">
            <h4 className="mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              Description
            </h4>
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
              {algorithm.description}
            </p>
          </section>
        )}

        {algorithm.complexity && (
          <section className="mb-5 border-b border-slate-200 pb-5 dark:border-slate-800">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <Gauge className="h-4 w-4 text-amber-600" />
              Complexity
            </h4>
            <div className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <Metric label="Time" value={algorithm.complexity.time} tone="blue" />
              <Metric label="Space" value={algorithm.complexity.space} tone="green" />
            </div>
          </section>
        )}

        {algorithm.pseudocode && (
          <section className="mb-5 border-b border-slate-200 pb-5 dark:border-slate-800">
            <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <Code2 className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
              Pseudocode
            </h4>
            <pre className="code-block text-xs">
              {algorithm.pseudocode}
            </pre>
          </section>
        )}

        {algorithm.useCases && (
          <section>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Use Cases
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              {algorithm.useCases.map((useCase) => (
                <li key={useCase} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-600" />
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

function Metric({ label, value, tone }) {
  const classes = tone === 'green'
    ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
    : 'bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-200'

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <code className={`rounded-md px-3 py-1 text-xs font-bold ${classes}`}>{value}</code>
    </div>
  )
}
