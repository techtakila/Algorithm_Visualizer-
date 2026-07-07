import React from "react";

const sections = [
  { id: "sorting", label: "Sorting", description: "Order values visually" },
  { id: "searching", label: "Searching", description: "Find targets in arrays" },
  { id: "graphs", label: "Graphs", description: "Traverse networks of nodes" },
  { id: "trees", label: "Trees", description: "Explore hierarchical data" },
  {
    id: "structures",
    label: "Data Structures",
    description: "Arrays, stacks, queues, maps",
  },
];

function Sidebar({ activeSection, onChange }) {
  return (
    <aside className="glass-panel w-full max-w-xs self-start border-slate-800/80 bg-slate-950/70 p-3 pb-2 sm:p-4 sm:pb-2 md:max-w-xs">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500">
            Modules
          </p>
          <p className="text-[11px] text-slate-400">
            Pick a topic to explore.
          </p>
        </div>
      </div>

      <nav className="space-y-1.5 pb-0">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onChange(section.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-left text-sm transition ${
                isActive
                  ? "bg-sky-500/20 text-sky-100 border border-sky-500/60 shadow-[0_0_25px_rgba(56,189,248,0.35)]"
                  : "border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:border-sky-500/40 hover:bg-slate-900/90 hover:text-sky-100"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-5 w-5 items-center justify-center rounded-lg text-[10px] font-semibold ${
                      isActive
                        ? "bg-sky-500 text-slate-950"
                        : "bg-slate-800 text-slate-100 group-hover:bg-sky-500 group-hover:text-slate-950"
                    }`}
                  >
                    {section.label[0]}
                  </span>
                  <span className="font-medium">{section.label}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">
                  {section.description}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;

