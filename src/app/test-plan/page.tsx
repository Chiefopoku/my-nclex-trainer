interface CategoryRow {
  name: string;
  percent: string;
  subcategories?: { name: string; percent: string }[];
}

// Source: NCSBN 2026 NCLEX-RN Test Plan (effective April 2026).
// Percentages reflect the published category distribution.
const CLIENT_NEEDS: CategoryRow[] = [
  {
    name: 'Safe and Effective Care Environment',
    percent: '25–37%',
    subcategories: [
      { name: 'Management of Care', percent: '15–21%' },
      { name: 'Safety and Infection Prevention and Control', percent: '10–16%' },
    ],
  },
  { name: 'Health Promotion and Maintenance', percent: '6–12%' },
  { name: 'Psychosocial Integrity', percent: '6–12%' },
  {
    name: 'Physiological Integrity',
    percent: '39–63%',
    subcategories: [
      { name: 'Basic Care and Comfort', percent: '6–12%' },
      { name: 'Pharmacological and Parenteral Therapies', percent: '13–19%' },
      { name: 'Reduction of Risk Potential', percent: '9–15%' },
      { name: 'Physiological Adaptation', percent: '11–17%' },
    ],
  },
];

const NCJMM_STEPS = [
  { step: 1, name: 'Recognize Cues', summary: 'Pick out the relevant data from the case.' },
  { step: 2, name: 'Analyze Cues', summary: 'Decide what those data mean together.' },
  { step: 3, name: 'Prioritize Hypotheses', summary: 'Rank the most likely and most dangerous problems.' },
  { step: 4, name: 'Generate Solutions', summary: 'List the possible nursing actions.' },
  { step: 5, name: 'Take Action', summary: 'Choose and perform the highest-priority action.' },
  { step: 6, name: 'Evaluate Outcomes', summary: 'Check whether what you did is working.' },
];

const INTEGRATED_PROCESSES = [
  'Caring',
  'Clinical Judgment',
  'Communication and Documentation',
  'Culture and Spirituality',
  'Nursing Process',
  'Teaching / Learning',
];

export default function TestPlanPage() {
  return (
    <main className="flex-1 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">2026 NCLEX-RN Test Plan</h1>
        <p className="text-gray-600 mt-1 mb-8">
          Structural reference for how items are distributed on the exam (effective April 2026, per NCSBN).
          Use this to balance your practice across categories.
        </p>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Client Needs distribution</h2>
          <div className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            {CLIENT_NEEDS.map((cat) => (
              <div key={cat.name} className="p-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{cat.name}</h3>
                  <span className="text-sm font-medium text-blue-700">{cat.percent}</span>
                </div>
                {cat.subcategories && (
                  <ul className="mt-2 space-y-1">
                    {cat.subcategories.map((s) => (
                      <li
                        key={s.name}
                        className="flex justify-between text-sm text-gray-600 pl-3"
                      >
                        <span>{s.name}</span>
                        <span className="font-medium">{s.percent}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Individual exams can differ ±3% per category. Clinical judgment is also tested
            explicitly through 18 case-study items (three item sets) plus standalone items.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            NCSBN Clinical Judgment Measurement Model (NCJMM)
          </h2>
          <ol className="bg-white rounded-xl border border-gray-100 divide-y divide-gray-100">
            {NCJMM_STEPS.map((s) => (
              <li key={s.step} className="p-4 flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-sm">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{s.name}</h3>
                  <p className="text-sm text-gray-600">{s.summary}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Integrated Processes</h2>
          <div className="flex flex-wrap gap-2">
            {INTEGRATED_PROCESSES.map((p) => (
              <span
                key={p}
                className="bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700"
              >
                {p}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
