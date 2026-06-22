-- Run this AFTER schema.sql in the Supabase SQL Editor.
-- Six scenarios across systems + a high-yield fact bank for the Cheat Sheet.

-- ============================================================
-- A. CLINICAL SCENARIOS + QUESTIONS
-- ============================================================

-- 1. Heart failure / fluid overload (Recognize Cues)
with s as (
  insert into public.clinical_scenarios
    (vignette, vitals, labs, client_type, client_needs_category, content_area)
  values (
    'A 68-year-old client is admitted with shortness of breath and bilateral lower-extremity edema. The client has a history of heart failure and reports gaining 4 lbs over the past 3 days. Lung auscultation reveals crackles in the bilateral bases.',
    '{"BP":"158/92","HR":104,"RR":24,"SpO2":"89% on RA","Temp":"98.6 F"}'::jsonb,
    '{"BNP":"1240 pg/mL","K+":"3.4 mEq/L"}'::jsonb,
    'Adult Med-Surg',
    'Physiological Integrity',
    'Cardiovascular'
  )
  returning id
)
insert into public.questions
  (scenario_id, question_text, question_type, options, correct_option_ids, ncjmm_category, difficulty_level)
select s.id,
  'Which finding is the priority concern for the nurse to address first?',
  'multiple_choice',
  '[{"id":"A","text":"SpO2 of 89% on room air"},
    {"id":"B","text":"Weight gain of 4 lbs over 3 days"},
    {"id":"C","text":"Blood pressure of 158/92"},
    {"id":"D","text":"Serum potassium of 3.4 mEq/L"}]'::jsonb,
  array['A'], 'Recognize Cues', 2
from s;

-- 2. Asthma silent chest (Prioritize Hypotheses)
with s as (
  insert into public.clinical_scenarios
    (vignette, vitals, labs, client_type, client_needs_category, content_area)
  values (
    'A 16-year-old with a history of asthma arrives in the ED after using their rescue inhaler four times in the last hour with no relief. The client appears anxious, sits leaning forward, and uses accessory muscles to breathe. On auscultation, breath sounds are markedly diminished with minimal wheezing.',
    '{"BP":"118/74","HR":132,"RR":30,"SpO2":"87% on RA","Temp":"98.2 F"}'::jsonb,
    '{}'::jsonb,
    'Pediatric',
    'Physiological Integrity',
    'Respiratory'
  )
  returning id
)
insert into public.questions
  (scenario_id, question_text, question_type, options, correct_option_ids, ncjmm_category, difficulty_level)
select s.id,
  'How should the nurse interpret the diminished breath sounds and minimal wheezing?',
  'multiple_choice',
  '[{"id":"A","text":"The albuterol is working and the airways are opening"},
    {"id":"B","text":"The client is calming down and breathing easier"},
    {"id":"C","text":"This is an impending respiratory failure; airways are closing"},
    {"id":"D","text":"This is a normal finding after multiple inhaler doses"}]'::jsonb,
  array['C'], 'Prioritize Hypotheses', 3
from s;

-- 3. Pre-eclampsia + magnesium toxicity (Take Action)
with s as (
  insert into public.clinical_scenarios
    (vignette, vitals, labs, client_type, client_needs_category, content_area)
  values (
    'A 32-week pregnant client is receiving IV magnesium sulfate for severe pre-eclampsia. Two hours into the infusion, the nurse notes the client is drowsy, deep tendon reflexes are absent, and respiratory rate has dropped from 18 to 10. Urine output for the last hour is 20 mL.',
    '{"BP":"148/96","HR":78,"RR":10,"SpO2":"94% on RA","Temp":"98.4 F"}'::jsonb,
    '{"Mg":"9.5 mg/dL","Urine output":"20 mL/hr"}'::jsonb,
    'Maternity',
    'Physiological Integrity',
    'OB / Maternity'
  )
  returning id
)
insert into public.questions
  (scenario_id, question_text, question_type, options, correct_option_ids, ncjmm_category, difficulty_level)
select s.id,
  'What is the nurse''s first action?',
  'multiple_choice',
  '[{"id":"A","text":"Increase the magnesium infusion rate to control BP"},
    {"id":"B","text":"Stop the magnesium infusion and notify the provider"},
    {"id":"C","text":"Administer calcium gluconate without stopping the infusion"},
    {"id":"D","text":"Continue infusion and recheck reflexes in 30 minutes"}]'::jsonb,
  array['B'], 'Take Action', 2
from s;

-- 4. Increased ICP (Recognize Cues)
with s as (
  insert into public.clinical_scenarios
    (vignette, vitals, labs, client_type, client_needs_category, content_area)
  values (
    'A 24-year-old client is admitted to the neuro ICU after a motor vehicle collision with a closed head injury. Over the past hour, the nurse notes the client has become increasingly difficult to arouse. The right pupil is now 5 mm and sluggish; the left is 3 mm and brisk.',
    '{"BP":"168/72","HR":52,"RR":"10, irregular","SpO2":"96%","Temp":"99.1 F"}'::jsonb,
    '{"GCS":"9 (was 12)"}'::jsonb,
    'Adult Med-Surg',
    'Physiological Integrity',
    'Neurological'
  )
  returning id
)
insert into public.questions
  (scenario_id, question_text, question_type, options, correct_option_ids, ncjmm_category, difficulty_level)
select s.id,
  'Which set of findings suggests rising intracranial pressure?',
  'multiple_choice',
  '[{"id":"A","text":"Equal pupils, rising BP, falling HR"},
    {"id":"B","text":"Falling LOC, widening pulse pressure, bradycardia, irregular respirations"},
    {"id":"C","text":"Hypotension, tachycardia, tachypnea"},
    {"id":"D","text":"Brisk equal pupils, stable vitals, decreased pain"}]'::jsonb,
  array['B'], 'Recognize Cues', 2
from s;

-- 5. DKA (Generate Solutions / multi-select)
with s as (
  insert into public.clinical_scenarios
    (vignette, vitals, labs, client_type, client_needs_category, content_area)
  values (
    'A 19-year-old client with type 1 diabetes presents to the ED with deep, rapid breathing, fruity-smelling breath, abdominal pain, and reports vomiting all morning. The client says they stopped taking insulin two days ago because they had the flu.',
    '{"BP":"104/62","HR":124,"RR":30,"SpO2":"99% on RA","Temp":"99.4 F"}'::jsonb,
    '{"Glucose":"512 mg/dL","pH":"7.21","HCO3":"12 mEq/L","K+":"5.6 mEq/L","Ketones":"large"}'::jsonb,
    'Adult Med-Surg',
    'Physiological Integrity',
    'Endocrine'
  )
  returning id
)
insert into public.questions
  (scenario_id, question_text, question_type, options, correct_option_ids, ncjmm_category, difficulty_level)
select s.id,
  'Select all interventions the nurse anticipates in the initial management of DKA.',
  'select_all',
  '[{"id":"A","text":"IV 0.9% normal saline bolus"},
    {"id":"B","text":"IV regular insulin infusion"},
    {"id":"C","text":"Subcutaneous long-acting insulin only"},
    {"id":"D","text":"Continuous cardiac monitoring"},
    {"id":"E","text":"Oral fluids and a regular diet"}]'::jsonb,
  array['A','B','D'], 'Generate Solutions', 3
from s;

-- 6. Therapeutic communication (Take Action)
with s as (
  insert into public.clinical_scenarios
    (vignette, vitals, labs, client_type, client_needs_category, content_area)
  values (
    'A 45-year-old client newly diagnosed with breast cancer sits quietly with arms crossed. She tells the nurse, "I don''t even know how to tell my kids. I feel like my whole world just stopped."',
    '{"BP":"126/78","HR":86,"RR":16,"SpO2":"98%","Temp":"98.6 F"}'::jsonb,
    '{}'::jsonb,
    'Mental Health',
    'Psychosocial Integrity',
    'Therapeutic Communication'
  )
  returning id
)
insert into public.questions
  (scenario_id, question_text, question_type, options, correct_option_ids, ncjmm_category, difficulty_level)
select s.id,
  'Which response by the nurse is most therapeutic?',
  'multiple_choice',
  '[{"id":"A","text":"\"Try not to worry — most people do very well with treatment.\""},
    {"id":"B","text":"\"Why haven''t you told your children yet?\""},
    {"id":"C","text":"\"It sounds like this feels overwhelming right now.\""},
    {"id":"D","text":"\"If I were you, I would tell them tonight.\""}]'::jsonb,
  array['C'], 'Take Action', 1
from s;

-- ============================================================
-- B. STUDY FACTS (Cheat Sheet content)
-- ============================================================

insert into public.study_facts (category, title, body, tags) values
-- Lab values
('Lab Values', 'Potassium (K+)',  'Normal 3.5–5.0. The heart electrolyte — peaked T waves with high K, never IV push.', array['cardiac','electrolyte']),
('Lab Values', 'Sodium (Na+)',    'Normal 135–145. Low Na causes confusion, headache, seizures.', array['electrolyte','neuro']),
('Lab Values', 'Calcium',         'Normal 9–11. Low Ca: tetany, Chvostek and Trousseau signs.', array['electrolyte']),
('Lab Values', 'Magnesium',       'Normal 1.5–2.5. Antidote for Mg toxicity is calcium gluconate.', array['electrolyte','OB']),
('Lab Values', 'Fasting glucose', 'Normal 70–110. Treat hypoglycemia <70 fast with 15 g simple carbs.', array['endocrine']),
('Lab Values', 'Arterial pH',     'Normal 7.35–7.45. Below = acidosis, above = alkalosis.', array['ABG']),
('Lab Values', 'Hemoglobin',      'Normal 12–18. Low = anemia, fatigue, pallor.', array['heme']),
('Lab Values', 'Platelets',       'Normal 150k–400k. Below 150k = bleeding precautions.', array['heme']),
('Lab Values', 'WBC',             'Normal 5k–10k. Low = neutropenic precautions.', array['heme','infection']),
('Lab Values', 'INR (on warfarin)', 'Target 2–3. Above 4 = bleeding risk; hold warfarin.', array['anticoag']),
('Lab Values', 'BUN / Creatinine','BUN 10–20, Cr 0.6–1.2. Rising = kidney trouble.', array['renal']),
('Lab Values', 'Digoxin level',   'Therapeutic 0.5–2 ng/mL. Above 2 = toxicity.', array['cardiac','drug-level']),
('Lab Values', 'Lithium level',   'Therapeutic 0.6–1.2. Above 1.5 = toxicity (tremor, confusion).', array['psych','drug-level']),
('Lab Values', 'Phenytoin (Dilantin)', 'Therapeutic 10–20 mcg/mL.', array['neuro','drug-level']),

-- Antidotes
('Antidotes', 'Heparin',          'Antidote: protamine sulfate. Monitor aPTT.', array['anticoag']),
('Antidotes', 'Warfarin',         'Antidote: vitamin K. Monitor INR.', array['anticoag']),
('Antidotes', 'Acetaminophen',    'Antidote: N-acetylcysteine (Mucomyst).', array['tox']),
('Antidotes', 'Opioids',          'Antidote: naloxone (Narcan).', array['respiratory','tox']),
('Antidotes', 'Benzodiazepines',  'Antidote: flumazenil.', array['tox']),
('Antidotes', 'Magnesium sulfate','Antidote: calcium gluconate.', array['OB']),
('Antidotes', 'Digoxin',          'Antidote: digoxin immune Fab (Digibind).', array['cardiac']),
('Antidotes', 'Iron',             'Antidote: deferoxamine.', array['tox']),
('Antidotes', 'Insulin (low sugar)', 'Treat with dextrose IV or glucagon IM if no IV access.', array['endocrine']),
('Antidotes', 'Beta-blocker / CCB overdose', 'Glucagon for beta-blocker; calcium for CCB.', array['cardiac','tox']),

-- Positions
('Positions', 'Trouble breathing / heart failure', 'High Fowler''s — sit upright.', array['respiratory','cardiac']),
('Positions', 'Shock / low BP',     'Flat with legs elevated.', array['shock']),
('Positions', 'After lumbar puncture', 'Lie flat to prevent spinal headache.', array['neuro']),
('Positions', 'Increased ICP',      'HOB up 30 degrees, head midline.', array['neuro']),
('Positions', 'Post-tonsillectomy / unconscious', 'Side-lying to keep airway clear.', array['airway']),
('Positions', 'Air embolism / central line',  'Left side, head down (Trendelenburg).', array['emergency']),
('Positions', 'After liver biopsy', 'Right side-lying to apply pressure to the site.', array['GI']),
('Positions', 'Pregnant with low BP', 'Left side — relieves the vena cava.', array['OB']),
('Positions', 'Autonomic dysreflexia', 'Sit the client up immediately.', array['neuro','emergency']),

-- Isolation
('Isolation', 'Airborne (MTV)',     'Measles, TB, Varicella → negative-pressure room + N95.', array['infection']),
('Isolation', 'Droplet',            'Flu, pertussis, meningitis, mumps, rubella → mask within 3 ft.', array['infection']),
('Isolation', 'Contact',            'MRSA, VRE, C. diff, RSV, scabies → gown + gloves.', array['infection']),
('Isolation', 'C. difficile',       'Soap and water — alcohol gel does not kill spores.', array['infection']),
('Isolation', 'Neutropenic precautions', 'Protect the patient: no fresh flowers, no raw produce, no sick visitors.', array['infection','heme']),

-- NCJMM model
('NCJMM', 'Step 1 — Recognize Cues', 'Notice the relevant data in the case (vitals, labs, symptoms).', array['clinical-judgment']),
('NCJMM', 'Step 2 — Analyze Cues',  'Decide what those data mean and how they relate.', array['clinical-judgment']),
('NCJMM', 'Step 3 — Prioritize Hypotheses', 'Rank what is most likely and most dangerous.', array['clinical-judgment']),
('NCJMM', 'Step 4 — Generate Solutions', 'List possible nursing actions.', array['clinical-judgment']),
('NCJMM', 'Step 5 — Take Action',   'Choose and perform the highest-priority action.', array['clinical-judgment']),
('NCJMM', 'Step 6 — Evaluate Outcomes', 'Decide whether what you did is working.', array['clinical-judgment']),

-- Golden rules
('Golden Rules', 'ABC priority',    'Airway before Breathing before Circulation.', array['priority']),
('Golden Rules', 'Maslow',          'Physical needs before emotional needs.', array['priority']),
('Golden Rules', 'Assess before act', 'When unsure: assess. In an emergency: act.', array['priority']),
('Golden Rules', 'Nurse before doctor', 'Do the nursing action first; call the provider when you have done all you can.', array['priority']),
('Golden Rules', 'Acute beats chronic', 'See the new or unstable patient first.', array['priority']),
('Golden Rules', 'Delegation',      'RN keeps assessment, teaching, evaluation, unstable patients, and any first.', array['delegation']),

-- Therapeutic communication
('Communication', 'Open-ended response', 'Try: "Tell me more about that."', array['psych']),
('Communication', 'Reflect feelings', 'Try: "You''re feeling overwhelmed."', array['psych']),
('Communication', 'Silence is therapy', 'Sitting in silence gives the client space.', array['psych']),
('Communication', 'Avoid false reassurance', 'Skip "Everything will be fine."', array['psych']),
('Communication', 'Avoid "why" questions', 'They feel accusing.', array['psych']);
