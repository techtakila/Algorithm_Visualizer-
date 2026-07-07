import { Github, Moon, Sun } from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-sm font-black tracking-tight text-white shadow-sm dark:bg-cyan-500 dark:text-slate-950">
            AV
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-slate-950 dark:text-white sm:text-2xl">
              Algorithm Visualizer
            </h1>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Algorithms, data structures, and strategy patterns in motion
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-700 dark:hover:text-cyan-300"
            title="Toggle color theme"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <a
            href="https://github.com/techtakila/Algorithm_Visualizer-"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-700 dark:hover:text-cyan-300"
            title="View on GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  )
}
