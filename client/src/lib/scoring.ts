
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
    // staffComfort moved to B5
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
    hyflexComfort: "Low" | "Moderate" | "High"; // Moved from B3
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
    hyflexComfort: "Moderate",
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

  if (state.activities.knowledgeAcquisition) { ld.inPerson += 4; ld.blended += 6; ld.online += 8; ld.hyflex += 4; }
  if (state.activities.problemBased) { ld.inPerson += 6; ld.blended += 6; ld.online += 3; ld.hyflex += 6; }
  if (state.activities.labs) { ld.inPerson += 8; ld.blended += 6; ld.online += 0; ld.hyflex += 6; }
  if (state.activities.workshops) { ld.inPerson += 6; ld.blended += 6; ld.online += 2; ld.hyflex += 6; }
  if (state.activities.discussion) { ld.inPerson += 6; ld.blended += 6; ld.online += 3; ld.hyflex += 6; }
  if (state.activities.fieldwork) { ld.inPerson += 6; ld.blended += 6; ld.online += 0; ld.hyflex += 6; }
  if (state.activities.reflection) { ld.inPerson += 2; ld.blended += 6; ld.online += 8; ld.hyflex += 6; }
  if (state.activities.project) { ld.inPerson += 4; ld.blended += 6; ld.online += 6; ld.hyflex += 6; }

  ld.inPerson = clamp(ld.inPerson);
  ld.blended = clamp(ld.blended);
  ld.online = clamp(ld.online);
  ld.hyflex = clamp(ld.hyflex);


  // --- Dimension 2: Assessment Fit (20%) ---
  let as = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  const updateAssessmentScore = (type: string, minorScores: number[], majorScores: number[]) => {
      if (type === "Minor") {
          as.inPerson += minorScores[0]; as.blended += minorScores[1]; as.online += minorScores[2]; as.hyflex += minorScores[3];
      } else if (type === "Major") {
          as.inPerson += majorScores[0]; as.blended += majorScores[1]; as.online += majorScores[2]; as.hyflex += majorScores[3];
      }
  };

  // Exam: Minor(5,3,2,2), Major(10,8,5,5)
  updateAssessmentScore(state.assessments.exam, [5, 3, 2, 2], [10, 8, 5, 5]);
  // Authentic: Minor(3,5,5,5), Major(5,10,10,10)
  updateAssessmentScore(state.assessments.authentic, [3, 5, 5, 5], [5, 10, 10, 10]);
  // Group: Minor(4,6,4,6), Major(6,10,6,10)
  updateAssessmentScore(state.assessments.group, [4, 6, 4, 6], [6, 10, 6, 10]);
  // Portfolio: Minor(2,6,8,6), Major(4,10,12,8)
  updateAssessmentScore(state.assessments.portfolio, [2, 6, 8, 6], [4, 10, 12, 8]);
  // Lab: Minor(8,6,0,6), Major(12,8,0,10)
  updateAssessmentScore(state.assessments.lab, [8, 6, 0, 6], [12, 8, 0, 10]);
  // Presentation: Minor(4,6,6,6), Major(6,8,8,8)
  updateAssessmentScore(state.assessments.presentation, [4, 6, 6, 6], [6, 8, 8, 8]);

  as.inPerson = clamp(as.inPerson);
  as.blended = clamp(as.blended);
  as.online = clamp(as.online);
  as.hyflex = clamp(as.hyflex);


  // --- Dimension 3: Learner Profile & Equity (20%) ---
  let eq = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  if (state.profile.commuter) { eq.inPerson -= 5; eq.blended += 8; eq.online += 8; eq.hyflex += 6; }
  if (state.profile.digitalConfidence) { eq.inPerson += 0; eq.blended += 5; eq.online += 8; eq.hyflex += 5; }
  if (state.profile.lowDigitalAccessRisk) { eq.inPerson += 0; eq.blended += 3; eq.online += 6; eq.hyflex += 3; }
  if (state.profile.working) { eq.inPerson -= 5; eq.blended += 8; eq.online += 8; eq.hyflex += 6; }
  if (state.profile.international) { eq.inPerson += 0; eq.blended += 4; eq.online += 6; eq.hyflex += 4; }
  if (state.profile.stage1Transition) { eq.inPerson += 6; eq.blended += 4; eq.online -= 6; eq.hyflex -= 4; }
  
  eq.inPerson = clamp(eq.inPerson);
  eq.blended = clamp(eq.blended);
  eq.online = clamp(eq.online);
  eq.hyflex = clamp(eq.hyflex);

  // --- Dimension 4: Stage Fit (10%) ---
  let st = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  if (state.stage === "1") { st.inPerson += 10; st.blended += 5; st.online -= 10; st.hyflex -= 5; }
  if (state.stage === "2") { st.inPerson += 5; st.blended += 5; st.online += 0; st.hyflex += 0; }
  if (state.stage === "3") { st.inPerson += 0; st.blended += 5; st.online += 5; st.hyflex += 3; }
  if (state.stage === "4" || state.stage === "M") { st.inPerson -= 10; st.blended += 5; st.online += 10; st.hyflex += 5; }

  st.inPerson = clamp(st.inPerson);
  st.blended = clamp(st.blended);
  st.online = clamp(st.online);
  st.hyflex = clamp(st.hyflex);


  // --- Dimension 5: Feasibility / Resource Fit (10%) ---
  let fe = { inPerson: 50, blended: 50, online: 50, hyflex: 50 };

  // 5.1 Resources & Constraints
  if (state.resources.labRequired) { fe.inPerson += 8; fe.blended += 6; fe.online -= 10; fe.hyflex += 6; }
  if (state.resources.studioRequired) { fe.inPerson += 8; fe.blended += 6; fe.online -= 10; fe.hyflex += 6; }
  if (state.resources.equipment) { fe.inPerson += 6; fe.blended += 4; fe.online -= 8; fe.hyflex += 4; }
  if (state.resources.simulation) { fe.online += 8; fe.blended += 4; }
  if (state.resources.remoteFriendly) { fe.online += 8; fe.blended += 6; fe.hyflex += 4; }
  
  // Staff Comfort HyFlex (from B5)
  const staffComfortHyflex = state.staffProfile.hyflexComfort === "Moderate" || state.staffProfile.hyflexComfort === "High";
  if (staffComfortHyflex) {
      fe.hyflex += 10;
  } else {
      fe.hyflex -= 15;
  }

  // 5.2 Staff Profile
  // Digital Confidence
  if (state.staffProfile.digitalConfidence === "Low") {
    fe.online -= 10;
    fe.hyflex -= 12;
  } else if (state.staffProfile.digitalConfidence === "High") {
    fe.online += 8;
    fe.hyflex += 10;
  }

  // Online Experience
  if (state.staffProfile.onlineExperience === "None") {
    fe.online -= 8;
    fe.hyflex -= 8;
  } else if (state.staffProfile.onlineExperience === "Some") {
    fe.online += 3;
    fe.hyflex += 3;
  } else if (state.staffProfile.onlineExperience === "Substantial") {
    fe.online += 6;
    fe.hyflex += 6;
  }

  // Access to Device
  if (!state.staffProfile.accessDevice) {
    fe.online -= 5;
    fe.hyflex -= 5;
  }

  // Access to HyFlex Room
  if (state.staffProfile.accessHyFlexRoom) {
    fe.hyflex += 10;
  } else {
    fe.hyflex -= 10;
  }

  // Access to Digital Tools
  if (!state.staffProfile.accessDigitalTools) {
    fe.online -= 8;
  }

  // Workload
  if (state.staffProfile.workload === "3+") {
    fe.hyflex -= 8;
    fe.online -= 4;
  } else if (state.staffProfile.workload === "HeavyPractical") {
    fe.hyflex -= 8;
  }
  
  fe.inPerson = clamp(fe.inPerson);
  fe.blended = clamp(fe.blended);
  fe.online = clamp(fe.online);
  fe.hyflex = clamp(fe.hyflex);


  // --- Aggregation ---
  const calculateTotal = (modality: 'inPerson' | 'blended' | 'online' | 'hyflex') => {
    return (
      (ld[modality] * 0.4) +
      (as[modality] * 0.2) +
      (eq[modality] * 0.2) +
      (st[modality] * 0.1) +
      (fe[modality] * 0.1)
    );
  };

  let score_ip = calculateTotal('inPerson');
  let score_bl = calculateTotal('blended');
  let score_on = calculateTotal('online');
  let score_hf = calculateTotal('hyflex');

  // Global Overrides / Hard Constraints (kept from previous version if relevant, otherwise rely on scoring)
  // Keeping minimal hard constraints if score drops too low naturally
  
  score_ip = clamp(score_ip);
  score_bl = clamp(score_bl);
  score_on = clamp(score_on);
  score_hf = clamp(score_hf);

  // Identify Strongest Factors
  const factors = [];
  if (state.activities.labs || state.resources.labRequired) factors.push("Practical/Lab Requirements");
  if (state.profile.stage1Transition) factors.push("First Year Transition Needs");
  if (state.profile.commuter || state.profile.working) factors.push("Flexibility for Commuters/Workers");
  if (staffComfortHyflex && score_hf > 50) factors.push("Staff HyFlex Readiness");
  if (state.activities.project) factors.push("Project-based Learning Suitability");

  // Risks
  const risks = [];
  if (state.profile.stage1Transition && score_on > 60) risks.push("High Online risk for Stage 1 students");
  if (!state.profile.lowDigitalAccessRisk && (score_on > 50 || score_hf > 50)) risks.push("Digital Access Equity Risk");
  if (!staffComfortHyflex && score_hf > 30) risks.push("Staff not comfortable with HyFlex");
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
