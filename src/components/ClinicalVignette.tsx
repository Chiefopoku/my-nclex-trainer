interface Vitals {
  BP?: string;
  HR?: number | string;
  RR?: number | string;
  SpO2?: number | string;
  Temp?: number | string;
  [key: string]: unknown;
}

interface ClinicalVignetteProps {
  clientType: string;
  vignette: string;
  vitals: Vitals;
  labs?: Record<string, unknown>;
}

export default function ClinicalVignette({
  clientType,
  vignette,
  vitals,
  labs,
}: ClinicalVignetteProps) {
  const vitalEntries = Object.entries(vitals);
  const labEntries = labs ? Object.entries(labs) : [];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl shadow-sm max-w-2xl w-full overflow-hidden">
      <div className="px-6 pt-6">
        <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-800 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          {clientType}
        </span>
        <h2 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">
          Clinical Scenario
        </h2>
        <p className="text-slate-700 leading-relaxed mb-5 whitespace-pre-wrap">
          {vignette}
        </p>
      </div>

      <div className="border-t border-stone-100 bg-stone-50/60 px-6 py-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Vital Signs
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {vitalEntries.map(([key, value]) => (
            <div
              key={key}
              className="bg-white border border-stone-200 rounded-lg px-3 py-2"
            >
              <div className="text-[10px] uppercase tracking-wide text-slate-500">
                {key}
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {String(value)}
              </div>
            </div>
          ))}
        </div>

        {labEntries.length > 0 && (
          <>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-5 mb-3">
              Labs
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {labEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white border border-stone-200 rounded-lg px-3 py-2"
                >
                  <div className="text-[10px] uppercase tracking-wide text-slate-500">
                    {key}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {String(value)}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
