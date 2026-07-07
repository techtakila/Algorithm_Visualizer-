import React from "react";

function StatsPanel({ isRunning, currentStep, totalSteps, comparisons, swaps }) {
  return (
    <div className="space-y-3 text-sm">
      <dl className="grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-2xl bg-slate-900/80 p-3">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Step
          </dt>
          <dd className="mt-1 text-lg font-semibold text-slate-50">
            {totalSteps === 0 ? 0 : Math.min(currentStep, totalSteps)}{" "}
            <span className="text-xs font-normal text-slate-400">
              / {totalSteps}
            </span>
          </dd>
        </div>

        <div className="rounded-2xl bg-slate-900/80 p-3">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Comparisons
          </dt>
          <dd className="mt-1 text-lg font-semibold text-slate-50">
            {comparisons}
          </dd>
        </div>

        <div className="rounded-2xl bg-slate-900/80 p-3">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Swaps / Updates
          </dt>
          <dd className="mt-1 text-lg font-semibold text-slate-50">{swaps}</dd>
        </div>
      </dl>
    </div>
  );
}

export default StatsPanel;

