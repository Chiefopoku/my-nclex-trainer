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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl w-full">
      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded mb-3">
        {clientType}
      </span>
      <h2 className="text-xl font-bold text-gray-900 mb-3">Clinical Scenario</h2>
      <p className="text-gray-700 leading-relaxed mb-5 whitespace-pre-wrap">{vignette}</p>

      <div className="border-t border-gray-100 pt-4">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Vital Signs
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {vitalEntries.map(([key, value]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">{key}</div>
              <div className="text-sm font-semibold text-gray-900">{String(value)}</div>
            </div>
          ))}
        </div>

        {labEntries.length > 0 && (
          <>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mt-5 mb-2">
              Labs
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {labEntries.map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-500">{key}</div>
                  <div className="text-sm font-semibold text-gray-900">{String(value)}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
