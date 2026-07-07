import { Moon, Sun, Github } from 'lucide-react'

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">AV</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Algorithm Visualizer
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Interactive Learning Platform</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
            title="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
            )}
          </button>
          
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
          
          <div className="flex gap-2">
            <a 
              href="https://github.com/techtakila/Algorithm_Visualizer-"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-1"
              title="View on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all shadow-md hover:shadow-lg text-sm font-medium">
              About
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}