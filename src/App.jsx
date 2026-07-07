import React, { useState, useRef, useEffect } from "react";
import Visualizer from "./components/Visualizer";

function App() {
  const [theme, setTheme] = useState("midnight");
  const [themeOpen, setThemeOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setThemeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`theme-shell theme-${theme} relative min-h-screen text-slate-50`}>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="relative z-[70] flex justify-start -ml-2 sm:-ml-3">
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setThemeOpen((s) => !s)}
              className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/80 p-2 shadow-[0_10px_24px_rgba(2,8,23,0.32)] backdrop-blur"
              aria-label="Theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M7.05 6.05L5.63 4.63M18.36 5.64l-1.42 1.42M7.05 17.95l-1.42 1.42M12 7a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
              <span className="sr-only">Theme</span>
            </button>

            {themeOpen && (
              <div className="absolute left-0 top-full z-[70] mt-2 w-44 max-w-[calc(100vw-2rem)] overflow-hidden rounded-[1.25rem] border border-slate-700/60 bg-slate-950/95 shadow-[0_20px_50px_rgba(2,8,23,0.5)] backdrop-blur-xl">
                <div className="p-2">
                  {[
                    { id: "midnight", label: "Midnight" },
                    { id: "aurora", label: "Aurora" },
                    { id: "sunset", label: "Sunset" },
                    { id: "light", label: "Light" },
                  ].map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => {
                        setTheme(themeOption.id);
                        setThemeOpen(false);
                      }}
                      className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
                        theme === themeOption.id
                          ? "bg-sky-500/20 text-sky-100"
                          : "text-slate-300 hover:bg-slate-900/80 hover:text-slate-50"
                      }`}
                    >
                      {themeOption.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <header className="rounded-[2rem] border border-slate-800/70 bg-slate-900/60 px-4 py-4 shadow-[0_20px_60px_rgba(2,8,23,0.38)] backdrop-blur-2xl sm:px-6 sm:py-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
                Interactive Learning Studio
              </p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
                Algorithm Visualizer
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                Explore sorting, searching, graph, and tree algorithms through elegant,
                step-by-step visualizations designed to make each idea feel clear and intuitive.
              </p>
            </div>

          </div>
        </header>

        <Visualizer />
      </div>
    </div>
  );
}

export default App;

