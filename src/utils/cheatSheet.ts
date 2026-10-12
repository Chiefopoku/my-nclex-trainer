// High-yield NCLEX-RN cheat sheet.
// Compiled from the author's own review notes (NCLEX-RN High-Yield Review Guide,
// Core Cheat Sheet and Pharmacology Map, Oct 2026), aligned to the 2026 NCLEX-RN test plan.
// Reference ranges vary slightly between sources; on the exam, use the range given in the question.

export interface StudyFact {
  id: string;
  category: string;
  title: string;
  body: string;
  tags: string[];
}

export const CHEAT_SHEET_CATEGORIES: string[] = [
  "Test Strategy",
  "NCJMM",
  "Prioritization & Delegation",
  "Legal & Ethical",
  "Safety & Infection Control",
  "Lab Values",
  "Electrolytes",
  "Fluids & Acid-Base",
  "ECG & Rhythms",
  "Pharm: Name Endings",
  "Pharm: Hubs & Interactions",
  "Antidotes & Drug Levels",
  "Insulin & Diabetes",
  "Pharm: Psych & Neuro",
  "Pharm: Anti-infectives & Other",
  "Med Administration & Calculations",
  "Cardiovascular & Shock",
  "Respiratory",
  "Neurological",
  "Endocrine",
  "GI & Renal",
  "MSK, Burns & Peri-op",
  "Positions",
  "Classic Signs",
  "Maternity & Newborn",
  "Pediatrics",
  "Mental Health",
  "Diets",
  "Report Immediately"
];

export const CHEAT_SHEET_FACTS: StudyFact[] = [
  {
    "id": "test-strategy-1",
    "category": "Test Strategy",
    "title": "Read the last sentence first",
    "body": "It tells you the task: first action, priority client, further teaching needed, or finding to report.",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "test-strategy-2",
    "category": "Test Strategy",
    "title": "Stable or unstable?",
    "body": "Decide before reading the options. An unstable client changes every answer.",
    "tags": [
      "strategy",
      "priority"
    ]
  },
  {
    "id": "test-strategy-3",
    "category": "Test Strategy",
    "title": "Assess or act?",
    "body": "Assess first unless the client is in immediate danger. If the stem already gives the assessment data, act.",
    "tags": [
      "strategy",
      "priority"
    ]
  },
  {
    "id": "test-strategy-4",
    "category": "Test Strategy",
    "title": "Nurse before provider",
    "body": "Call the provider only after doing everything a nurse can do. If a nursing action exists, do that first.",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "test-strategy-5",
    "category": "Test Strategy",
    "title": "Never leave an unstable client",
    "body": "Any option that walks away from a deteriorating client is wrong.",
    "tags": [
      "strategy",
      "safety"
    ]
  },
  {
    "id": "test-strategy-6",
    "category": "Test Strategy",
    "title": "Least invasive first",
    "body": "Reposition before oxygen; verbal de-escalation before restraints; least restrictive effective step.",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "test-strategy-7",
    "category": "Test Strategy",
    "title": "\"Further teaching needed\"",
    "body": "Means find the WRONG statement. Same for \"requires intervention\".",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "test-strategy-8",
    "category": "Test Strategy",
    "title": "Absolute words",
    "body": "Always, never, all, only are usually wrong.",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "test-strategy-9",
    "category": "Test Strategy",
    "title": "Opposites and duplicates",
    "body": "If two options are opposites, one is often right. If two say the same thing, both are wrong.",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "test-strategy-10",
    "category": "Test Strategy",
    "title": "The NCLEX hospital is ideal",
    "body": "Full staffing, all supplies, orders available. Answer by the textbook, not your old ward.",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "test-strategy-11",
    "category": "Test Strategy",
    "title": "Select all that apply",
    "body": "Judge each option as its own true/false statement. Wrong picks cost points, so do not add guesses.",
    "tags": [
      "ngn",
      "strategy"
    ]
  },
  {
    "id": "test-strategy-12",
    "category": "Test Strategy",
    "title": "Bowtie items",
    "body": "Pick the condition first, then the two actions and two parameters to monitor that fit it.",
    "tags": [
      "ngn"
    ]
  },
  {
    "id": "test-strategy-13",
    "category": "Test Strategy",
    "title": "Matrix items",
    "body": "Work one row at a time; every row needs an answer.",
    "tags": [
      "ngn"
    ]
  },
  {
    "id": "test-strategy-14",
    "category": "Test Strategy",
    "title": "Trend items",
    "body": "Compare the current value with the earlier one, not only with normal.",
    "tags": [
      "ngn"
    ]
  },
  {
    "id": "test-strategy-15",
    "category": "Test Strategy",
    "title": "Exam format",
    "body": "CAT, 85–150 items (15 unscored), up to 5 hours, 3 scored 6-item case studies. No going back.",
    "tags": [
      "exam"
    ]
  },
  {
    "id": "test-strategy-16",
    "category": "Test Strategy",
    "title": "Stopping at 85",
    "body": "Means nothing by itself. Both passing and failing candidates stop there. Treat every item as decisive.",
    "tags": [
      "exam"
    ]
  },
  {
    "id": "ncjmm-1",
    "category": "NCJMM",
    "title": "Step 1 — Recognize Cues",
    "body": "What matters most in this chart? Tested by highlighting abnormal, relevant findings.",
    "tags": [
      "clinical-judgment"
    ]
  },
  {
    "id": "ncjmm-2",
    "category": "NCJMM",
    "title": "Step 2 — Analyze Cues",
    "body": "What could these findings mean? Match findings to possible conditions.",
    "tags": [
      "clinical-judgment"
    ]
  },
  {
    "id": "ncjmm-3",
    "category": "NCJMM",
    "title": "Step 3 — Prioritize Hypotheses",
    "body": "What is most likely AND most dangerous? Choose the priority problem.",
    "tags": [
      "clinical-judgment"
    ]
  },
  {
    "id": "ncjmm-4",
    "category": "NCJMM",
    "title": "Step 4 — Generate Solutions",
    "body": "Sort actions into indicated, contraindicated and non-essential.",
    "tags": [
      "clinical-judgment"
    ]
  },
  {
    "id": "ncjmm-5",
    "category": "NCJMM",
    "title": "Step 5 — Take Action",
    "body": "Pick and order the nursing actions: what first, and how.",
    "tags": [
      "clinical-judgment"
    ]
  },
  {
    "id": "ncjmm-6",
    "category": "NCJMM",
    "title": "Step 6 — Evaluate Outcomes",
    "body": "Did it work? Classify findings as improved, unchanged or declined.",
    "tags": [
      "clinical-judgment"
    ]
  },
  {
    "id": "prioritization-delegation-1",
    "category": "Prioritization & Delegation",
    "title": "Priority ladder",
    "body": "ABCs → acute change in LOC or new neuro deficit → safety (falls, suicide, infection, bleeding) → Maslow → nursing process.",
    "tags": [
      "priority"
    ]
  },
  {
    "id": "prioritization-delegation-2",
    "category": "Prioritization & Delegation",
    "title": "See first",
    "body": "Unstable, newly changed, post-op under 12 hours, or an unexpected finding.",
    "tags": [
      "priority"
    ]
  },
  {
    "id": "prioritization-delegation-3",
    "category": "Prioritization & Delegation",
    "title": "See last",
    "body": "Expected finding, chronic complaint, or ready for discharge.",
    "tags": [
      "priority"
    ]
  },
  {
    "id": "prioritization-delegation-4",
    "category": "Prioritization & Delegation",
    "title": "Actual beats risk",
    "body": "Actual problems beat risk-for; acute beats chronic; unexpected beats expected.",
    "tags": [
      "priority"
    ]
  },
  {
    "id": "prioritization-delegation-5",
    "category": "Prioritization & Delegation",
    "title": "Physical before psychosocial",
    "body": "Unless the question is about safety of self or others.",
    "tags": [
      "priority",
      "maslow"
    ]
  },
  {
    "id": "prioritization-delegation-6",
    "category": "Prioritization & Delegation",
    "title": "RN keeps TAPE",
    "body": "Teaching, Assessment, Planning, Evaluation. Plus unstable clients, IV push drugs and blood.",
    "tags": [
      "delegation"
    ]
  },
  {
    "id": "prioritization-delegation-7",
    "category": "Prioritization & Delegation",
    "title": "LPN/LVN can take",
    "body": "Stable clients with expected outcomes, oral/injectable meds, reinforcing teaching, routine dressings, tube feeds.",
    "tags": [
      "delegation"
    ]
  },
  {
    "id": "prioritization-delegation-8",
    "category": "Prioritization & Delegation",
    "title": "UAP can take",
    "body": "Bathing, feeding stable clients, ambulation, turning, vitals on stable clients, I&O, specimens. Never assessment, teaching or meds.",
    "tags": [
      "delegation"
    ]
  },
  {
    "id": "prioritization-delegation-9",
    "category": "Prioritization & Delegation",
    "title": "Five rights of delegation",
    "body": "Right task, circumstance, person, direction/communication, supervision/evaluation.",
    "tags": [
      "delegation"
    ]
  },
  {
    "id": "prioritization-delegation-10",
    "category": "Prioritization & Delegation",
    "title": "Float or new nurse",
    "body": "Gets the most stable client whose needs match their home-unit skills.",
    "tags": [
      "delegation"
    ]
  },
  {
    "id": "prioritization-delegation-11",
    "category": "Prioritization & Delegation",
    "title": "Triage tags",
    "body": "Red: immediate, survivable. Yellow: can wait. Green: walking wounded. Black: expectant or dead.",
    "tags": [
      "disaster"
    ]
  },
  {
    "id": "prioritization-delegation-12",
    "category": "Prioritization & Delegation",
    "title": "Mass casualty",
    "body": "Greatest good for the greatest number, so a client in cardiac arrest is tagged black.",
    "tags": [
      "disaster"
    ]
  },
  {
    "id": "legal-ethical-1",
    "category": "Legal & Ethical",
    "title": "Assault vs battery",
    "body": "Assault is the threat; battery is the touch without consent; false imprisonment is restraint without cause.",
    "tags": [
      "legal"
    ]
  },
  {
    "id": "legal-ethical-2",
    "category": "Legal & Ethical",
    "title": "Malpractice",
    "body": "Professional negligence: duty, breach, causation, harm.",
    "tags": [
      "legal"
    ]
  },
  {
    "id": "legal-ethical-3",
    "category": "Legal & Ethical",
    "title": "Informed consent",
    "body": "Provider explains; nurse witnesses the signature and confirms understanding. Sedated clients cannot sign.",
    "tags": [
      "legal",
      "consent"
    ]
  },
  {
    "id": "legal-ethical-4",
    "category": "Legal & Ethical",
    "title": "Restraints",
    "body": "Order required, never PRN. Renew every 4 h adults, 2 h ages 9–17, 1 h under 9. Face-to-face within 1 h.",
    "tags": [
      "legal",
      "safety"
    ]
  },
  {
    "id": "legal-ethical-5",
    "category": "Legal & Ethical",
    "title": "Applying restraints",
    "body": "Quick-release knot to the bed frame, never the side rail; two fingers underneath; release and check every 2 h.",
    "tags": [
      "safety"
    ]
  },
  {
    "id": "legal-ethical-6",
    "category": "Legal & Ethical",
    "title": "Incident report",
    "body": "Chart the facts, file the report, never mention the report in the chart.",
    "tags": [
      "legal"
    ]
  },
  {
    "id": "legal-ethical-7",
    "category": "Legal & Ethical",
    "title": "Medication error",
    "body": "Assess the client first, notify the provider, then file an incident report.",
    "tags": [
      "legal",
      "meds"
    ]
  },
  {
    "id": "legal-ethical-8",
    "category": "Legal & Ethical",
    "title": "DNR",
    "body": "Means no CPR, not \"do not treat\". Comfort care and other ordered treatment continue.",
    "tags": [
      "ethics"
    ]
  },
  {
    "id": "legal-ethical-9",
    "category": "Legal & Ethical",
    "title": "Advance directives",
    "body": "Ask on admission. A competent client's wishes override the family's.",
    "tags": [
      "ethics"
    ]
  },
  {
    "id": "legal-ethical-10",
    "category": "Legal & Ethical",
    "title": "HIPAA",
    "body": "Share only with those involved in care. Exceptions: abuse, reportable diseases, gunshot wounds, credible threats.",
    "tags": [
      "legal",
      "privacy"
    ]
  },
  {
    "id": "legal-ethical-11",
    "category": "Legal & Ethical",
    "title": "Mandatory reporting",
    "body": "Suspected child or elder abuse, gunshot wounds, reportable communicable diseases. Suspicion is enough.",
    "tags": [
      "legal"
    ]
  },
  {
    "id": "legal-ethical-12",
    "category": "Legal & Ethical",
    "title": "Unsafe or unclear order",
    "body": "Hold it, clarify with the prescriber, then go up the chain of command.",
    "tags": [
      "legal"
    ]
  },
  {
    "id": "legal-ethical-13",
    "category": "Legal & Ethical",
    "title": "Against medical advice",
    "body": "A competent adult may leave. Explain risks, ask them to sign, notify the provider, document.",
    "tags": [
      "legal"
    ]
  },
  {
    "id": "legal-ethical-14",
    "category": "Legal & Ethical",
    "title": "SBAR",
    "body": "Situation, Background, Assessment, Recommendation. Read back all verbal and phone orders.",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "legal-ethical-15",
    "category": "Legal & Ethical",
    "title": "Two identifiers",
    "body": "Name and date of birth (or record number) before every drug, specimen or procedure. Never the room number.",
    "tags": [
      "safety"
    ]
  },
  {
    "id": "safety-infection-control-1",
    "category": "Safety & Infection Control",
    "title": "Airborne (MTV)",
    "body": "Measles, TB, Varicella/disseminated zoster. N95, negative-pressure room, door closed.",
    "tags": [
      "isolation"
    ]
  },
  {
    "id": "safety-infection-control-2",
    "category": "Safety & Infection Control",
    "title": "Droplet",
    "body": "Influenza, pertussis, meningococcal meningitis, mumps, rubella, diphtheria, epiglottitis. Surgical mask, private room.",
    "tags": [
      "isolation"
    ]
  },
  {
    "id": "safety-infection-control-3",
    "category": "Safety & Infection Control",
    "title": "Contact",
    "body": "MRSA, VRE, C. diff, RSV, norovirus, scabies, lice, impetigo, draining wounds. Gown, gloves, dedicated equipment.",
    "tags": [
      "isolation"
    ]
  },
  {
    "id": "safety-infection-control-4",
    "category": "Safety & Infection Control",
    "title": "Varicella / disseminated zoster",
    "body": "Airborne PLUS contact.",
    "tags": [
      "isolation"
    ]
  },
  {
    "id": "safety-infection-control-5",
    "category": "Safety & Infection Control",
    "title": "C. difficile",
    "body": "Soap and water; alcohol gel does not kill spores. Clean surfaces with bleach.",
    "tags": [
      "isolation"
    ]
  },
  {
    "id": "safety-infection-control-6",
    "category": "Safety & Infection Control",
    "title": "Standard only",
    "body": "HIV, hepatitis B and C need standard precautions only.",
    "tags": [
      "isolation"
    ]
  },
  {
    "id": "safety-infection-control-7",
    "category": "Safety & Infection Control",
    "title": "PPE on",
    "body": "Gown, mask/respirator, goggles, gloves (over the cuffs).",
    "tags": [
      "ppe"
    ]
  },
  {
    "id": "safety-infection-control-8",
    "category": "Safety & Infection Control",
    "title": "PPE off",
    "body": "Gloves, goggles, gown, mask. Remove an N95 after leaving the room.",
    "tags": [
      "ppe"
    ]
  },
  {
    "id": "safety-infection-control-9",
    "category": "Safety & Infection Control",
    "title": "Neutropenic precautions",
    "body": "Private room, no fresh flowers, no raw fruit or vegetables, no rectal temps. Fever 100.4 °F (38 °C) = emergency.",
    "tags": [
      "isolation",
      "oncology"
    ]
  },
  {
    "id": "safety-infection-control-10",
    "category": "Safety & Infection Control",
    "title": "TB skin test",
    "body": "Read at 48–72 h; measure induration. Positive: 15 mm low risk, 10 mm health workers/immigrants, 5 mm HIV or close contact.",
    "tags": [
      "tb"
    ]
  },
  {
    "id": "safety-infection-control-11",
    "category": "Safety & Infection Control",
    "title": "Hepatitis routes",
    "body": "A and E: fecal-oral. B, C and D: blood and body fluids.",
    "tags": [
      "infection"
    ]
  },
  {
    "id": "safety-infection-control-12",
    "category": "Safety & Infection Control",
    "title": "Sterile field",
    "body": "Outer 1 inch is contaminated; keep above the waist and in view; wet = contaminated.",
    "tags": [
      "sterile"
    ]
  },
  {
    "id": "safety-infection-control-13",
    "category": "Safety & Infection Control",
    "title": "Fire",
    "body": "RACE (rescue, alarm, contain, extinguish) and PASS (pull, aim, squeeze, sweep).",
    "tags": [
      "safety"
    ]
  },
  {
    "id": "safety-infection-control-14",
    "category": "Safety & Infection Control",
    "title": "Falls",
    "body": "Bed low and locked, call light in reach, non-skid socks. Four side rails up counts as a restraint.",
    "tags": [
      "safety"
    ]
  },
  {
    "id": "safety-infection-control-15",
    "category": "Safety & Infection Control",
    "title": "Seizure precautions",
    "body": "Side-lying, protect the head, time it, nothing in the mouth, never restrain.",
    "tags": [
      "safety",
      "neuro"
    ]
  },
  {
    "id": "safety-infection-control-16",
    "category": "Safety & Infection Control",
    "title": "Radiation implant",
    "body": "Private room, limit time and distance, no pregnant visitors. Dislodged: long forceps into the lead container.",
    "tags": [
      "safety",
      "oncology"
    ]
  },
  {
    "id": "lab-values-1",
    "category": "Lab Values",
    "title": "Sodium",
    "body": "135–145 mEq/L. Changes the brain: confusion and seizures.",
    "tags": [
      "electrolyte"
    ]
  },
  {
    "id": "lab-values-2",
    "category": "Lab Values",
    "title": "Potassium",
    "body": "3.5–5.0 mEq/L. Changes the heart. The most dangerous electrolyte.",
    "tags": [
      "electrolyte",
      "cardiac"
    ]
  },
  {
    "id": "lab-values-3",
    "category": "Lab Values",
    "title": "Calcium",
    "body": "8.5–10.5 mg/dL. Low = tetany, long QT. High = weakness, stones.",
    "tags": [
      "electrolyte"
    ]
  },
  {
    "id": "lab-values-4",
    "category": "Lab Values",
    "title": "Magnesium",
    "body": "1.3–2.1 mEq/L. Low = tremor, torsades. High = lost reflexes.",
    "tags": [
      "electrolyte"
    ]
  },
  {
    "id": "lab-values-5",
    "category": "Lab Values",
    "title": "Phosphate",
    "body": "3.0–4.5 mg/dL. Moves opposite to calcium.",
    "tags": [
      "electrolyte"
    ]
  },
  {
    "id": "lab-values-6",
    "category": "Lab Values",
    "title": "BUN / creatinine",
    "body": "BUN 10–20 mg/dL; creatinine 0.6–1.2 mg/dL (the best routine kidney marker).",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "lab-values-7",
    "category": "Lab Values",
    "title": "Glucose & A1C",
    "body": "Fasting 70–99 mg/dL; under 70 treat now. A1C 6.5% or more = diabetes; goal under 7%.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "lab-values-8",
    "category": "Lab Values",
    "title": "WBC & ANC",
    "body": "WBC 5,000–10,000. ANC under 1,000 neutropenic; under 500 severe.",
    "tags": [
      "hematology"
    ]
  },
  {
    "id": "lab-values-9",
    "category": "Lab Values",
    "title": "Hemoglobin / hematocrit",
    "body": "Hgb men 14–18, women 12–16 g/dL (under 7: expect transfusion). Hct about 3× Hgb.",
    "tags": [
      "hematology"
    ]
  },
  {
    "id": "lab-values-10",
    "category": "Lab Values",
    "title": "Platelets",
    "body": "150,000–400,000. Under 50,000 bleeding precautions; under 20,000 spontaneous bleeding.",
    "tags": [
      "hematology",
      "bleeding"
    ]
  },
  {
    "id": "lab-values-11",
    "category": "Lab Values",
    "title": "PT / INR",
    "body": "PT 11–12.5 s. INR 0.8–1.1; on warfarin 2–3; mechanical valve 2.5–3.5.",
    "tags": [
      "coagulation"
    ]
  },
  {
    "id": "lab-values-12",
    "category": "Lab Values",
    "title": "aPTT",
    "body": "30–40 s. On heparin 1.5–2.5× control.",
    "tags": [
      "coagulation"
    ]
  },
  {
    "id": "lab-values-13",
    "category": "Lab Values",
    "title": "CD4",
    "body": "500–1,500. Under 200 = AIDS.",
    "tags": [
      "immune"
    ]
  },
  {
    "id": "lab-values-14",
    "category": "Lab Values",
    "title": "Albumin",
    "body": "3.5–5.0 g/dL. Low = edema, poor healing, malnutrition.",
    "tags": [
      "nutrition"
    ]
  },
  {
    "id": "lab-values-15",
    "category": "Lab Values",
    "title": "Ammonia",
    "body": "10–80 mcg/dL. High = hepatic encephalopathy; give lactulose.",
    "tags": [
      "liver"
    ]
  },
  {
    "id": "lab-values-16",
    "category": "Lab Values",
    "title": "Liver enzymes",
    "body": "ALT 4–36, AST 0–35 units/L. Check before hepatotoxic drugs.",
    "tags": [
      "liver"
    ]
  },
  {
    "id": "lab-values-17",
    "category": "Lab Values",
    "title": "Bilirubin",
    "body": "0.3–1.0 mg/dL. Jaundice visible above 2–3.",
    "tags": [
      "liver"
    ]
  },
  {
    "id": "lab-values-18",
    "category": "Lab Values",
    "title": "Lipase / amylase",
    "body": "Rise in pancreatitis; lipase is more specific.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "lab-values-19",
    "category": "Lab Values",
    "title": "Troponin",
    "body": "Near zero. Any rise = myocardial injury; rises 3–6 h after MI.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "lab-values-20",
    "category": "Lab Values",
    "title": "BNP",
    "body": "Under 100 pg/mL. High = heart failure.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "lab-values-21",
    "category": "Lab Values",
    "title": "Lactate",
    "body": "Under 2 mmol/L. Above 2 poor perfusion; 4 or more = shock.",
    "tags": [
      "sepsis"
    ]
  },
  {
    "id": "lab-values-22",
    "category": "Lab Values",
    "title": "Lipids",
    "body": "Total under 200, LDL under 100, HDL above 40 (men)/50 (women), triglycerides under 150.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "lab-values-23",
    "category": "Lab Values",
    "title": "TSH",
    "body": "0.4–4.0 mU/L. High = hypothyroid; low = hyperthyroid.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "lab-values-24",
    "category": "Lab Values",
    "title": "Urine specific gravity",
    "body": "1.005–1.030. High = dehydration, SIADH. Low = diabetes insipidus.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "lab-values-25",
    "category": "Lab Values",
    "title": "Serum osmolality",
    "body": "275–295 mOsm/kg. High = dehydrated or DI; low = SIADH or overload.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "lab-values-26",
    "category": "Lab Values",
    "title": "Urine output",
    "body": "At least 30 mL/h (0.5 mL/kg/h) adults; 1 mL/kg/h children. Less: report, hold K+.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "lab-values-27",
    "category": "Lab Values",
    "title": "Pressures",
    "body": "MAP 70–100 (under 65 = organs not perfused). CVP 2–8. ICP 5–15 (above 20 emergency). CPP = MAP − ICP.",
    "tags": [
      "hemodynamics"
    ]
  },
  {
    "id": "lab-values-28",
    "category": "Lab Values",
    "title": "Adult blood pressure",
    "body": "Normal under 120/80; stage 2 is 140/90 or more; crisis above 180 and/or 120.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "lab-values-29",
    "category": "Lab Values",
    "title": "Ranges vary by source",
    "body": "Learn one set. On the exam, always use the range printed in the question.",
    "tags": [
      "strategy"
    ]
  },
  {
    "id": "electrolytes-1",
    "category": "Electrolytes",
    "title": "Potassium & the T wave",
    "body": "High K+: tall peaked T, wide QRS → VF. Low K+: flat T, U wave, PVCs.",
    "tags": [
      "potassium",
      "ecg"
    ]
  },
  {
    "id": "electrolytes-2",
    "category": "Electrolytes",
    "title": "Hyperkalemia treatment",
    "body": "1) IV calcium gluconate to protect the heart 2) insulin + dextrose or albuterol to shift K+ in 3) binder, loop diuretic or dialysis.",
    "tags": [
      "potassium"
    ]
  },
  {
    "id": "electrolytes-3",
    "category": "Electrolytes",
    "title": "IV potassium",
    "body": "Never IV push, IM or subcut. Diluted, on a pump, max ~10 mEq/h peripherally. Confirm urine output first.",
    "tags": [
      "potassium",
      "safety"
    ]
  },
  {
    "id": "electrolytes-4",
    "category": "Electrolytes",
    "title": "Hemolyzed sample",
    "body": "Gives a falsely high K+. Redraw before treating a stable client.",
    "tags": [
      "potassium"
    ]
  },
  {
    "id": "electrolytes-5",
    "category": "Electrolytes",
    "title": "Magnesium before potassium",
    "body": "Low magnesium blocks potassium correction. Fix magnesium first.",
    "tags": [
      "magnesium",
      "potassium"
    ]
  },
  {
    "id": "electrolytes-6",
    "category": "Electrolytes",
    "title": "Calcium & QT",
    "body": "Move in opposite directions: low calcium, long QT; high calcium, short QT.",
    "tags": [
      "calcium",
      "ecg"
    ]
  },
  {
    "id": "electrolytes-7",
    "category": "Electrolytes",
    "title": "Calcium & magnesium as sedatives",
    "body": "Low levels excite (tetany, brisk reflexes); high levels sedate (weakness, absent reflexes, slow breathing).",
    "tags": [
      "calcium",
      "magnesium"
    ]
  },
  {
    "id": "electrolytes-8",
    "category": "Electrolytes",
    "title": "Hypocalcemia signs",
    "body": "Trousseau (hand spasm with BP cuff), Chvostek (cheek twitch), perioral tingling, laryngospasm.",
    "tags": [
      "calcium"
    ]
  },
  {
    "id": "electrolytes-9",
    "category": "Electrolytes",
    "title": "After thyroidectomy",
    "body": "Watch for low calcium. Tracheostomy tray and calcium gluconate at the bedside.",
    "tags": [
      "calcium",
      "endocrine"
    ]
  },
  {
    "id": "electrolytes-10",
    "category": "Electrolytes",
    "title": "Magnesium toxicity",
    "body": "Loss of DTRs first, then slow breathing, low BP. Stop the infusion; give calcium gluconate.",
    "tags": [
      "magnesium",
      "ob"
    ]
  },
  {
    "id": "electrolytes-11",
    "category": "Electrolytes",
    "title": "Magnesium sulfate checks",
    "body": "Hold if RR under 12, absent reflexes or urine output under 30 mL/h.",
    "tags": [
      "magnesium",
      "ob"
    ]
  },
  {
    "id": "electrolytes-12",
    "category": "Electrolytes",
    "title": "Correct sodium slowly",
    "body": "About 8–10 mEq/L per day. Too fast up = osmotic demyelination; too fast down = cerebral edema.",
    "tags": [
      "sodium"
    ]
  },
  {
    "id": "electrolytes-13",
    "category": "Electrolytes",
    "title": "Hyponatremia",
    "body": "SIADH, thiazides, water excess. Confusion, seizures. Fluid restriction; 3% saline slowly if severe.",
    "tags": [
      "sodium"
    ]
  },
  {
    "id": "electrolytes-14",
    "category": "Electrolytes",
    "title": "Hypernatremia",
    "body": "Dehydration, diabetes insipidus. Thirst, restlessness, seizures. Hypotonic fluids slowly.",
    "tags": [
      "sodium"
    ]
  },
  {
    "id": "electrolytes-15",
    "category": "Electrolytes",
    "title": "Acid–base and potassium",
    "body": "Acidosis pushes K+ up; alkalosis and insulin push it down.",
    "tags": [
      "potassium",
      "abg"
    ]
  },
  {
    "id": "electrolytes-16",
    "category": "Electrolytes",
    "title": "Refeeding syndrome",
    "body": "Starved client fed too fast: phosphate, potassium and magnesium fall. Start slowly.",
    "tags": [
      "phosphate",
      "nutrition"
    ]
  },
  {
    "id": "fluids-acid-base-1",
    "category": "Fluids & Acid-Base",
    "title": "Isotonic fluids",
    "body": "0.9% saline, lactated Ringer's. Volume replacement. Watch for overload. Saline only with blood.",
    "tags": [
      "iv"
    ]
  },
  {
    "id": "fluids-acid-base-2",
    "category": "Fluids & Acid-Base",
    "title": "Hypotonic fluids",
    "body": "0.45% saline. Cellular dehydration, hypernatremia. Never with raised ICP, burns or trauma.",
    "tags": [
      "iv"
    ]
  },
  {
    "id": "fluids-acid-base-3",
    "category": "Fluids & Acid-Base",
    "title": "Hypertonic fluids",
    "body": "3% saline, D10W, D5NS. Severe hyponatremia, cerebral edema. Pump, slow, frequent checks.",
    "tags": [
      "iv"
    ]
  },
  {
    "id": "fluids-acid-base-4",
    "category": "Fluids & Acid-Base",
    "title": "Fluid deficit",
    "body": "Fast weak pulse, low BP, poor turgor, dark urine; high Hct, BUN and specific gravity.",
    "tags": [
      "fluids"
    ]
  },
  {
    "id": "fluids-acid-base-5",
    "category": "Fluids & Acid-Base",
    "title": "Fluid excess",
    "body": "Bounding pulse, high BP, crackles, JVD, edema, weight gain.",
    "tags": [
      "fluids"
    ]
  },
  {
    "id": "fluids-acid-base-6",
    "category": "Fluids & Acid-Base",
    "title": "Daily weight",
    "body": "The best indicator of fluid status. 1 kg ≈ 1 L.",
    "tags": [
      "fluids"
    ]
  },
  {
    "id": "fluids-acid-base-7",
    "category": "Fluids & Acid-Base",
    "title": "ABG normals",
    "body": "pH 7.35–7.45; PaCO2 35–45 (acid, lungs); HCO3 22–26 (base, kidneys); PaO2 80–100.",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "fluids-acid-base-8",
    "category": "Fluids & Acid-Base",
    "title": "ROME",
    "body": "Respiratory Opposite (pH and CO2), Metabolic Equal (pH and HCO3).",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "fluids-acid-base-9",
    "category": "Fluids & Acid-Base",
    "title": "Compensation",
    "body": "Other value normal = uncompensated; abnormal with abnormal pH = partial; pH back in range = full.",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "fluids-acid-base-10",
    "category": "Fluids & Acid-Base",
    "title": "Respiratory acidosis",
    "body": "Hypoventilation: opioids, COPD, airway obstruction. Improve ventilation; naloxone for opioids.",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "fluids-acid-base-11",
    "category": "Fluids & Acid-Base",
    "title": "Respiratory alkalosis",
    "body": "Hyperventilation: anxiety, pain, early salicylate overdose. Slow the breathing, treat the cause.",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "fluids-acid-base-12",
    "category": "Fluids & Acid-Base",
    "title": "Metabolic acidosis",
    "body": "DKA, kidney failure, diarrhea, lactic acidosis. Kussmaul breathing; K+ often high.",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "fluids-acid-base-13",
    "category": "Fluids & Acid-Base",
    "title": "Metabolic alkalosis",
    "body": "Vomiting, NG suction, diuretics, excess antacids. K+ often low.",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "fluids-acid-base-14",
    "category": "Fluids & Acid-Base",
    "title": "Above vs below",
    "body": "Loss from above the stomach (vomiting) = alkalosis. Loss from below (diarrhea) = acidosis.",
    "tags": [
      "abg"
    ]
  },
  {
    "id": "ecg-rhythms-1",
    "category": "ECG & Rhythms",
    "title": "Check the client first",
    "body": "A rhythm matters by whether there is a pulse and whether the client is stable.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-2",
    "category": "ECG & Rhythms",
    "title": "Reading basics",
    "body": "Small box 0.04 s, large box 0.20 s. PR 0.12–0.20 s. QRS under 0.12 s. Rate = R waves in 6 s × 10.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-3",
    "category": "ECG & Rhythms",
    "title": "Shock or cardiovert?",
    "body": "No pulse + shockable rhythm: defibrillate. Pulse but unstable: synchronized cardioversion.",
    "tags": [
      "ecg",
      "acls"
    ]
  },
  {
    "id": "ecg-rhythms-4",
    "category": "ECG & Rhythms",
    "title": "VF / pulseless VT",
    "body": "CPR and defibrillate at once, then epinephrine and amiodarone.",
    "tags": [
      "ecg",
      "acls"
    ]
  },
  {
    "id": "ecg-rhythms-5",
    "category": "ECG & Rhythms",
    "title": "Asystole / PEA",
    "body": "CPR and epinephrine. Do not shock. Look for reversible causes.",
    "tags": [
      "ecg",
      "acls"
    ]
  },
  {
    "id": "ecg-rhythms-6",
    "category": "ECG & Rhythms",
    "title": "SVT",
    "body": "Narrow QRS 150–250. Vagal maneuvers, then adenosine rapid push with flush (brief asystole expected).",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-7",
    "category": "ECG & Rhythms",
    "title": "Atrial fibrillation",
    "body": "Irregularly irregular, no P waves. Rate control, anticoagulation; cardiovert if unstable.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-8",
    "category": "ECG & Rhythms",
    "title": "Symptomatic bradycardia",
    "body": "Atropine, then pacing.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-9",
    "category": "ECG & Rhythms",
    "title": "VT with a pulse",
    "body": "Stable: amiodarone. Unstable: synchronized cardioversion.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-10",
    "category": "ECG & Rhythms",
    "title": "Torsades de pointes",
    "body": "Twisting wide QRS. IV magnesium sulfate.",
    "tags": [
      "ecg",
      "magnesium"
    ]
  },
  {
    "id": "ecg-rhythms-11",
    "category": "ECG & Rhythms",
    "title": "PVCs",
    "body": "Check oxygen, potassium, magnesium. Report runs, more than 6/min, or R-on-T.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-12",
    "category": "ECG & Rhythms",
    "title": "Heart blocks",
    "body": "1st degree: monitor. 2nd type I: usually benign. 2nd type II and 3rd degree: pacing.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "ecg-rhythms-13",
    "category": "ECG & Rhythms",
    "title": "MI on ECG",
    "body": "T inversion/ST depression = ischemia; ST elevation = injury; Q wave = infarction.",
    "tags": [
      "ecg",
      "cardiac"
    ]
  },
  {
    "id": "ecg-rhythms-14",
    "category": "ECG & Rhythms",
    "title": "Inferior MI",
    "body": "Leads II, III, aVF (RCA). Watch for bradycardia; avoid nitroglycerin if the right ventricle is involved.",
    "tags": [
      "ecg",
      "cardiac"
    ]
  },
  {
    "id": "ecg-rhythms-15",
    "category": "ECG & Rhythms",
    "title": "CPR",
    "body": "100–120/min, at least 2 in. deep for adults, full recoil, 30:2. Children and infants 15:2 with two rescuers.",
    "tags": [
      "acls"
    ]
  },
  {
    "id": "pharm-name-endings-1",
    "category": "Pharm: Name Endings",
    "title": "-pril (ACE inhibitor)",
    "body": "Dry cough, angioedema, high K+, first-dose hypotension. Not in pregnancy. No salt substitutes.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-name-endings-2",
    "category": "Pharm: Name Endings",
    "title": "-sartan (ARB)",
    "body": "Like ACE inhibitors without the cough. Not in pregnancy.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-name-endings-3",
    "category": "Pharm: Name Endings",
    "title": "-olol (beta blocker)",
    "body": "Hold if HR under 60 or SBP under 90. Masks hypoglycemia. Never stop abruptly. Non-selective → bronchospasm.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-name-endings-4",
    "category": "Pharm: Name Endings",
    "title": "-dipine (CCB)",
    "body": "Low BP, ankle edema, gum overgrowth. No grapefruit. Verapamil/diltiazem also slow the heart.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-name-endings-5",
    "category": "Pharm: Name Endings",
    "title": "-osin (alpha blocker)",
    "body": "Orthostatic dizziness; give at bedtime. Also for enlarged prostate.",
    "tags": [
      "cardiac",
      "gu"
    ]
  },
  {
    "id": "pharm-name-endings-6",
    "category": "Pharm: Name Endings",
    "title": "-statin",
    "body": "Report muscle pain (rhabdomyolysis). Check liver enzymes. Not in pregnancy. No grapefruit.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-name-endings-7",
    "category": "Pharm: Name Endings",
    "title": "Loop diuretics (-semide)",
    "body": "Low K+, dehydration, ototoxicity if pushed fast. Give in the morning.",
    "tags": [
      "cardiac",
      "potassium"
    ]
  },
  {
    "id": "pharm-name-endings-8",
    "category": "Pharm: Name Endings",
    "title": "-thiazide",
    "body": "Low K+ and Na+; high calcium, glucose and uric acid.",
    "tags": [
      "cardiac",
      "potassium"
    ]
  },
  {
    "id": "pharm-name-endings-9",
    "category": "Pharm: Name Endings",
    "title": "-actone (K+-sparing)",
    "body": "High potassium. Do not pair with K+ supplements or salt substitutes.",
    "tags": [
      "cardiac",
      "potassium"
    ]
  },
  {
    "id": "pharm-name-endings-10",
    "category": "Pharm: Name Endings",
    "title": "-afil",
    "body": "Never with nitrates: severe hypotension.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-name-endings-11",
    "category": "Pharm: Name Endings",
    "title": "-parin",
    "body": "Heparin: aPTT and platelets (HIT). Enoxaparin: abdomen, keep the air bubble, do not rub.",
    "tags": [
      "anticoagulant"
    ]
  },
  {
    "id": "pharm-name-endings-12",
    "category": "Pharm: Name Endings",
    "title": "-xaban / -gatran",
    "body": "Factor Xa / thrombin inhibitors. No routine labs; bleeding risk. Dabigatran stays in its original container.",
    "tags": [
      "anticoagulant"
    ]
  },
  {
    "id": "pharm-name-endings-13",
    "category": "Pharm: Name Endings",
    "title": "-grel / -plase",
    "body": "Antiplatelet (bleeding; stop before surgery) / clot buster (major bleeding; not after recent surgery or stroke).",
    "tags": [
      "anticoagulant"
    ]
  },
  {
    "id": "pharm-name-endings-14",
    "category": "Pharm: Name Endings",
    "title": "-terol",
    "body": "Beta-2 agonist. Albuterol = rescue. Salmeterol = long-acting, never for rescue. Tremor, fast pulse.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "pharm-name-endings-15",
    "category": "Pharm: Name Endings",
    "title": "-tropium",
    "body": "Inhaled anticholinergic. Dry mouth.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "pharm-name-endings-16",
    "category": "Pharm: Name Endings",
    "title": "-sone / -solone / -onide",
    "body": "Inhaled: rinse mouth (thrush), bronchodilator first. Systemic: high glucose, infection, bone loss; taper.",
    "tags": [
      "respiratory",
      "endocrine"
    ]
  },
  {
    "id": "pharm-name-endings-17",
    "category": "Pharm: Name Endings",
    "title": "-lukast",
    "body": "Prevention only, evening dose. Report mood changes.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "pharm-name-endings-18",
    "category": "Pharm: Name Endings",
    "title": "-phylline",
    "body": "Narrow range 10–20. Toxicity = fast pulse, seizures. Avoid caffeine.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "pharm-name-endings-19",
    "category": "Pharm: Name Endings",
    "title": "-prazole (PPI)",
    "body": "30–60 min before breakfast. Long-term: fractures, low Mg and B12, C. diff.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "pharm-name-endings-20",
    "category": "Pharm: Name Endings",
    "title": "-tidine (H2 blocker)",
    "body": "Usually at bedtime. Confusion possible in older adults.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "pharm-name-endings-21",
    "category": "Pharm: Name Endings",
    "title": "-setron",
    "body": "Antiemetic. Headache, constipation, long QT.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "pharm-name-endings-22",
    "category": "Pharm: Name Endings",
    "title": "-dronate",
    "body": "Empty stomach, full glass of water, stay upright 30 min.",
    "tags": [
      "bone"
    ]
  },
  {
    "id": "pharm-name-endings-23",
    "category": "Pharm: Name Endings",
    "title": "-triptan",
    "body": "Migraine. Constricts vessels: not with coronary disease or uncontrolled HTN.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "pharm-name-endings-24",
    "category": "Pharm: Name Endings",
    "title": "-mab",
    "body": "Monoclonal antibody. Infection risk, infusion reactions. TB test before starting.",
    "tags": [
      "immune"
    ]
  },
  {
    "id": "pharm-name-endings-25",
    "category": "Pharm: Name Endings",
    "title": "-cillin / cef-",
    "body": "Allergy check first; possible cross-reaction between penicillins and cephalosporins.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-name-endings-26",
    "category": "Pharm: Name Endings",
    "title": "-floxacin",
    "body": "Tendon rupture, long QT, sun sensitivity. Not in children or pregnancy. Separate from antacids, iron, dairy.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-name-endings-27",
    "category": "Pharm: Name Endings",
    "title": "-cycline",
    "body": "Stains teeth (not under 8 or in pregnancy). No dairy, antacids or iron. Sun sensitivity.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-name-endings-28",
    "category": "Pharm: Name Endings",
    "title": "-thromycin",
    "body": "Macrolide. GI upset, long QT.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-name-endings-29",
    "category": "Pharm: Name Endings",
    "title": "-pam / -lam",
    "body": "Benzodiazepines. Sedation, dependence, falls. Antidote flumazenil.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-name-endings-30",
    "category": "Pharm: Name Endings",
    "title": "-apine / -idone",
    "body": "Atypical antipsychotics. Weight gain, high glucose and lipids. Clozapine: monitor WBC/ANC.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-hubs-interactions-1",
    "category": "Pharm: Hubs & Interactions",
    "title": "Anticholinergic effects",
    "body": "Can't see, can't pee, can't spit, can't poop. Avoid in narrow-angle glaucoma and BPH.",
    "tags": [
      "autonomic"
    ]
  },
  {
    "id": "pharm-hubs-interactions-2",
    "category": "Pharm: Hubs & Interactions",
    "title": "Cholinergic crisis",
    "body": "Salivation, tears, urination, diarrhea, slow pulse, small pupils. Reverse with atropine.",
    "tags": [
      "autonomic"
    ]
  },
  {
    "id": "pharm-hubs-interactions-3",
    "category": "Pharm: Hubs & Interactions",
    "title": "Beta-1 vs beta-2",
    "body": "Beta-1 acts on the heart (1 heart); beta-2 on the lungs (2 lungs).",
    "tags": [
      "autonomic"
    ]
  },
  {
    "id": "pharm-hubs-interactions-4",
    "category": "Pharm: Hubs & Interactions",
    "title": "Potassium-lowering drugs",
    "body": "Loop and thiazide diuretics, steroids, insulin, albuterol, amphotericin B.",
    "tags": [
      "potassium"
    ]
  },
  {
    "id": "pharm-hubs-interactions-5",
    "category": "Pharm: Hubs & Interactions",
    "title": "Potassium-raising drugs",
    "body": "ACE inhibitors, ARBs, spironolactone, K+ supplements, salt substitutes.",
    "tags": [
      "potassium"
    ]
  },
  {
    "id": "pharm-hubs-interactions-6",
    "category": "Pharm: Hubs & Interactions",
    "title": "Bleeding hub",
    "body": "Heparin, warfarin, -xaban, aspirin, clopidogrel, NSAIDs, clot busters, ginkgo, garlic, ginger.",
    "tags": [
      "bleeding"
    ]
  },
  {
    "id": "pharm-hubs-interactions-7",
    "category": "Pharm: Hubs & Interactions",
    "title": "Long QT hub",
    "body": "Amiodarone, sotalol, haloperidol, ondansetron, fluoroquinolones, macrolides, methadone.",
    "tags": [
      "ecg"
    ]
  },
  {
    "id": "pharm-hubs-interactions-8",
    "category": "Pharm: Hubs & Interactions",
    "title": "Nephrotoxic hub",
    "body": "Aminoglycosides, vancomycin, NSAIDs, contrast, amphotericin B, lithium, cisplatin.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "pharm-hubs-interactions-9",
    "category": "Pharm: Hubs & Interactions",
    "title": "Ototoxic hub",
    "body": "Aminoglycosides, vancomycin, loop diuretics, aspirin.",
    "tags": [
      "hearing"
    ]
  },
  {
    "id": "pharm-hubs-interactions-10",
    "category": "Pharm: Hubs & Interactions",
    "title": "Hepatotoxic hub",
    "body": "Acetaminophen, statins, isoniazid, rifampin, methotrexate, valproate, azoles.",
    "tags": [
      "liver"
    ]
  },
  {
    "id": "pharm-hubs-interactions-11",
    "category": "Pharm: Hubs & Interactions",
    "title": "Serotonin syndrome",
    "body": "SSRIs, SNRIs, MAOIs, TCAs, triptans, tramadol, linezolid, St John's wort. Agitation, fever, tremor, clonus.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-hubs-interactions-12",
    "category": "Pharm: Hubs & Interactions",
    "title": "Never stop suddenly",
    "body": "Beta blockers, clonidine, steroids, benzodiazepines, antiseizure drugs, antidepressants. Taper.",
    "tags": [
      "safety"
    ]
  },
  {
    "id": "pharm-hubs-interactions-13",
    "category": "Pharm: Hubs & Interactions",
    "title": "Low WBC hub",
    "body": "Chemotherapy, clozapine, carbamazepine, methimazole, PTU. Report sore throat or fever.",
    "tags": [
      "hematology"
    ]
  },
  {
    "id": "pharm-hubs-interactions-14",
    "category": "Pharm: Hubs & Interactions",
    "title": "Furosemide + digoxin",
    "body": "Furosemide lowers K+; low K+ raises digoxin toxicity. Check K+ before digoxin.",
    "tags": [
      "potassium",
      "cardiac"
    ]
  },
  {
    "id": "pharm-hubs-interactions-15",
    "category": "Pharm: Hubs & Interactions",
    "title": "Lithium follows sodium",
    "body": "Low sodium (diuretics, sweating, low-salt diet) → kidney holds lithium → toxicity.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-hubs-interactions-16",
    "category": "Pharm: Hubs & Interactions",
    "title": "Warfarin + antibiotics",
    "body": "Antibiotics kill vitamin K–making gut bacteria → INR rises.",
    "tags": [
      "anticoagulant"
    ]
  },
  {
    "id": "pharm-hubs-interactions-17",
    "category": "Pharm: Hubs & Interactions",
    "title": "Metformin + contrast",
    "body": "Risk of kidney injury and lactic acidosis. Hold metformin around the scan.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "pharm-hubs-interactions-18",
    "category": "Pharm: Hubs & Interactions",
    "title": "MAOI + tyramine",
    "body": "Hypertensive crisis. Avoid aged cheese, cured meat, wine, soy sauce.",
    "tags": [
      "psych",
      "diet"
    ]
  },
  {
    "id": "pharm-hubs-interactions-19",
    "category": "Pharm: Hubs & Interactions",
    "title": "Binding minerals",
    "body": "Antacids, calcium, iron and dairy bind tetracyclines, fluoroquinolones and levothyroxine. Separate ≥ 2 h.",
    "tags": [
      "interactions"
    ]
  },
  {
    "id": "pharm-hubs-interactions-20",
    "category": "Pharm: Hubs & Interactions",
    "title": "Grapefruit",
    "body": "Avoid with statins, calcium channel blockers, cyclosporine, buspirone.",
    "tags": [
      "interactions"
    ]
  },
  {
    "id": "pharm-hubs-interactions-21",
    "category": "Pharm: Hubs & Interactions",
    "title": "Warfarin diet",
    "body": "Keep vitamin K (leafy greens) consistent, not eliminated.",
    "tags": [
      "anticoagulant",
      "diet"
    ]
  },
  {
    "id": "antidotes-drug-levels-1",
    "category": "Antidotes & Drug Levels",
    "title": "Opioids",
    "body": "Naloxone. It wears off before many opioids, so keep monitoring.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-2",
    "category": "Antidotes & Drug Levels",
    "title": "Benzodiazepines",
    "body": "Flumazenil.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-3",
    "category": "Antidotes & Drug Levels",
    "title": "Heparin",
    "body": "Protamine sulfate.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-4",
    "category": "Antidotes & Drug Levels",
    "title": "Warfarin",
    "body": "Vitamin K (phytonadione).",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-5",
    "category": "Antidotes & Drug Levels",
    "title": "Dabigatran / Xa inhibitors",
    "body": "Idarucizumab / andexanet alfa.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-6",
    "category": "Antidotes & Drug Levels",
    "title": "Acetaminophen",
    "body": "Acetylcysteine.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-7",
    "category": "Antidotes & Drug Levels",
    "title": "Digoxin",
    "body": "Digoxin immune Fab.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-8",
    "category": "Antidotes & Drug Levels",
    "title": "Magnesium sulfate",
    "body": "Calcium gluconate.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-9",
    "category": "Antidotes & Drug Levels",
    "title": "Beta blockers",
    "body": "Glucagon.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-10",
    "category": "Antidotes & Drug Levels",
    "title": "Iron / lead",
    "body": "Deferoxamine / succimer.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-11",
    "category": "Antidotes & Drug Levels",
    "title": "Organophosphates",
    "body": "Atropine (plus pralidoxime).",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-12",
    "category": "Antidotes & Drug Levels",
    "title": "Anticholinergics",
    "body": "Physostigmine.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-13",
    "category": "Antidotes & Drug Levels",
    "title": "Methotrexate",
    "body": "Leucovorin.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-14",
    "category": "Antidotes & Drug Levels",
    "title": "TCAs / aspirin",
    "body": "Sodium bicarbonate.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-15",
    "category": "Antidotes & Drug Levels",
    "title": "Carbon monoxide / cyanide",
    "body": "100% oxygen / hydroxocobalamin.",
    "tags": [
      "antidote"
    ]
  },
  {
    "id": "antidotes-drug-levels-16",
    "category": "Antidotes & Drug Levels",
    "title": "Digoxin level",
    "body": "0.5–2.0 ng/mL. Toxicity: nausea, anorexia, yellow-green halos, bradycardia.",
    "tags": [
      "drug-level"
    ]
  },
  {
    "id": "antidotes-drug-levels-17",
    "category": "Antidotes & Drug Levels",
    "title": "Lithium level",
    "body": "0.6–1.2 mEq/L. Toxic above 1.5: coarse tremor, vomiting, diarrhea, confusion.",
    "tags": [
      "drug-level",
      "psych"
    ]
  },
  {
    "id": "antidotes-drug-levels-18",
    "category": "Antidotes & Drug Levels",
    "title": "Phenytoin level",
    "body": "10–20 mcg/mL. Toxicity: nystagmus, ataxia, slurred speech.",
    "tags": [
      "drug-level",
      "neuro"
    ]
  },
  {
    "id": "antidotes-drug-levels-19",
    "category": "Antidotes & Drug Levels",
    "title": "Theophylline level",
    "body": "10–20 mcg/mL. Toxicity: tachycardia, restlessness, seizures.",
    "tags": [
      "drug-level"
    ]
  },
  {
    "id": "antidotes-drug-levels-20",
    "category": "Antidotes & Drug Levels",
    "title": "Vancomycin trough",
    "body": "10–20 mcg/mL. Kidney and hearing damage.",
    "tags": [
      "drug-level"
    ]
  },
  {
    "id": "antidotes-drug-levels-21",
    "category": "Antidotes & Drug Levels",
    "title": "Mg sulfate (OB)",
    "body": "4–7 mEq/L therapeutic. Lost reflexes and slow breathing = toxic.",
    "tags": [
      "drug-level",
      "ob"
    ]
  },
  {
    "id": "antidotes-drug-levels-22",
    "category": "Antidotes & Drug Levels",
    "title": "Peak vs trough",
    "body": "Trough just before the next dose. Peak 30–60 min after an IV dose ends.",
    "tags": [
      "drug-level"
    ]
  },
  {
    "id": "insulin-diabetes-1",
    "category": "Insulin & Diabetes",
    "title": "Rapid insulin",
    "body": "Lispro, aspart: onset 15 min, peak 1 h. Food must be in front of the client.",
    "tags": [
      "insulin"
    ]
  },
  {
    "id": "insulin-diabetes-2",
    "category": "Insulin & Diabetes",
    "title": "Regular insulin",
    "body": "Onset 30–60 min, peak 2–4 h. The only insulin given IV.",
    "tags": [
      "insulin"
    ]
  },
  {
    "id": "insulin-diabetes-3",
    "category": "Insulin & Diabetes",
    "title": "NPH",
    "body": "Onset 1–2 h, peak 4–12 h. Cloudy. Hypoglycemia risk mid-afternoon.",
    "tags": [
      "insulin"
    ]
  },
  {
    "id": "insulin-diabetes-4",
    "category": "Insulin & Diabetes",
    "title": "Glargine / detemir",
    "body": "No peak, ~24 h. Never mix with other insulins.",
    "tags": [
      "insulin"
    ]
  },
  {
    "id": "insulin-diabetes-5",
    "category": "Insulin & Diabetes",
    "title": "Mixing insulin",
    "body": "Clear before cloudy: regular, then NPH.",
    "tags": [
      "insulin"
    ]
  },
  {
    "id": "insulin-diabetes-6",
    "category": "Insulin & Diabetes",
    "title": "Hypoglycemia",
    "body": "Under 70: 15 g fast carbs, recheck in 15 min, then a snack. Unconscious: IV D50 or glucagon.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "insulin-diabetes-7",
    "category": "Insulin & Diabetes",
    "title": "Sick-day rules",
    "body": "Keep taking insulin, check glucose every 4 h, test ketones, drink fluids.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "insulin-diabetes-8",
    "category": "Insulin & Diabetes",
    "title": "Metformin",
    "body": "No hypoglycemia alone. GI upset. Lactic acidosis. Hold around contrast. Avoid alcohol.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "insulin-diabetes-9",
    "category": "Insulin & Diabetes",
    "title": "Sulfonylureas",
    "body": "Glipizide, glyburide: hypoglycemia, weight gain. Avoid alcohol.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "insulin-diabetes-10",
    "category": "Insulin & Diabetes",
    "title": "-gliflozin (SGLT2)",
    "body": "Genital yeast and urinary infections, dehydration, euglycemic DKA.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "insulin-diabetes-11",
    "category": "Insulin & Diabetes",
    "title": "-glutide (GLP-1)",
    "body": "Nausea, weight loss, pancreatitis.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "insulin-diabetes-12",
    "category": "Insulin & Diabetes",
    "title": "-glitazone",
    "body": "Fluid retention. Not in heart failure.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "insulin-diabetes-13",
    "category": "Insulin & Diabetes",
    "title": "Beta blocker + diabetes",
    "body": "Hides the fast pulse of hypoglycemia; sweating still shows.",
    "tags": [
      "endocrine",
      "cardiac"
    ]
  },
  {
    "id": "pharm-psych-neuro-1",
    "category": "Pharm: Psych & Neuro",
    "title": "SSRIs",
    "body": "2–6 weeks to work. Sexual dysfunction, insomnia. Suicide risk can rise early as energy returns.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-psych-neuro-2",
    "category": "Pharm: Psych & Neuro",
    "title": "MAOIs",
    "body": "No tyramine; 14-day gap before switching antidepressants.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-psych-neuro-3",
    "category": "Pharm: Psych & Neuro",
    "title": "Lithium care",
    "body": "Steady salt and 2–3 L fluid daily. Avoid NSAIDs and diuretics. Monitor kidneys and thyroid.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-psych-neuro-4",
    "category": "Pharm: Psych & Neuro",
    "title": "Tricyclics",
    "body": "Anticholinergic effects, sedation, dysrhythmias. Dangerous in overdose.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-psych-neuro-5",
    "category": "Pharm: Psych & Neuro",
    "title": "Clozapine",
    "body": "Agranulocytosis (monitor ANC), seizures, myocarditis.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-psych-neuro-6",
    "category": "Pharm: Psych & Neuro",
    "title": "Acute dystonia",
    "body": "Hours to days: neck or eye spasm. Benztropine or diphenhydramine.",
    "tags": [
      "eps"
    ]
  },
  {
    "id": "pharm-psych-neuro-7",
    "category": "Pharm: Psych & Neuro",
    "title": "Tardive dyskinesia",
    "body": "Months to years: lip smacking, tongue movements. Report early; may be permanent.",
    "tags": [
      "eps"
    ]
  },
  {
    "id": "pharm-psych-neuro-8",
    "category": "Pharm: Psych & Neuro",
    "title": "Neuroleptic malignant syndrome",
    "body": "High fever, rigidity, unstable vitals. Stop the drug, cool, dantrolene.",
    "tags": [
      "eps",
      "emergency"
    ]
  },
  {
    "id": "pharm-psych-neuro-9",
    "category": "Pharm: Psych & Neuro",
    "title": "Buspirone",
    "body": "Anxiety; 2–4 weeks; no sedation or dependence.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-psych-neuro-10",
    "category": "Pharm: Psych & Neuro",
    "title": "Disulfiram",
    "body": "No alcohol in any form, including mouthwash and cough syrup.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "pharm-psych-neuro-11",
    "category": "Pharm: Psych & Neuro",
    "title": "Phenytoin",
    "body": "Gum overgrowth (dental care). IV only with normal saline, slowly. Lowers contraceptive effect.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "pharm-psych-neuro-12",
    "category": "Pharm: Psych & Neuro",
    "title": "Carbamazepine / lamotrigine",
    "body": "Low WBC, low sodium, serious rash / stop for any rash.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "pharm-psych-neuro-13",
    "category": "Pharm: Psych & Neuro",
    "title": "Levodopa-carbidopa",
    "body": "Orthostatic hypotension; dark urine harmless; protein reduces absorption.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "pharm-psych-neuro-14",
    "category": "Pharm: Psych & Neuro",
    "title": "Pyridostigmine",
    "body": "Myasthenia gravis. Give on time, 30–45 min before meals.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "pharm-psych-neuro-15",
    "category": "Pharm: Psych & Neuro",
    "title": "Mannitol",
    "body": "Lowers ICP. Use a filter; watch urine output and serum osmolality.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-1",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Every antibiotic",
    "body": "Allergies first, cultures before the first dose, finish the course, report watery diarrhea.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-2",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Aminoglycosides",
    "body": "Gentamicin, tobramycin: kidney and ear toxicity. Peak and trough levels.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-3",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Vancomycin",
    "body": "Infuse over at least 60 min. Flushing of face and neck = slow the infusion.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-4",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Metronidazole",
    "body": "No alcohol during and 3 days after. Metallic taste.",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-5",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Sulfonamides",
    "body": "Push fluids, sun sensitivity, stop for rash (SJS).",
    "tags": [
      "antibiotic"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-6",
    "category": "Pharm: Anti-infectives & Other",
    "title": "RIPE (TB)",
    "body": "Rifampin: orange fluids, weakens contraceptives. Isoniazid: give B6. Ethambutol: vision. Pyrazinamide: uric acid.",
    "tags": [
      "tb"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-7",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Oseltamivir / acyclovir",
    "body": "Start within 48 h of flu symptoms / push fluids to protect the kidneys.",
    "tags": [
      "antiviral"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-8",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Digoxin",
    "body": "Apical pulse 1 full min. Hold under 60 adult, 70 child, 90 infant.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-9",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Nitroglycerin",
    "body": "1 SL tab every 5 min × 3; call EMS if pain persists 5 min after the first. Headache expected.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-10",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Amiodarone",
    "body": "Lung, thyroid and liver toxicity; blue-gray skin; sun protection.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-11",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Levothyroxine",
    "body": "Morning, empty stomach, lifelong. Separate from calcium and iron by 4 h.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-12",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Corticosteroids",
    "body": "High glucose, infection, low K+, bone loss. With food in the morning; taper.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-13",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Opioids",
    "body": "Sedation precedes respiratory depression. Hold for RR under 12. Constipation never wears off.",
    "tags": [
      "pain"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-14",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Acetaminophen",
    "body": "Max 4 g/day (often 3 g); less with liver disease or alcohol use.",
    "tags": [
      "pain",
      "liver"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-15",
    "category": "Pharm: Anti-infectives & Other",
    "title": "Aspirin",
    "body": "Ringing in the ears = toxicity. Never for children with viral illness (Reye).",
    "tags": [
      "pain"
    ]
  },
  {
    "id": "pharm-anti-infectives-other-16",
    "category": "Pharm: Anti-infectives & Other",
    "title": "NSAIDs / ketorolac",
    "body": "With food. GI bleeding, kidney injury. Ketorolac 5 days maximum.",
    "tags": [
      "pain"
    ]
  },
  {
    "id": "med-administration-calculations-1",
    "category": "Med Administration & Calculations",
    "title": "High-alert drugs",
    "body": "Independent double check: insulin, heparin, opioids/PCA, IV potassium, chemotherapy.",
    "tags": [
      "safety"
    ]
  },
  {
    "id": "med-administration-calculations-2",
    "category": "Med Administration & Calculations",
    "title": "Do not crush",
    "body": "Enteric-coated or extended-release (ER, XR, XL, SR, CR, LA).",
    "tags": [
      "safety"
    ]
  },
  {
    "id": "med-administration-calculations-3",
    "category": "Med Administration & Calculations",
    "title": "Injection angles",
    "body": "IM 90°, subcut 45–90°, intradermal 5–15°.",
    "tags": [
      "technique"
    ]
  },
  {
    "id": "med-administration-calculations-4",
    "category": "Med Administration & Calculations",
    "title": "IM sites",
    "body": "Ventrogluteal for adults; vastus lateralis for infants; deltoid for ≤ 1 mL and vaccines. Z-track for iron.",
    "tags": [
      "technique"
    ]
  },
  {
    "id": "med-administration-calculations-5",
    "category": "Med Administration & Calculations",
    "title": "Ear drops",
    "body": "Adults: pinna up and back. Under 3: down and back.",
    "tags": [
      "technique"
    ]
  },
  {
    "id": "med-administration-calculations-6",
    "category": "Med Administration & Calculations",
    "title": "Inhaler order",
    "body": "Bronchodilator first, wait, then steroid, then rinse the mouth.",
    "tags": [
      "technique",
      "respiratory"
    ]
  },
  {
    "id": "med-administration-calculations-7",
    "category": "Med Administration & Calculations",
    "title": "Patches",
    "body": "Remove the old one, rotate sites, never cut, remove before MRI.",
    "tags": [
      "technique"
    ]
  },
  {
    "id": "med-administration-calculations-8",
    "category": "Med Administration & Calculations",
    "title": "Liquid iron",
    "body": "Through a straw, with vitamin C, not with milk. Black stools expected.",
    "tags": [
      "technique"
    ]
  },
  {
    "id": "med-administration-calculations-9",
    "category": "Med Administration & Calculations",
    "title": "Older adults",
    "body": "Start low, go slow. Anticholinergics and benzodiazepines cause confusion and falls.",
    "tags": [
      "geriatric"
    ]
  },
  {
    "id": "med-administration-calculations-10",
    "category": "Med Administration & Calculations",
    "title": "Dose formula",
    "body": "(Desired ÷ on hand) × quantity. 750 mg ordered, 250 mg/5 mL: 15 mL.",
    "tags": [
      "calculation"
    ]
  },
  {
    "id": "med-administration-calculations-11",
    "category": "Med Administration & Calculations",
    "title": "Pump rate",
    "body": "Volume ÷ hours. 1,000 mL over 8 h = 125 mL/h.",
    "tags": [
      "calculation"
    ]
  },
  {
    "id": "med-administration-calculations-12",
    "category": "Med Administration & Calculations",
    "title": "Drip rate",
    "body": "(mL × drop factor) ÷ minutes. 1,000 mL over 8 h at 15 gtt/mL = 31 gtt/min.",
    "tags": [
      "calculation"
    ]
  },
  {
    "id": "med-administration-calculations-13",
    "category": "Med Administration & Calculations",
    "title": "Heparin infusion",
    "body": "25,000 units in 500 mL = 50 units/mL; 1,200 units/h ÷ 50 = 24 mL/h.",
    "tags": [
      "calculation"
    ]
  },
  {
    "id": "med-administration-calculations-14",
    "category": "Med Administration & Calculations",
    "title": "Pediatric maintenance",
    "body": "100 mL/kg for the first 10 kg, 50 mL/kg for the next 10, 20 mL/kg after.",
    "tags": [
      "calculation",
      "peds"
    ]
  },
  {
    "id": "med-administration-calculations-15",
    "category": "Med Administration & Calculations",
    "title": "Conversions",
    "body": "1 kg = 2.2 lb; 1 oz = 30 mL; 1 tsp = 5 mL; 1 tbsp = 15 mL; 1 cup = 240 mL.",
    "tags": [
      "calculation"
    ]
  },
  {
    "id": "med-administration-calculations-16",
    "category": "Med Administration & Calculations",
    "title": "Zeros",
    "body": "Leading zero yes (0.5 mg); trailing zero never (5 mg, not 5.0 mg). Round only at the end.",
    "tags": [
      "calculation",
      "safety"
    ]
  },
  {
    "id": "med-administration-calculations-17",
    "category": "Med Administration & Calculations",
    "title": "Blood transfusion",
    "body": "Two nurses verify; 0.9% saline only; stay the first 15 min; finish within 4 h.",
    "tags": [
      "blood"
    ]
  },
  {
    "id": "med-administration-calculations-18",
    "category": "Med Administration & Calculations",
    "title": "Transfusion reaction",
    "body": "Stop, run saline through NEW tubing, vitals, notify provider and blood bank, return the bag.",
    "tags": [
      "blood",
      "emergency"
    ]
  },
  {
    "id": "med-administration-calculations-19",
    "category": "Med Administration & Calculations",
    "title": "Universal donors",
    "body": "O negative = universal red cell donor; AB positive = universal recipient.",
    "tags": [
      "blood"
    ]
  },
  {
    "id": "med-administration-calculations-20",
    "category": "Med Administration & Calculations",
    "title": "TPN",
    "body": "Central line, own lumen, glucose checks. If the bag runs out, hang 10% dextrose. Never catch up.",
    "tags": [
      "iv"
    ]
  },
  {
    "id": "med-administration-calculations-21",
    "category": "Med Administration & Calculations",
    "title": "Infiltration vs phlebitis",
    "body": "Infiltration: cool, pale, swollen. Phlebitis: red, warm, cord-like. Stop and remove both.",
    "tags": [
      "iv"
    ]
  },
  {
    "id": "med-administration-calculations-22",
    "category": "Med Administration & Calculations",
    "title": "Air embolism",
    "body": "Clamp the line, left side with head down, oxygen, notify.",
    "tags": [
      "iv",
      "emergency"
    ]
  },
  {
    "id": "cardiovascular-shock-1",
    "category": "Cardiovascular & Shock",
    "title": "Acute coronary syndrome",
    "body": "12-lead ECG within 10 min, chewed aspirin, nitroglycerin, oxygen only if SpO2 under 90%, troponins.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "cardiovascular-shock-2",
    "category": "Cardiovascular & Shock",
    "title": "Left vs right heart failure",
    "body": "Left = lungs (crackles, dyspnea, pink frothy sputum). Right = body (JVD, edema, ascites).",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "cardiovascular-shock-3",
    "category": "Cardiovascular & Shock",
    "title": "Heart failure teaching",
    "body": "Daily weight; report 2–3 lb in a day or 5 lb in a week. Limit sodium.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "cardiovascular-shock-4",
    "category": "Cardiovascular & Shock",
    "title": "Arterial vs venous",
    "body": "Arterial: pale, hairless, painful, legs down. Venous: brown, edematous, legs up.",
    "tags": [
      "vascular"
    ]
  },
  {
    "id": "cardiovascular-shock-5",
    "category": "Cardiovascular & Shock",
    "title": "DVT",
    "body": "One-sided calf swelling and warmth. Never massage. Watch for PE.",
    "tags": [
      "vascular"
    ]
  },
  {
    "id": "cardiovascular-shock-6",
    "category": "Cardiovascular & Shock",
    "title": "Cardiac tamponade",
    "body": "Beck triad: low BP, JVD, muffled heart sounds. Pericardiocentesis.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "cardiovascular-shock-7",
    "category": "Cardiovascular & Shock",
    "title": "Pericarditis",
    "body": "Sharp pain worse lying down, relieved by leaning forward; friction rub.",
    "tags": [
      "cardiac"
    ]
  },
  {
    "id": "cardiovascular-shock-8",
    "category": "Cardiovascular & Shock",
    "title": "Septic shock",
    "body": "Cultures, antibiotics within 1 h, 30 mL/kg crystalloid, norepinephrine to MAP ≥ 65.",
    "tags": [
      "shock",
      "sepsis"
    ]
  },
  {
    "id": "cardiovascular-shock-9",
    "category": "Cardiovascular & Shock",
    "title": "Anaphylaxis",
    "body": "IM epinephrine in the mid-outer thigh first; repeat in 5–15 min if needed.",
    "tags": [
      "shock",
      "emergency"
    ]
  },
  {
    "id": "cardiovascular-shock-10",
    "category": "Cardiovascular & Shock",
    "title": "Neurogenic shock",
    "body": "Injury above T6: hypotension WITH bradycardia, warm dry skin.",
    "tags": [
      "shock",
      "neuro"
    ]
  },
  {
    "id": "cardiovascular-shock-11",
    "category": "Cardiovascular & Shock",
    "title": "Children in shock",
    "body": "Hypotension is a late sign; tachycardia and poor perfusion come first.",
    "tags": [
      "shock",
      "peds"
    ]
  },
  {
    "id": "respiratory-1",
    "category": "Respiratory",
    "title": "Hypoxia",
    "body": "Early: restlessness, anxiety, tachycardia. Late: confusion, cyanosis, bradycardia.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "respiratory-2",
    "category": "Respiratory",
    "title": "COPD",
    "body": "SpO2 target 88–92%. Pursed-lip breathing, tripod position, small high-calorie meals.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "respiratory-3",
    "category": "Respiratory",
    "title": "Silent chest",
    "body": "In a distressed asthmatic, almost no air is moving: emergency.",
    "tags": [
      "respiratory",
      "emergency"
    ]
  },
  {
    "id": "respiratory-4",
    "category": "Respiratory",
    "title": "Oxygen devices",
    "body": "Nasal cannula 1–6 L. Simple mask ≥ 5 L. Venturi = most precise. Non-rebreather 10–15 L.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "respiratory-5",
    "category": "Respiratory",
    "title": "Tension pneumothorax",
    "body": "Trachea deviates away, absent breath sounds, hypotension. Needle decompression.",
    "tags": [
      "respiratory",
      "emergency"
    ]
  },
  {
    "id": "respiratory-6",
    "category": "Respiratory",
    "title": "Pulmonary embolism",
    "body": "Sudden dyspnea, pleuritic pain, tachycardia, anxiety. HOB up, oxygen, anticoagulation.",
    "tags": [
      "respiratory",
      "emergency"
    ]
  },
  {
    "id": "respiratory-7",
    "category": "Respiratory",
    "title": "Chest tube",
    "body": "Tidaling normal; continuous bubbling = leak. Keep below the chest. Disconnected: end in sterile water.",
    "tags": [
      "respiratory",
      "tubes"
    ]
  },
  {
    "id": "respiratory-8",
    "category": "Respiratory",
    "title": "Chest tube pulled out",
    "body": "Cover with a sterile dressing taped on three sides.",
    "tags": [
      "respiratory",
      "tubes"
    ]
  },
  {
    "id": "respiratory-9",
    "category": "Respiratory",
    "title": "Tracheostomy suction",
    "body": "Pre-oxygenate, suction while withdrawing only, 10 seconds max.",
    "tags": [
      "respiratory",
      "tubes"
    ]
  },
  {
    "id": "respiratory-10",
    "category": "Respiratory",
    "title": "Ventilator alarms",
    "body": "High pressure = obstruction (secretions, kink, biting). Low pressure = leak or disconnection.",
    "tags": [
      "respiratory"
    ]
  },
  {
    "id": "respiratory-11",
    "category": "Respiratory",
    "title": "Pneumonia in older adults",
    "body": "New confusion may be the first sign.",
    "tags": [
      "respiratory",
      "geriatric"
    ]
  },
  {
    "id": "neurological-1",
    "category": "Neurological",
    "title": "Stroke",
    "body": "BE-FAST. CT first. Alteplase within 4.5 h if no bleed and BP under 185/110. NPO until swallow screen.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "neurological-2",
    "category": "Neurological",
    "title": "Left vs right stroke",
    "body": "Left: speech and language, slow and cautious. Right: left neglect, impulsive, safety risk.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "neurological-3",
    "category": "Neurological",
    "title": "Raised ICP",
    "body": "Earliest sign: LOC change. Late: Cushing triad. HOB 30°, head midline, no hip flexion.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "neurological-4",
    "category": "Neurological",
    "title": "GCS",
    "body": "3–15. 8 or less: protect the airway.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "neurological-5",
    "category": "Neurological",
    "title": "Autonomic dysreflexia",
    "body": "T6 or above: pounding headache, very high BP. Sit upright first, then check bladder, bowel, skin.",
    "tags": [
      "neuro",
      "emergency"
    ]
  },
  {
    "id": "neurological-6",
    "category": "Neurological",
    "title": "Basilar skull fracture",
    "body": "Battle sign, raccoon eyes, clear fluid from nose or ear. No nasal tubes or suctioning.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "neurological-7",
    "category": "Neurological",
    "title": "Meningitis",
    "body": "Stiff neck, Kernig and Brudzinski signs. Droplet precautions until 24 h of antibiotics.",
    "tags": [
      "neuro",
      "isolation"
    ]
  },
  {
    "id": "neurological-8",
    "category": "Neurological",
    "title": "Myasthenia vs Guillain-Barré",
    "body": "MG: ptosis, weakness worse with activity. GBS: ascending paralysis; watch vital capacity.",
    "tags": [
      "neuro"
    ]
  },
  {
    "id": "neurological-9",
    "category": "Neurological",
    "title": "Delirium vs dementia",
    "body": "Delirium: sudden, fluctuating, reversible. Dementia: gradual, progressive.",
    "tags": [
      "neuro",
      "geriatric"
    ]
  },
  {
    "id": "neurological-10",
    "category": "Neurological",
    "title": "Eye emergencies",
    "body": "Halos + fixed mid-dilated pupil = angle-closure glaucoma. Curtain over vision = retinal detachment.",
    "tags": [
      "eye"
    ]
  },
  {
    "id": "endocrine-1",
    "category": "Endocrine",
    "title": "Addison vs Cushing",
    "body": "Addison: low Na+, high K+, low BP, bronze skin. Cushing: high Na+ and glucose, low K+, moon face.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "endocrine-2",
    "category": "Endocrine",
    "title": "DI vs SIADH",
    "body": "DI: huge dilute urine, high Na+, SG under 1.005. SIADH: water retention, low Na+.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "endocrine-3",
    "category": "Endocrine",
    "title": "Hypo vs hyperthyroid",
    "body": "Hypo: cold, slow, weight gain. Hyper: hot, fast, weight loss. Crises: myxedema coma / thyroid storm.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "endocrine-4",
    "category": "Endocrine",
    "title": "DKA vs HHS",
    "body": "DKA: type 1, ketones, Kussmaul. HHS: type 2, glucose above 600, no ketones. Both: fluids first, then insulin.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "endocrine-5",
    "category": "Endocrine",
    "title": "Potassium in DKA",
    "body": "Check K+ before insulin; insulin drives K+ into cells. Add dextrose when glucose nears 250.",
    "tags": [
      "endocrine",
      "potassium"
    ]
  },
  {
    "id": "endocrine-6",
    "category": "Endocrine",
    "title": "Diabetic foot care",
    "body": "Inspect daily, dry between toes, nails straight across, never barefoot, no heating pads.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "endocrine-7",
    "category": "Endocrine",
    "title": "Pheochromocytoma",
    "body": "Episodic severe hypertension. Do not palpate the abdomen.",
    "tags": [
      "endocrine"
    ]
  },
  {
    "id": "gi-renal-1",
    "category": "GI & Renal",
    "title": "Upper vs lower GI bleed",
    "body": "Coffee-ground emesis or melena = upper. Bright red per rectum = lower. Two large-bore IVs.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "gi-renal-2",
    "category": "GI & Renal",
    "title": "Gastric vs duodenal ulcer",
    "body": "Gastric: worse with food. Duodenal: 2–3 h after meals and at night, relieved by food.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "gi-renal-3",
    "category": "GI & Renal",
    "title": "Crohn vs ulcerative colitis",
    "body": "Crohn: anywhere, patchy, fistulas. UC: colon only, continuous, bloody diarrhea.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "gi-renal-4",
    "category": "GI & Renal",
    "title": "Appendicitis",
    "body": "RLQ pain, rebound tenderness. No heat, laxatives or enemas. Sudden relief = rupture.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "gi-renal-5",
    "category": "GI & Renal",
    "title": "Pancreatitis",
    "body": "Epigastric pain to the back, high lipase. NPO, fluids. Cullen/Grey Turner = bleeding.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "gi-renal-6",
    "category": "GI & Renal",
    "title": "Cirrhosis",
    "body": "Ascites, jaundice, asterixis (high ammonia). Lactulose, low sodium, no alcohol.",
    "tags": [
      "gi",
      "liver"
    ]
  },
  {
    "id": "gi-renal-7",
    "category": "GI & Renal",
    "title": "Stoma",
    "body": "Healthy = pink and moist. Dusky, purple or black = report. Empty at 1/3–1/2 full.",
    "tags": [
      "gi"
    ]
  },
  {
    "id": "gi-renal-8",
    "category": "GI & Renal",
    "title": "NG / feeding tube",
    "body": "X-ray before first use; then pH 5 or below. HOB ≥ 30° during and 1 h after feeds.",
    "tags": [
      "gi",
      "tubes"
    ]
  },
  {
    "id": "gi-renal-9",
    "category": "GI & Renal",
    "title": "Dumping syndrome",
    "body": "Small dry meals, low simple carbs, no fluids with meals, lie down after eating.",
    "tags": [
      "gi",
      "diet"
    ]
  },
  {
    "id": "gi-renal-10",
    "category": "GI & Renal",
    "title": "AV fistula",
    "body": "Feel the thrill, hear the bruit. No BP, IV or blood draws in that arm.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "gi-renal-11",
    "category": "GI & Renal",
    "title": "Peritoneal dialysis",
    "body": "Cloudy outflow = peritonitis. Poor outflow: turn side to side, check kinks.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "gi-renal-12",
    "category": "GI & Renal",
    "title": "Kidney stones",
    "body": "Flank pain to the groin. 2–3 L fluid daily, strain all urine.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "gi-renal-13",
    "category": "GI & Renal",
    "title": "CBI after TURP",
    "body": "Keep urine light pink. True output = total out minus irrigant in.",
    "tags": [
      "renal"
    ]
  },
  {
    "id": "msk-burns-peri-op-1",
    "category": "MSK, Burns & Peri-op",
    "title": "Compartment syndrome",
    "body": "Pain out of proportion, pain on passive stretch. Loosen the cast, limb at heart level, no ice.",
    "tags": [
      "msk",
      "emergency"
    ]
  },
  {
    "id": "msk-burns-peri-op-2",
    "category": "MSK, Burns & Peri-op",
    "title": "Fat embolism",
    "body": "24–72 h after long-bone fracture: dyspnea, confusion, chest petechiae.",
    "tags": [
      "msk"
    ]
  },
  {
    "id": "msk-burns-peri-op-3",
    "category": "MSK, Burns & Peri-op",
    "title": "After hip replacement",
    "body": "No flexion past 90°, no crossing legs, abduction pillow, raised toilet seat.",
    "tags": [
      "msk"
    ]
  },
  {
    "id": "msk-burns-peri-op-4",
    "category": "MSK, Burns & Peri-op",
    "title": "Amputation",
    "body": "Elevate the stump for 24 h only; then prone several times daily.",
    "tags": [
      "msk"
    ]
  },
  {
    "id": "msk-burns-peri-op-5",
    "category": "MSK, Burns & Peri-op",
    "title": "Crutches & cane",
    "body": "Up with the good, down with the bad. Cane on the strong side.",
    "tags": [
      "msk",
      "mobility"
    ]
  },
  {
    "id": "msk-burns-peri-op-6",
    "category": "MSK, Burns & Peri-op",
    "title": "Burn airway",
    "body": "Singed nasal hair, soot, hoarseness = early intubation. CO poisoning: 100% O2 (SpO2 falsely normal).",
    "tags": [
      "burns"
    ]
  },
  {
    "id": "msk-burns-peri-op-7",
    "category": "MSK, Burns & Peri-op",
    "title": "Parkland formula",
    "body": "4 mL × kg × % TBSA (LR) in 24 h; half in the first 8 h from the time of the burn.",
    "tags": [
      "burns",
      "calculation"
    ]
  },
  {
    "id": "msk-burns-peri-op-8",
    "category": "MSK, Burns & Peri-op",
    "title": "Rule of nines",
    "body": "Head 9, each arm 9, each leg 18, front 18, back 18, perineum 1.",
    "tags": [
      "burns"
    ]
  },
  {
    "id": "msk-burns-peri-op-9",
    "category": "MSK, Burns & Peri-op",
    "title": "Malignant hyperthermia",
    "body": "Rigidity, rising CO2, tachycardia, then fever. Stop anesthetic, dantrolene, cool.",
    "tags": [
      "periop",
      "emergency"
    ]
  },
  {
    "id": "msk-burns-peri-op-10",
    "category": "MSK, Burns & Peri-op",
    "title": "Evisceration",
    "body": "Low Fowler, knees bent, cover with sterile saline gauze, stay, call for help.",
    "tags": [
      "periop",
      "emergency"
    ]
  },
  {
    "id": "msk-burns-peri-op-11",
    "category": "MSK, Burns & Peri-op",
    "title": "Pressure injury stages",
    "body": "1 non-blanching red; 2 partial thickness; 3 into fat; 4 muscle/bone; unstageable = slough/eschar.",
    "tags": [
      "skin"
    ]
  },
  {
    "id": "positions-1",
    "category": "Positions",
    "title": "Raised ICP",
    "body": "HOB 30°, head midline, no hip flexion.",
    "tags": [
      "position",
      "neuro"
    ]
  },
  {
    "id": "positions-2",
    "category": "Positions",
    "title": "Air embolism",
    "body": "Left side, head down.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-3",
    "category": "Positions",
    "title": "Autonomic dysreflexia",
    "body": "Sit upright first.",
    "tags": [
      "position",
      "neuro"
    ]
  },
  {
    "id": "positions-4",
    "category": "Positions",
    "title": "Shock",
    "body": "Flat with legs raised.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-5",
    "category": "Positions",
    "title": "After liver biopsy",
    "body": "Right side.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-6",
    "category": "Positions",
    "title": "Thoracentesis",
    "body": "Sitting, leaning over a table.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-7",
    "category": "Positions",
    "title": "Lumbar puncture",
    "body": "Side-lying, knees to chest; flat afterward as ordered.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-8",
    "category": "Positions",
    "title": "Enema",
    "body": "Left side-lying with right knee bent.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-9",
    "category": "Positions",
    "title": "Tube feeding",
    "body": "HOB 30–45°.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-10",
    "category": "Positions",
    "title": "After tonsillectomy",
    "body": "Side-lying or prone until awake.",
    "tags": [
      "position",
      "peds"
    ]
  },
  {
    "id": "positions-11",
    "category": "Positions",
    "title": "Prolapsed cord",
    "body": "Knee-chest; lift the presenting part off the cord.",
    "tags": [
      "position",
      "ob"
    ]
  },
  {
    "id": "positions-12",
    "category": "Positions",
    "title": "Late decelerations / supine hypotension",
    "body": "Left side.",
    "tags": [
      "position",
      "ob"
    ]
  },
  {
    "id": "positions-13",
    "category": "Positions",
    "title": "Tet spell",
    "body": "Knee-chest.",
    "tags": [
      "position",
      "peds"
    ]
  },
  {
    "id": "positions-14",
    "category": "Positions",
    "title": "Nosebleed",
    "body": "Sit up, lean forward, pinch the soft part of the nose 10–15 min.",
    "tags": [
      "position"
    ]
  },
  {
    "id": "positions-15",
    "category": "Positions",
    "title": "Arterial vs venous disease",
    "body": "Arterial: legs down. Venous: legs elevated.",
    "tags": [
      "position",
      "vascular"
    ]
  },
  {
    "id": "classic-signs-1",
    "category": "Classic Signs",
    "title": "Cushing triad",
    "body": "High BP with widening pulse pressure, bradycardia, irregular breathing → raised ICP.",
    "tags": [
      "sign",
      "neuro"
    ]
  },
  {
    "id": "classic-signs-2",
    "category": "Classic Signs",
    "title": "Beck triad",
    "body": "Low BP, JVD, muffled heart sounds → cardiac tamponade.",
    "tags": [
      "sign",
      "cardiac"
    ]
  },
  {
    "id": "classic-signs-3",
    "category": "Classic Signs",
    "title": "Cullen / Grey Turner",
    "body": "Bruising around the navel / flank → pancreatitis or internal bleeding.",
    "tags": [
      "sign",
      "gi"
    ]
  },
  {
    "id": "classic-signs-4",
    "category": "Classic Signs",
    "title": "Kernig & Brudzinski",
    "body": "Meningitis.",
    "tags": [
      "sign",
      "neuro"
    ]
  },
  {
    "id": "classic-signs-5",
    "category": "Classic Signs",
    "title": "McBurney point",
    "body": "Appendicitis. Sudden relief = rupture.",
    "tags": [
      "sign",
      "gi"
    ]
  },
  {
    "id": "classic-signs-6",
    "category": "Classic Signs",
    "title": "Murphy sign",
    "body": "Cholecystitis.",
    "tags": [
      "sign",
      "gi"
    ]
  },
  {
    "id": "classic-signs-7",
    "category": "Classic Signs",
    "title": "Trousseau & Chvostek",
    "body": "Hypocalcemia (or hypomagnesemia).",
    "tags": [
      "sign",
      "electrolyte"
    ]
  },
  {
    "id": "classic-signs-8",
    "category": "Classic Signs",
    "title": "Butterfly rash",
    "body": "Lupus.",
    "tags": [
      "sign"
    ]
  },
  {
    "id": "classic-signs-9",
    "category": "Classic Signs",
    "title": "Bull's-eye rash",
    "body": "Lyme disease.",
    "tags": [
      "sign"
    ]
  },
  {
    "id": "classic-signs-10",
    "category": "Classic Signs",
    "title": "Strawberry tongue + fever ≥ 5 days",
    "body": "Kawasaki disease.",
    "tags": [
      "sign",
      "peds"
    ]
  },
  {
    "id": "classic-signs-11",
    "category": "Classic Signs",
    "title": "Olive-shaped mass",
    "body": "Pyloric stenosis (projectile, non-bilious vomiting).",
    "tags": [
      "sign",
      "peds"
    ]
  },
  {
    "id": "classic-signs-12",
    "category": "Classic Signs",
    "title": "Currant-jelly stool",
    "body": "Intussusception.",
    "tags": [
      "sign",
      "peds"
    ]
  },
  {
    "id": "classic-signs-13",
    "category": "Classic Signs",
    "title": "Koplik spots",
    "body": "Measles.",
    "tags": [
      "sign",
      "peds"
    ]
  },
  {
    "id": "classic-signs-14",
    "category": "Classic Signs",
    "title": "Never palpate",
    "body": "Wilms tumor and pheochromocytoma. Never inspect the throat in epiglottitis.",
    "tags": [
      "sign",
      "safety"
    ]
  },
  {
    "id": "maternity-newborn-1",
    "category": "Maternity & Newborn",
    "title": "Naegele's rule",
    "body": "First day of LMP − 3 months + 7 days.",
    "tags": [
      "ob"
    ]
  },
  {
    "id": "maternity-newborn-2",
    "category": "Maternity & Newborn",
    "title": "GTPAL",
    "body": "Gravida, Term (≥ 37 wk), Preterm (20–37), Abortions (< 20), Living. Twins = one birth.",
    "tags": [
      "ob"
    ]
  },
  {
    "id": "maternity-newborn-3",
    "category": "Maternity & Newborn",
    "title": "Fetal heart rate",
    "body": "110–160 with moderate variability (6–25).",
    "tags": [
      "ob",
      "fetal"
    ]
  },
  {
    "id": "maternity-newborn-4",
    "category": "Maternity & Newborn",
    "title": "VEAL CHOP",
    "body": "Variable–Cord, Early–Head, Accelerations–OK, Late–Placental insufficiency.",
    "tags": [
      "ob",
      "fetal"
    ]
  },
  {
    "id": "maternity-newborn-5",
    "category": "Maternity & Newborn",
    "title": "Late decelerations",
    "body": "Left side, stop oxytocin, IV bolus, oxygen as ordered, notify.",
    "tags": [
      "ob",
      "fetal"
    ]
  },
  {
    "id": "maternity-newborn-6",
    "category": "Maternity & Newborn",
    "title": "Previa vs abruption",
    "body": "Previa: painless bright red, no vaginal exams. Abruption: painful rigid abdomen, dark blood.",
    "tags": [
      "ob",
      "emergency"
    ]
  },
  {
    "id": "maternity-newborn-7",
    "category": "Maternity & Newborn",
    "title": "Preeclampsia",
    "body": "BP ≥ 140/90 after 20 weeks with proteinuria or organ signs. Magnesium sulfate.",
    "tags": [
      "ob"
    ]
  },
  {
    "id": "maternity-newborn-8",
    "category": "Maternity & Newborn",
    "title": "Boggy uterus",
    "body": "Massage the fundus first. Fundus shifted to one side = full bladder.",
    "tags": [
      "ob",
      "postpartum"
    ]
  },
  {
    "id": "maternity-newborn-9",
    "category": "Maternity & Newborn",
    "title": "Postpartum hemorrhage",
    "body": "4 Ts: Tone (most common), Trauma, Tissue, Thrombin.",
    "tags": [
      "ob",
      "postpartum"
    ]
  },
  {
    "id": "maternity-newborn-10",
    "category": "Maternity & Newborn",
    "title": "Rh-negative mother",
    "body": "RhoGAM at 28 weeks and within 72 h of delivering an Rh-positive baby.",
    "tags": [
      "ob"
    ]
  },
  {
    "id": "maternity-newborn-11",
    "category": "Maternity & Newborn",
    "title": "Screening",
    "body": "Glucose test 24–28 wk; GBS swab 36–37 wk (positive = IV penicillin in labor).",
    "tags": [
      "ob"
    ]
  },
  {
    "id": "maternity-newborn-12",
    "category": "Maternity & Newborn",
    "title": "APGAR",
    "body": "At 1 and 5 min. 7–10 normal; 4–6 needs help; 0–3 resuscitate.",
    "tags": [
      "newborn"
    ]
  },
  {
    "id": "maternity-newborn-13",
    "category": "Maternity & Newborn",
    "title": "Newborn normals",
    "body": "HR 110–160, RR 30–60. Up to 10% weight loss, regained by 10–14 days.",
    "tags": [
      "newborn"
    ]
  },
  {
    "id": "maternity-newborn-14",
    "category": "Maternity & Newborn",
    "title": "Newborn jaundice",
    "body": "In the first 24 h = abnormal.",
    "tags": [
      "newborn"
    ]
  },
  {
    "id": "maternity-newborn-15",
    "category": "Maternity & Newborn",
    "title": "Caput vs cephalohematoma",
    "body": "Caput crosses suture lines; cephalohematoma does not (and raises jaundice risk).",
    "tags": [
      "newborn"
    ]
  },
  {
    "id": "maternity-newborn-16",
    "category": "Maternity & Newborn",
    "title": "Safe sleep",
    "body": "On the back, firm flat surface, alone in a crib, nothing soft.",
    "tags": [
      "newborn",
      "safety"
    ]
  },
  {
    "id": "maternity-newborn-17",
    "category": "Maternity & Newborn",
    "title": "Postpartum psychosis",
    "body": "Hallucinations or thoughts of harming the baby: emergency; never leave her alone with the infant.",
    "tags": [
      "ob",
      "psych"
    ]
  },
  {
    "id": "pediatrics-1",
    "category": "Pediatrics",
    "title": "Milestones 2–6 months",
    "body": "2 mo social smile; 4 mo rolls over; 6 mo sits with support, stranger anxiety.",
    "tags": [
      "development"
    ]
  },
  {
    "id": "pediatrics-2",
    "category": "Pediatrics",
    "title": "Milestones 9–12 months",
    "body": "9 mo crawls, pincer grasp; 12 mo first steps, first words, birth weight tripled.",
    "tags": [
      "development"
    ]
  },
  {
    "id": "pediatrics-3",
    "category": "Pediatrics",
    "title": "Milestones 2–5 years",
    "body": "2 yr two-word phrases, parallel play; 3 yr tricycle; 5 yr skips, ties shoes.",
    "tags": [
      "development"
    ]
  },
  {
    "id": "pediatrics-4",
    "category": "Pediatrics",
    "title": "Erikson",
    "body": "Trust (0–1), autonomy (1–3), initiative (3–6), industry (6–12), identity (12–18).",
    "tags": [
      "development"
    ]
  },
  {
    "id": "pediatrics-5",
    "category": "Pediatrics",
    "title": "Live vaccines",
    "body": "MMR, varicella, rotavirus, nasal flu: not in pregnancy or severe immunosuppression.",
    "tags": [
      "vaccines"
    ]
  },
  {
    "id": "pediatrics-6",
    "category": "Pediatrics",
    "title": "Epiglottitis",
    "body": "Drooling, muffled voice, tripod. Do not inspect the throat or lay the child down.",
    "tags": [
      "peds",
      "emergency"
    ]
  },
  {
    "id": "pediatrics-7",
    "category": "Pediatrics",
    "title": "Croup",
    "body": "Barking cough, worse at night. Cool mist, steroid, nebulized epinephrine.",
    "tags": [
      "peds",
      "respiratory"
    ]
  },
  {
    "id": "pediatrics-8",
    "category": "Pediatrics",
    "title": "After tonsillectomy",
    "body": "Frequent swallowing = bleeding. No straws, no red drinks.",
    "tags": [
      "peds"
    ]
  },
  {
    "id": "pediatrics-9",
    "category": "Pediatrics",
    "title": "Dehydration",
    "body": "Sunken fontanel, no tears, fewer wet diapers. 1 g diaper weight = 1 mL.",
    "tags": [
      "peds",
      "fluids"
    ]
  },
  {
    "id": "pediatrics-10",
    "category": "Pediatrics",
    "title": "Tetralogy of Fallot",
    "body": "Tet spells: knee-chest, oxygen, calm.",
    "tags": [
      "peds",
      "cardiac"
    ]
  },
  {
    "id": "pediatrics-11",
    "category": "Pediatrics",
    "title": "Hip dysplasia",
    "body": "Pavlik harness worn continuously; do not adjust the straps.",
    "tags": [
      "peds",
      "msk"
    ]
  },
  {
    "id": "pediatrics-12",
    "category": "Pediatrics",
    "title": "Hemophilia",
    "body": "No aspirin or IM injections. Factor replacement; RICE for joint bleeds.",
    "tags": [
      "peds",
      "bleeding"
    ]
  },
  {
    "id": "pediatrics-13",
    "category": "Pediatrics",
    "title": "Suspected abuse",
    "body": "Story does not match the injury, bruises of different ages. Suspicion must be reported.",
    "tags": [
      "peds",
      "legal"
    ]
  },
  {
    "id": "pediatrics-14",
    "category": "Pediatrics",
    "title": "Infant feeding",
    "body": "No honey or cow's milk before 12 months. No nuts, grapes or popcorn for small children.",
    "tags": [
      "peds",
      "diet"
    ]
  },
  {
    "id": "pediatrics-15",
    "category": "Pediatrics",
    "title": "Poisoning",
    "body": "Call poison control. Do not induce vomiting.",
    "tags": [
      "peds",
      "safety"
    ]
  },
  {
    "id": "mental-health-1",
    "category": "Mental Health",
    "title": "Therapeutic communication",
    "body": "Open questions, reflect feelings, silence, offer to stay.",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "mental-health-2",
    "category": "Mental Health",
    "title": "Non-therapeutic",
    "body": "\"Why\" questions, false reassurance, advice, changing the subject, minimizing.",
    "tags": [
      "communication"
    ]
  },
  {
    "id": "mental-health-3",
    "category": "Mental Health",
    "title": "Ask about suicide directly",
    "body": "\"Are you thinking of killing yourself?\" Asking does not plant the idea. Then plan, means, timing.",
    "tags": [
      "suicide",
      "safety"
    ]
  },
  {
    "id": "mental-health-4",
    "category": "Mental Health",
    "title": "High suicide risk",
    "body": "Specific plan, access to means, prior attempt, giving things away, sudden calm after depression.",
    "tags": [
      "suicide"
    ]
  },
  {
    "id": "mental-health-5",
    "category": "Mental Health",
    "title": "Anxiety levels",
    "body": "Mild: teach now. Moderate: focus. Severe: short simple directions. Panic: stay, safety, quiet room.",
    "tags": [
      "anxiety"
    ]
  },
  {
    "id": "mental-health-6",
    "category": "Mental Health",
    "title": "Mania",
    "body": "Low stimulation, firm limits, high-calorie finger foods, non-competitive activity.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "mental-health-7",
    "category": "Mental Health",
    "title": "Hallucinations",
    "body": "Ask what the voices say (commands?), do not argue, state your reality, redirect.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "mental-health-8",
    "category": "Mental Health",
    "title": "Delusions",
    "body": "Do not argue or agree; respond to the feeling.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "mental-health-9",
    "category": "Mental Health",
    "title": "Alcohol withdrawal",
    "body": "Starts 6–24 h; seizures 12–48 h; DTs 48–96 h. Benzodiazepines; thiamine before glucose.",
    "tags": [
      "substance"
    ]
  },
  {
    "id": "mental-health-10",
    "category": "Mental Health",
    "title": "Opioid overdose vs withdrawal",
    "body": "Overdose: pinpoint pupils, slow breathing → naloxone. Withdrawal: yawning, wide pupils, diarrhea.",
    "tags": [
      "substance"
    ]
  },
  {
    "id": "mental-health-11",
    "category": "Mental Health",
    "title": "Anorexia",
    "body": "Refeeding syndrome risk. Supervise meals and the hour after.",
    "tags": [
      "psych",
      "nutrition"
    ]
  },
  {
    "id": "mental-health-12",
    "category": "Mental Health",
    "title": "Defense mechanisms",
    "body": "Projection blames others; displacement redirects anger; sublimation channels it acceptably.",
    "tags": [
      "psych"
    ]
  },
  {
    "id": "mental-health-13",
    "category": "Mental Health",
    "title": "Aggression",
    "body": "Calm, keep distance and an exit, low voice, offer choices. Restraint is the last step.",
    "tags": [
      "psych",
      "safety"
    ]
  },
  {
    "id": "diets-1",
    "category": "Diets",
    "title": "High-potassium foods",
    "body": "Bananas, oranges, potatoes, spinach, tomatoes, avocado, salt substitutes.",
    "tags": [
      "diet",
      "potassium"
    ]
  },
  {
    "id": "diets-2",
    "category": "Diets",
    "title": "Celiac",
    "body": "No barley, rye, oats (unless certified), wheat. Rice, corn, potato are safe.",
    "tags": [
      "diet"
    ]
  },
  {
    "id": "diets-3",
    "category": "Diets",
    "title": "Gout",
    "body": "Low purine: no organ meats, shellfish, beer. Push fluids.",
    "tags": [
      "diet"
    ]
  },
  {
    "id": "diets-4",
    "category": "Diets",
    "title": "CKD before dialysis",
    "body": "Limit sodium, potassium, phosphate, protein and fluid. Protein increases once on dialysis.",
    "tags": [
      "diet",
      "renal"
    ]
  },
  {
    "id": "diets-5",
    "category": "Diets",
    "title": "Heart failure / HTN",
    "body": "About 2 g sodium. Avoid canned, processed and cured foods.",
    "tags": [
      "diet",
      "cardiac"
    ]
  },
  {
    "id": "diets-6",
    "category": "Diets",
    "title": "Pancreatitis / gallbladder",
    "body": "Low fat, no alcohol.",
    "tags": [
      "diet"
    ]
  },
  {
    "id": "diets-7",
    "category": "Diets",
    "title": "Diverticulitis",
    "body": "Low fiber or clear liquids in a flare; high fiber for prevention.",
    "tags": [
      "diet"
    ]
  },
  {
    "id": "diets-8",
    "category": "Diets",
    "title": "Pregnancy",
    "body": "Folic acid and iron; avoid alcohol, raw fish, unpasteurized foods, high-mercury fish.",
    "tags": [
      "diet",
      "ob"
    ]
  },
  {
    "id": "diets-9",
    "category": "Diets",
    "title": "Clear vs full liquids",
    "body": "Clear: broth, gelatin, apple juice, popsicles. Full adds milk, pudding, cream soups.",
    "tags": [
      "diet"
    ]
  },
  {
    "id": "report-immediately-1",
    "category": "Report Immediately",
    "title": "New confusion or restlessness",
    "body": "Think hypoxia, bleeding, sepsis, raised ICP.",
    "tags": [
      "report"
    ]
  },
  {
    "id": "report-immediately-2",
    "category": "Report Immediately",
    "title": "Stridor, drooling, facial burns",
    "body": "Airway about to close.",
    "tags": [
      "report",
      "emergency"
    ]
  },
  {
    "id": "report-immediately-3",
    "category": "Report Immediately",
    "title": "Sudden dyspnea after surgery or fracture",
    "body": "Pulmonary or fat embolism.",
    "tags": [
      "report"
    ]
  },
  {
    "id": "report-immediately-4",
    "category": "Report Immediately",
    "title": "Tearing back pain",
    "body": "Aortic dissection.",
    "tags": [
      "report",
      "emergency"
    ]
  },
  {
    "id": "report-immediately-5",
    "category": "Report Immediately",
    "title": "Sore throat and fever on clozapine or an antithyroid drug",
    "body": "Agranulocytosis.",
    "tags": [
      "report"
    ]
  },
  {
    "id": "report-immediately-6",
    "category": "Report Immediately",
    "title": "Swollen lips or tongue on an ACE inhibitor",
    "body": "Angioedema.",
    "tags": [
      "report",
      "emergency"
    ]
  },
  {
    "id": "report-immediately-7",
    "category": "Report Immediately",
    "title": "Headache and vision changes in pregnancy",
    "body": "Preeclampsia.",
    "tags": [
      "report",
      "ob"
    ]
  },
  {
    "id": "report-immediately-8",
    "category": "Report Immediately",
    "title": "Urine output under 30 mL/h",
    "body": "Poor kidney perfusion.",
    "tags": [
      "report",
      "renal"
    ]
  }
];
