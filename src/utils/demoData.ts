// Built-in practice questions, used when the question bank (Supabase) is unavailable.
// The cheat sheet lives in cheatSheet.ts.

export interface DemoQuestion {
  id: string;
  scenario: {
    vignette: string;
    vitals: Record<string, string | number>;
    labs?: Record<string, string>;
    client_type: string;
    client_needs_category: string;
    content_area: string;
  };
  question_text: string;
  question_type: "multiple_choice" | "select_all";
  options: { id: string; text: string }[];
  correct_option_ids: string[];
  ncjmm_category: string;
  rationale: {
    correct: string;
    incorrect: string;
    insight: string;
  };
}

export const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: "demo-1",
    scenario: {
      vignette:
        "A 68-year-old client is admitted with shortness of breath and bilateral lower-extremity edema. The client has a history of heart failure and reports gaining 4 lbs over the past 3 days. Lung auscultation reveals crackles in the bilateral bases.",
      vitals: {
        BP: "158/92",
        HR: 104,
        RR: 24,
        SpO2: "89% on RA",
        Temp: "98.6 F",
      },
      labs: { BNP: "1240 pg/mL", "K+": "3.4 mEq/L" },
      client_type: "Adult Med-Surg",
      client_needs_category: "Physiological Integrity",
      content_area: "Cardiovascular",
    },
    question_text:
      "Which finding is the priority concern for the nurse to address first?",
    question_type: "multiple_choice",
    options: [
      { id: "A", text: "SpO2 of 89% on room air" },
      { id: "B", text: "Weight gain of 4 lbs over 3 days" },
      { id: "C", text: "Blood pressure of 158/92" },
      { id: "D", text: "Serum potassium of 3.4 mEq/L" },
    ],
    correct_option_ids: ["A"],
    ncjmm_category: "Recognize Cues",
    rationale: {
      correct:
        "Right call — ABC takes priority. An SpO2 of 89% means tissue hypoxia is happening right now. Everything else in this case (weight, BP, K+) matters, but oxygenation is the immediate threat.",
      incorrect:
        "In an HF exacerbation with crackles, the SpO2 of 89% is the immediate threat. ABC priority: oxygenation comes before weight trends, BP, or a mildly low potassium.",
      insight:
        "Heart failure exacerbation: think left-sided = lungs wet. Position high Fowler's, give O2, monitor for diuretic response. The 4-lb weight gain and crackles confirm fluid overload — but treat the hypoxia first.",
    },
  },
  {
    id: "demo-2",
    scenario: {
      vignette:
        "A 16-year-old with a history of asthma arrives in the ED after using their rescue inhaler four times in the last hour with no relief. The client appears anxious, sits leaning forward, and uses accessory muscles to breathe. On auscultation, breath sounds are markedly diminished with minimal wheezing.",
      vitals: {
        BP: "118/74",
        HR: 132,
        RR: 30,
        SpO2: "87% on RA",
        Temp: "98.2 F",
      },
      client_type: "Pediatric",
      client_needs_category: "Physiological Integrity",
      content_area: "Respiratory",
    },
    question_text:
      "How should the nurse interpret the diminished breath sounds and minimal wheezing?",
    question_type: "multiple_choice",
    options: [
      { id: "A", text: "The albuterol is working and the airways are opening" },
      { id: "B", text: "The client is calming down and breathing easier" },
      {
        id: "C",
        text: "This is impending respiratory failure; airways are closing",
      },
      {
        id: "D",
        text: "This is a normal finding after multiple inhaler doses",
      },
    ],
    correct_option_ids: ["C"],
    ncjmm_category: "Prioritize Hypotheses",
    rationale: {
      correct:
        'Exactly — a "silent chest" in severe asthma is an airway emergency. Wheezing requires moving air; when air movement drops, so does the wheeze. This client needs continuous nebs, IV steroids, and prep for intubation.',
      incorrect:
        "A silent chest in severe asthma is not improvement — it means almost no air is moving. With an RR of 30, tripod posture, and SpO2 of 87%, this client is heading toward respiratory failure. Escalate immediately.",
      insight:
        "In asthma, wheeze means air is moving past narrowed airways. When the wheeze disappears with worsening distress, the airway is closing. Other red flags: tripod position, accessory muscle use, rising HR, falling SpO2.",
    },
  },
  {
    id: "demo-3",
    scenario: {
      vignette:
        "A 32-week pregnant client is receiving IV magnesium sulfate for severe pre-eclampsia. Two hours into the infusion, the nurse notes the client is drowsy, deep tendon reflexes are absent, and respiratory rate has dropped from 18 to 10. Urine output for the last hour is 20 mL.",
      vitals: {
        BP: "148/96",
        HR: 78,
        RR: 10,
        SpO2: "94% on RA",
        Temp: "98.4 F",
      },
      labs: { Mg: "9.5 mg/dL", "Urine output": "20 mL/hr" },
      client_type: "Maternity",
      client_needs_category: "Physiological Integrity",
      content_area: "OB / Maternity",
    },
    question_text: "What is the nurse's first action?",
    question_type: "multiple_choice",
    options: [
      { id: "A", text: "Increase the magnesium infusion rate to control BP" },
      { id: "B", text: "Stop the magnesium infusion and notify the provider" },
      {
        id: "C",
        text: "Administer calcium gluconate without stopping the infusion",
      },
      { id: "D", text: "Continue infusion and recheck reflexes in 30 minutes" },
    ],
    correct_option_ids: ["B"],
    ncjmm_category: "Take Action",
    rationale: {
      correct:
        "Correct. Absent reflexes, RR of 10, and a Mg level of 9.5 are the textbook signs of magnesium toxicity. Stop the infusion first — that removes the cause. Then prepare calcium gluconate as the antidote and notify the provider.",
      incorrect:
        "The presentation is magnesium toxicity (absent DTRs, RR 10, low urine output, Mg 9.5). Stop the infusion immediately — never raise the rate, and never delay action by waiting another 30 minutes.",
      insight:
        "Mg toxicity sequence: loss of patellar reflex (first sign) → respiratory depression → cardiac arrest. Watch reflexes, RR > 12, and urine output > 30 mL/hr during any Mg drip. Antidote: calcium gluconate.",
    },
  },
  {
    id: "demo-4",
    scenario: {
      vignette:
        "A 24-year-old client is admitted to the neuro ICU after a motor vehicle collision with a closed head injury. Over the past hour, the nurse notes the client has become increasingly difficult to arouse. The right pupil is now 5 mm and sluggish; the left is 3 mm and brisk.",
      vitals: {
        BP: "168/72",
        HR: 52,
        RR: "10, irregular",
        SpO2: "96%",
        Temp: "99.1 F",
      },
      labs: { GCS: "9 (was 12)" },
      client_type: "Adult Med-Surg",
      client_needs_category: "Physiological Integrity",
      content_area: "Neurological",
    },
    question_text:
      "Which set of findings suggests rising intracranial pressure?",
    question_type: "multiple_choice",
    options: [
      { id: "A", text: "Equal pupils, rising BP, falling HR" },
      {
        id: "B",
        text: "Falling LOC, widening pulse pressure, bradycardia, irregular respirations",
      },
      { id: "C", text: "Hypotension, tachycardia, tachypnea" },
      { id: "D", text: "Brisk equal pupils, stable vitals, decreased pain" },
    ],
    correct_option_ids: ["B"],
    ncjmm_category: "Recognize Cues",
    rationale: {
      correct:
        "Right — that's Cushing's triad plus a falling LOC. The unequal pupils and dropping GCS confirm the brainstem is being compressed. HOB up 30°, midline, minimize stimulation, and call neurosurgery.",
      incorrect:
        "Cushing's triad — hypertension with a widening pulse pressure, bradycardia, and irregular breathing — is the late sign of rising ICP. A falling LOC is the earliest. Don't be reassured by the SpO2 of 96%.",
      insight:
        "LOC change is the earliest sign of neuro deterioration. By the time Cushing's triad appears, herniation is close. Routine prevention: HOB 30°, head midline, avoid Valsalva, avoid suctioning longer than 10 seconds.",
    },
  },
  {
    id: "demo-5",
    scenario: {
      vignette:
        "A 19-year-old client with type 1 diabetes presents to the ED with deep, rapid breathing, fruity-smelling breath, abdominal pain, and reports vomiting all morning. The client says they stopped taking insulin two days ago because they had the flu.",
      vitals: {
        BP: "104/62",
        HR: 124,
        RR: 30,
        SpO2: "99% on RA",
        Temp: "99.4 F",
      },
      labs: {
        Glucose: "512 mg/dL",
        pH: "7.21",
        HCO3: "12 mEq/L",
        "K+": "5.6 mEq/L",
        Ketones: "large",
      },
      client_type: "Adult Med-Surg",
      client_needs_category: "Physiological Integrity",
      content_area: "Endocrine",
    },
    question_text:
      "Select all interventions the nurse anticipates in the initial management of DKA.",
    question_type: "select_all",
    options: [
      { id: "A", text: "IV 0.9% normal saline bolus" },
      { id: "B", text: "IV regular insulin infusion" },
      { id: "C", text: "Subcutaneous long-acting insulin only" },
      { id: "D", text: "Continuous cardiac monitoring" },
      { id: "E", text: "Oral fluids and a regular diet" },
    ],
    correct_option_ids: ["A", "B", "D"],
    ncjmm_category: "Generate Solutions",
    rationale: {
      correct:
        "Spot on. DKA treatment = fluids first (NS), then IV regular insulin drip, with cardiac monitoring because K+ shifts dramatically once insulin starts. Sub-Q long-acting insulin and oral intake come later.",
      incorrect:
        "DKA needs three things up front: aggressive IV fluids (NS), an IV regular insulin drip (not sub-Q long-acting), and cardiac monitoring for K+ shifts. Oral intake is held until the gap closes.",
      insight:
        "Initial DKA pitfall: insulin will drive K+ into cells. The serum K+ of 5.6 looks high now but will drop fast — always have cardiac monitoring and a K+ replacement plan ready before starting the insulin drip.",
    },
  },
  {
    id: "demo-6",
    scenario: {
      vignette:
        'A 45-year-old client newly diagnosed with breast cancer sits quietly with arms crossed. She tells the nurse, "I don\'t even know how to tell my kids. I feel like my whole world just stopped."',
      vitals: { BP: "126/78", HR: 86, RR: 16, SpO2: "98%", Temp: "98.6 F" },
      client_type: "Mental Health",
      client_needs_category: "Psychosocial Integrity",
      content_area: "Therapeutic Communication",
    },
    question_text: "Which response by the nurse is most therapeutic?",
    question_type: "multiple_choice",
    options: [
      {
        id: "A",
        text: '"Try not to worry — most people do very well with treatment."',
      },
      { id: "B", text: '"Why haven\'t you told your children yet?"' },
      { id: "C", text: '"It sounds like this feels overwhelming right now."' },
      { id: "D", text: '"If I were you, I would tell them tonight."' },
    ],
    correct_option_ids: ["C"],
    ncjmm_category: "Take Action",
    rationale: {
      correct:
        "Yes — reflecting the feeling acknowledges what she said without judging, fixing, or rushing her. That opens space for her to keep talking.",
      incorrect:
        'Therapeutic communication: reflect feelings, stay open-ended, avoid false reassurance, "why" questions, or giving advice. Choice C names what she expressed without minimizing it.',
      insight:
        'Quick filter for communication answers: open-ended and feeling-focused = usually right; reassuring, advising, asking "why", or changing the subject = usually wrong.',
    },
  },
];
