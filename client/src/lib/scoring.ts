
export interface ModalityState {
  // Identity
  moduleName: string;
  stage: string;
  credits: number;
  hours: number;
  students: number;
  learnerMix: string;

  // Activities (B1)
  activities: {
    knowledgeAcquisition: boolean;
    problemBased: boolean;
    labs: boolean;
    workshops: boolean;
    discussion: boolean;
    fieldwork: boolean;
    reflection: boolean;
    project: boolean;
  };

  // Assessment (B2)
  assessments: {
    exam: boolean;
    authentic: boolean;
    group: boolean;
    portfolio: boolean;
    lab: boolean;
    presentation: boolean;
  };

  // Resources (B3)
  resources: {
    labRequired: boolean;
    studioRequired: boolean;
    equipment: boolean;
    simulation: boolean;
    remoteFriendly: boolean;
    staffComfort: boolean; // "Staff capacity = comfortable" rule
  };

  // Profile (B4)
  profile: {
    commuter: boolean;
    digitalConfidence: boolean;
    lowDigitalAccessRisk: boolean;
    international: boolean;
    working: boolean;
    stage1Transition: boolean;
  };

  // Weekly (B5)
  weekly: {
    lecture: string;
    lab: string;
    tutorial: string;
  };
}

export const initialModalityState: ModalityState = {
  moduleName: "",
  stage: "1",
  credits: 5,
  hours: 4,
  students: 30,
  learnerMix: "Standard",
  activities: {
    knowledgeAcquisition: false,
    problemBased: false,
    labs: false,
    workshops: false,
    discussion: false,
    fieldwork: false,
    reflection: false,
    project: false,
  },
  assessments: {
    exam: false,
    authentic: false,
    group: false,
    portfolio: false,
    lab: false,
    presentation: false,
  },
  resources: {
    labRequired: false,
    studioRequired: false,
    equipment: false,
    simulation: false,
    remoteFriendly: false,
    staffComfort: true,
  },
  profile: {
    commuter: false,
    digitalConfidence: true,
    lowDigitalAccessRisk: true,
    international: false,
    working: false,
    stage1Transition: false,
  },
  weekly: {
    lecture: "in-person",
    lab: "in-person",
    tutorial: "in-person",
  },
};

export interface ScoreResult {
  in_person: number;
  blended: number;
  online: number;
  hyflex: number;
  dimensions: {
    learningDesign: number;
    assessment: number;
    learnerProfile: number;
    stageFit: number;
    feasibility: number;
  };
  recommendation: string;
  risks: string[];
  strongestFactors: string[];
}

export function scoreModality(state: ModalityState): ScoreResult {
  // 1. Calculate Dimension Scores (0-100) for each Modality
  // This is a simplified heuristic based on the prompt's description.
  
  // --- Dimension 1: Learning Design Fit (40%) ---
  // Activities favoring In-Person: Labs, Fieldwork, Workshops
  // Activities favoring Online: Knowledge Acquisition, Reflection
  // Activities favoring Blended: Problem Based, Project
  
  let ld_ip = 50;
  let ld_bl = 50;
  let ld_on = 50;
  let ld_hf = 50;

  if (state.activities.labs) { ld_ip += 30; ld_bl += 10; ld_on -= 20; }
  if (state.activities.fieldwork) { ld_ip += 30; ld_bl += 10; ld_on -= 20; }
  if (state.activities.workshops) { ld_ip += 20; ld_bl += 20; ld_on -= 10; }
  if (state.activities.knowledgeAcquisition) { ld_on += 20; ld_bl += 10; }
  if (state.activities.reflection) { ld_on += 20; ld_bl += 20; }
  if (state.activities.project) { ld_bl += 30; ld_hf += 10; }
  
  // --- Dimension 2: Assessment Fit (20%) ---
  let as_ip = 50;
  let as_bl = 50;
  let as_on = 50;
  
  if (state.assessments.exam) { as_ip += 30; as_on -= 10; }
  if (state.assessments.lab) { as_ip += 30; as_on -= 20; }
  if (state.assessments.presentation) { as_ip += 20; as_bl += 10; as_on += 10; }
  if (state.assessments.portfolio) { as_on += 20; as_bl += 20; }
  
  // --- Dimension 3: Learner Profile & Equity (20%) ---
  let eq_ip = 50;
  let eq_bl = 50;
  let eq_on = 50;
  
  if (state.profile.commuter) { eq_on += 30; eq_bl += 20; eq_ip -= 10; }
  if (state.profile.working) { eq_on += 30; eq_bl += 20; eq_ip -= 10; }
  if (state.profile.international) { eq_bl += 10; eq_on += 10; }
  if (state.profile.stage1Transition) { eq_ip += 40; eq_bl += 20; eq_on -= 20; }
  if (!state.profile.lowDigitalAccessRisk) { eq_on -= 40; eq_bl -= 20; }
  
  // --- Dimension 4: Stage Fit (10%) ---
  let st_ip = 50;
  let st_bl = 50;
  let st_on = 50;
  
  if (state.stage === "1") { st_ip += 40; st_on -= 20; }
  if (state.stage === "4") { st_bl += 30; st_on += 20; }
  
  // --- Dimension 5: Feasibility (10%) ---
  let fe_ip = 50;
  let fe_bl = 50;
  let fe_on = 50;
  
  if (state.resources.labRequired) { fe_ip += 40; fe_on -= 40; }
  if (state.resources.studioRequired) { fe_ip += 40; fe_on -= 40; }
  if (state.resources.equipment) { fe_ip += 40; fe_on -= 40; }
  if (state.resources.remoteFriendly) { fe_on += 40; fe_bl += 20; }

  // Normalization Helper
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  // Calculate Weighted Scores
  const score = (ld: number, as: number, eq: number, st: number, fe: number) => {
    return (clamp(ld) * 0.4) + (clamp(as) * 0.2) + (clamp(eq) * 0.2) + (clamp(st) * 0.1) + (clamp(fe) * 0.1);
  };

  let score_ip = score(ld_ip, as_ip, eq_ip, st_ip, fe_ip);
  let score_bl = score(ld_bl, as_bl, eq_bl, st_bl, fe_bl);
  let score_on = score(ld_on, as_on, eq_on, st_on, fe_on);
  
  // HyFlex Logic
  // Base HyFlex on Blended score but penalize for constraints
  let score_hf = score_bl * 0.9; 
  
  // HyFlex Constraints
  if (!state.resources.staffComfort) score_hf = Math.min(score_hf, 30);
  if (!state.profile.lowDigitalAccessRisk) score_hf = Math.min(score_hf, 30);
  if (state.students > 100) score_hf -= 20; // Large class penalty for HyFlex management
  
  score_hf = clamp(score_hf);

  // Identify Strongest Factors
  const factors = [];
  if (state.activities.labs || state.resources.labRequired) factors.push("Practical/Lab Requirements");
  if (state.profile.stage1Transition) factors.push("First Year Transition Needs");
  if (state.profile.commuter || state.profile.working) factors.push("Flexibility for Commuters/Workers");
  if (state.resources.staffComfort) factors.push("Staff HyFlex Readiness");

  // Risks
  const risks = [];
  if (state.profile.stage1Transition && score_on > 60) risks.push("High Online risk for Stage 1 students");
  if (!state.profile.lowDigitalAccessRisk && (score_on > 50 || score_hf > 50)) risks.push("Digital Access Equity Risk");
  if (state.students > 100 && score_hf > 50) risks.push("Large HyFlex cohort management difficulty");

  // Recommendation
  const scores = { "In-Person": score_ip, "Blended": score_bl, "Online": score_on, "HyFlex": score_hf };
  const recommendation = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  return {
    in_person: Math.round(score_ip),
    blended: Math.round(score_bl),
    online: Math.round(score_on),
    hyflex: Math.round(score_hf),
    dimensions: {
      learningDesign: Math.round(ld_bl), // simplified for radar visualization sake, typically would be per modality
      assessment: Math.round(as_bl),
      learnerProfile: Math.round(eq_bl),
      stageFit: Math.round(st_bl),
      feasibility: Math.round(fe_bl)
    },
    recommendation,
    risks,
    strongestFactors: factors.slice(0, 3)
  };
}
