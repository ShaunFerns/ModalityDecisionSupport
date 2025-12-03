
export interface ModalityState {
  // Identity
  moduleName: string;
  moduleCode: string;
  stage: string;
  credits: number;
  hours: number;
  students: number;
  learnerMix: string;

  // B1. Learning Activities
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

  // B2. Assessment Types (No, Minor, Major)
  assessments: {
    exam: "No" | "Minor" | "Major";
    authentic: "No" | "Minor" | "Major";
    group: "No" | "Minor" | "Major";
    portfolio: "No" | "Minor" | "Major";
    lab: "No" | "Minor" | "Major";
    presentation: "No" | "Minor" | "Major";
  };

  // B3. Resources & Constraints
  resources: {
    labRequired: boolean;
    studioRequired: boolean;
    equipment: boolean;
    simulation: boolean;
    remoteFriendly: boolean;
    staffComfort: boolean; // "Staff capacity = comfortable" rule
  };

  // B4. Learner Profile
  profile: {
    commuter: boolean;
    digitalConfidence: boolean;
    lowDigitalAccessRisk: boolean;
    working: boolean;
    international: boolean;
    stage1Transition: boolean;
  };

  // B5. Staff Profile (New)
  staffProfile: {
    digitalConfidence: "Low" | "Moderate" | "High";
    onlineExperience: "None" | "Some" | "Substantial";
    accessDevice: boolean;
    accessHyFlexRoom: boolean;
    accessDigitalTools: boolean;
    workload: "1-2" | "3+" | "HeavyPractical";
  };
}

export const initialModalityState: ModalityState = {
  moduleName: "",
  moduleCode: "",
  stage: "1",
  credits: 5,
  hours: 4,
  students: 30,
  learnerMix: "Standard UG",
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
    exam: "No",
    authentic: "No",
    group: "No",
    portfolio: "No",
    lab: "No",
    presentation: "No",
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
    working: false,
    international: false,
    stage1Transition: false,
  },
  staffProfile: {
    digitalConfidence: "Moderate",
    onlineExperience: "Some",
    accessDevice: true,
    accessHyFlexRoom: false,
    accessDigitalTools: true,
    workload: "1-2",
  },
};

export interface ScoreResult {
  in_person: number;
  blended: number;
  online: number;
  hyflex: number;
  dimensions: {
    learningDesign: { inPerson: number, blended: number, online: number, hyflex: number };
    assessment: { inPerson: number, blended: number, online: number, hyflex: number };
    learnerProfile: { inPerson: number, blended: number, online: number, hyflex: number };
    stageFit: { inPerson: number, blended: number, online: number, hyflex: number };
    feasibility: { inPerson: number, blended: number, online: number, hyflex: number };
  };
  recommendation: string;
  risks: string[];
  strongestFactors: string[];
}

export function scoreModality(state: ModalityState): ScoreResult {
  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  // --- Dimension 1: Learning Design Fit (40%) ---
  let ld = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  if (state.activities.labs) { ld.inPerson += 30; ld.blended += 10; ld.online -= 30; ld.hyflex -= 10; }
  if (state.activities.fieldwork) { ld.inPerson += 30; ld.blended += 10; ld.online -= 40; ld.hyflex -= 20; }
  if (state.activities.workshops) { ld.inPerson += 20; ld.blended += 20; ld.online -= 10; ld.hyflex += 0; }
  if (state.activities.discussion) { ld.inPerson += 10; ld.blended += 10; ld.online += 10; ld.hyflex += 10; }
  if (state.activities.knowledgeAcquisition) { ld.online += 20; ld.blended += 10; ld.hyflex += 10; }
  if (state.activities.reflection) { ld.online += 20; ld.blended += 20; }
  if (state.activities.project) { ld.blended += 30; ld.hyflex += 10; }

  // --- Dimension 2: Assessment Fit (20%) ---
  let as = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  const assessWeight = (type: string) => type === "Major" ? 2 : type === "Minor" ? 1 : 0;

  if (assessWeight(state.assessments.exam) > 0) { as.inPerson += 30; as.online -= 10; }
  if (assessWeight(state.assessments.lab) > 0) { as.inPerson += 30; as.online -= 20; as.hyflex -= 10; }
  if (assessWeight(state.assessments.presentation) > 0) { as.inPerson += 20; as.blended += 10; as.online += 10; as.hyflex += 10; }
  if (assessWeight(state.assessments.portfolio) > 0) { as.online += 20; as.blended += 20; as.hyflex += 10; }
  if (assessWeight(state.assessments.group) > 0) { as.inPerson += 10; as.blended += 10; as.online += 5; }
  if (assessWeight(state.assessments.authentic) > 0) { as.blended += 20; as.online += 10; }

  // --- Dimension 3: Learner Profile & Equity (20%) ---
  let eq = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  if (state.profile.commuter) { eq.online += 30; eq.blended += 20; eq.hyflex += 30; eq.inPerson -= 10; }
  if (state.profile.working) { eq.online += 30; eq.blended += 20; eq.hyflex += 30; eq.inPerson -= 10; }
  if (state.profile.international) { eq.blended += 10; eq.inPerson += 10; }
  if (state.profile.stage1Transition) { eq.inPerson += 40; eq.blended += 20; eq.online -= 20; eq.hyflex -= 10; }
  
  // Equity Risk Logic for HyFlex/Online
  if (!state.profile.lowDigitalAccessRisk) { eq.online -= 40; eq.hyflex -= 20; eq.blended -= 10; }
  if (state.profile.digitalConfidence === false) { eq.online -= 20; eq.hyflex -= 10; }

  // --- Dimension 4: Stage Fit (10%) ---
  let st = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  if (state.stage === "1") { st.inPerson += 40; st.blended += 10; st.online -= 20; st.hyflex -= 10; }
  if (state.stage === "2") { st.inPerson += 20; st.blended += 30; }
  if (state.stage === "3") { st.blended += 40; st.online += 10; st.hyflex += 10; }
  if (state.stage === "4" || state.stage === "M") { st.blended += 30; st.online += 30; st.hyflex += 20; }

  // --- Dimension 5: Feasibility / Resource Fit (10%) ---
  let fe = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  if (state.resources.labRequired) { fe.inPerson += 40; fe.online -= 40; fe.hyflex -= 20; }
  if (state.resources.studioRequired) { fe.inPerson += 40; fe.online -= 40; fe.hyflex -= 20; }
  if (state.resources.equipment) { fe.inPerson += 40; fe.online -= 40; fe.hyflex -= 20; }
  if (state.resources.remoteFriendly) { fe.online += 40; fe.blended += 20; fe.hyflex += 20; }
  
  // HyFlex Feasibility Constraints (Original)
  if (!state.resources.staffComfort) {
    fe.hyflex = 0; 
  }

  // HyFlex penalty if Lab/Studio required but not simulation/remote friendly
  if ((state.resources.labRequired || state.resources.studioRequired) && 
      !state.resources.remoteFriendly && !state.resources.simulation) {
      fe.hyflex = Math.min(fe.hyflex, 20);
      fe.online = Math.min(fe.online, 10);
  }

  // --- B5 Staff Profile Adjustments (New) ---
  // Digital Confidence
  if (state.staffProfile.digitalConfidence === "Low") {
    fe.online -= 10;
    fe.hyflex -= 15;
  } else if (state.staffProfile.digitalConfidence === "High") {
    fe.online += 5;
    fe.hyflex += 5;
  }

  // Online Experience
  if (state.staffProfile.onlineExperience === "None") {
    fe.online -= 10;
    fe.hyflex -= 15;
  } else if (state.staffProfile.onlineExperience === "Substantial") {
    fe.online += 10;
    fe.hyflex += 10;
  }

  // Access to Tech
  if (!state.staffProfile.accessHyFlexRoom) {
    fe.hyflex = Math.min(fe.hyflex, 30); // Cap HyFlex if no room
  }
  if (!state.staffProfile.accessDigitalTools) {
    fe.online -= 20;
    fe.hyflex -= 10;
  }

  // Workload Complexity
  if (state.staffProfile.workload === "3+" || state.staffProfile.workload === "HeavyPractical") {
    fe.hyflex -= 10; // Complex workload makes HyFlex harder
    fe.online -= 5;
  }


  // --- Aggregation ---
  const calculateTotal = (modality: 'inPerson' | 'blended' | 'online' | 'hyflex') => {
    return (
      (clamp(ld[modality]) * 0.4) +
      (clamp(as[modality]) * 0.2) +
      (clamp(eq[modality]) * 0.2) +
      (clamp(st[modality]) * 0.1) +
      (clamp(fe[modality]) * 0.1)
    );
  };

  let score_ip = calculateTotal('inPerson');
  let score_bl = calculateTotal('blended');
  let score_on = calculateTotal('online');
  let score_hf = calculateTotal('hyflex');

  // Global HyFlex Constraints (Post-calculation overrides)
  if (!state.resources.staffComfort) score_hf = Math.min(score_hf, 20);
  
  if (!state.profile.lowDigitalAccessRisk) {
     score_on = Math.min(score_on, 40);
     score_hf = Math.min(score_hf, 40); 
  }

  score_ip = clamp(score_ip);
  score_bl = clamp(score_bl);
  score_on = clamp(score_on);
  score_hf = clamp(score_hf);

  // Identify Strongest Factors
  const factors = [];
  if (state.activities.labs || state.resources.labRequired) factors.push("Practical/Lab Requirements");
  if (state.profile.stage1Transition) factors.push("First Year Transition Needs");
  if (state.profile.commuter || state.profile.working) factors.push("Flexibility for Commuters/Workers");
  if (state.resources.staffComfort && score_hf > 50) factors.push("Staff HyFlex Readiness");
  if (state.activities.project) factors.push("Project-based Learning Suitability");

  // Risks
  const risks = [];
  if (state.profile.stage1Transition && score_on > 60) risks.push("High Online risk for Stage 1 students");
  if (!state.profile.lowDigitalAccessRisk && (score_on > 50 || score_hf > 50)) risks.push("Digital Access Equity Risk");
  if (!state.resources.staffComfort && score_hf > 30) risks.push("Staff not comfortable with HyFlex");
  if (!state.staffProfile.accessHyFlexRoom && score_hf > 40) risks.push("No dedicated HyFlex room available");

  // Recommendation
  const scores = { "In-Person": score_ip, "Blended": score_bl, "Online": score_on, "HyFlex": score_hf };
  const recommendation = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];

  return {
    in_person: Math.round(score_ip),
    blended: Math.round(score_bl),
    online: Math.round(score_on),
    hyflex: Math.round(score_hf),
    dimensions: {
      learningDesign: { 
        inPerson: Math.round(ld.inPerson), blended: Math.round(ld.blended), online: Math.round(ld.online), hyflex: Math.round(ld.hyflex) 
      },
      assessment: { 
        inPerson: Math.round(as.inPerson), blended: Math.round(as.blended), online: Math.round(as.online), hyflex: Math.round(as.hyflex) 
      },
      learnerProfile: { 
        inPerson: Math.round(eq.inPerson), blended: Math.round(eq.blended), online: Math.round(eq.online), hyflex: Math.round(eq.hyflex) 
      },
      stageFit: { 
        inPerson: Math.round(st.inPerson), blended: Math.round(st.blended), online: Math.round(st.online), hyflex: Math.round(st.hyflex) 
      },
      feasibility: { 
        inPerson: Math.round(fe.inPerson), blended: Math.round(fe.blended), online: Math.round(fe.online), hyflex: Math.round(fe.hyflex) 
      }
    },
    recommendation,
    risks,
    strongestFactors: factors.slice(0, 3)
  };
}
