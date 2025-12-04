import React from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Evidence() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Link href="/module">
          <Button variant="ghost" className="mb-4 gap-2 pl-0 hover:pl-2 transition-all">
            <ArrowLeft className="h-4 w-4" /> Back to Module
          </Button>
        </Link>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            Evidence-Informed Modality Scoring Model
          </h1>
          
          <div className="prose prose-slate max-w-none text-slate-700">
            <p className="lead text-lg text-slate-600">
              The modality recommendation is generated through an evidence-informed scoring model that synthesises international literature on learning design, assessment alignment, learner flexibility, digital pedagogy, and feasibility in higher education.
            </p>

            <p>The model draws on established principles from:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Constructive Alignment</strong> (Biggs & Tang, 2011), where learning activities and assessments must align with intended learning outcomes.</li>
              <li><strong>Blended and Online Learning Frameworks</strong>, including Graham (2013), Means et al. (2014), and Garrison & Vaughan’s (2008) Community of Inquiry model.</li>
              <li><strong>Universal Design for Learning</strong> (CAST, 2018), particularly learner variability and multiple means of engagement.</li>
              <li><strong>Digital Competence Frameworks</strong>, including DigCompEdu (Redecker, 2017) and national digital capacity principles.</li>
              <li><strong>Flexibility and Modality Choice Literature</strong>, including Beatty’s (2019) HyFlex model and Chickering & Gamson’s (1987) principles of good practice in undergraduate education.</li>
            </ul>

            <p>Taken together, this evidence indicates that suitable modality depends on five interacting dimensions:</p>
            <ol className="list-decimal pl-5 space-y-1 font-medium text-primary">
              <li>Learning Design</li>
              <li>Assessment Fit</li>
              <li>Learner Profile & Equity</li>
              <li>Stage Fit</li>
              <li>Feasibility (Resources & Staff Readiness)</li>
            </ol>

            <hr className="my-8 border-slate-200" />

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">How the Model Works</h2>
            <p>For each modality (In-Person, Blended, Online, HyFlex), the system calculates a score (0–100) within each dimension:</p>

            <div className="space-y-6 mt-6">
              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-lg">1. Learning Design</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Derived from core learning activities (e.g., knowledge acquisition, inquiry, labs, discussion, reflection, projects). Activities associated with flexibility or independent study provide higher alignment with Online or Blended learning, while practical, hands-on activities increase alignment with In-Person and HyFlex delivery.
                  </p>
                  <p className="text-xs text-slate-500 italic">References: Biggs & Tang (2011); Garrison & Vaughan (2008); Graham (2013).</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-lg">2. Assessment Fit</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Alignment between the assessment types (exam, authentic CA, group work, portfolio, practical) and delivery modality. For example, portfolio and reflective assessments have strong alignment with online delivery, while practical/lab assessments align more closely with In-Person or HyFlex modalities.
                  </p>
                  <p className="text-xs text-slate-500 italic">References: Nicol & Macfarlane-Dick (2006); Evans (2013); Redecker (2017).</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-lg">3. Learner Profile & Equity</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Factors such as commuter patterns, digital access, working learners, and transition-stage support influence flexibility needs. Programmes with high proportions of commuters or working learners often benefit from blended or online elements, while Stage 1 learners typically benefit from stronger structure and community.
                  </p>
                  <p className="text-xs text-slate-500 italic">References: CAST (2018); JISC (2020) Learner Digital Experience; Thomas (2012) on belonging.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-lg">4. Stage Fit</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Different stages of the programme have different modality implications. Early stages emphasise structure and belonging, while later stages often emphasise autonomy, flexibility, and independent learning.
                  </p>
                  <p className="text-xs text-slate-500 italic">References: Tinto (2017); Thomas (2012); Biggs & Tang (2011).</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2"><CardTitle className="text-lg">5. Feasibility (Resources & Staff Profile)</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Practical constraints and supports—such as lab requirements, access to specialist spaces, staff digital confidence, online teaching experience, and availability of HyFlex-enabled rooms—affect the real-world viability of each modality.
                  </p>
                  <p className="text-xs text-slate-500 italic">References: Beatty (2019); Redecker (2017); JISC (2020).</p>
                </CardContent>
              </Card>
            </div>

            <p className="mt-6">Each dimension contributes to the overall modality score using weighted constructive alignment logic:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm bg-slate-50 p-4 rounded-md border border-slate-200">
              <li>Learning Design (40%)</li>
              <li>Assessment Fit (20%)</li>
              <li>Learner Profile & Equity (20%)</li>
              <li>Stage Fit (10%)</li>
              <li>Feasibility (10%)</li>
            </ul>
            <p className="mt-4 font-medium text-primary">The modality with the highest combined score is presented as the evidence-based recommendation.</p>

            <hr className="my-8 border-slate-200" />

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">What the Score Represents</h2>
            <p>The recommendation does not imply that other modalities are unsuitable. Rather, it identifies the modality with the strongest alignment given the module’s:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>pedagogical intent,</li>
              <li>assessment structure,</li>
              <li>learner needs,</li>
              <li>programme stage, and</li>
              <li>practical delivery constraints.</li>
            </ul>
            <p>This approach ensures transparency, promotes consistency across modules, and supports programme teams in making informed, learner-centred, and feasible decisions about delivery.</p>

            <hr className="my-8 border-slate-200" />

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Reference List</h3>
            <ul className="text-xs text-slate-500 space-y-2 font-mono break-words">
              <li>Beatty, B. J. (2019). Hybrid-Flexible course design: Implementing student-directed hybrid classes. EdTech Books. https://edtechbooks.org/hyflex</li>
              <li>Biggs, J., & Tang, C. (2011). Teaching for quality learning at university (4th ed.). Open University Press.</li>
              <li>CAST. (2018). Universal Design for Learning guidelines version 2.2. CAST. https://udlguidelines.cast.org/</li>
              <li>Chickering, A. W., & Gamson, Z. F. (1987). Seven principles for good practice in undergraduate education. AAHE Bulletin, 39(7), 3–7.</li>
              <li>Evans, C. (2013). Making sense of assessment feedback in higher education. Review of Educational Research, 83(1), 70–120. https://doi.org/10.3102/0034654312474350</li>
              <li>Garrison, D. R., & Vaughan, N. D. (2008). Blended learning in higher education: Framework, principles, and guidelines. Jossey-Bass.</li>
              <li>Graham, C. R. (2013). Emerging practice and research in blended learning. In M. G. Moore (Ed.), Handbook of distance education (3rd ed., pp. 333–350). Routledge.</li>
              <li>JISC. (2020). Student digital experience insights survey 2020: Findings from UK higher education. JISC. https://www.jisc.ac.uk/</li>
              <li>Means, B., Toyama, Y., Murphy, R., & Baki, M. (2013). The effectiveness of online and blended learning: A meta-analysis of the empirical literature. Teachers College Record, 115(3), 1–47.</li>
              <li>Nicol, D., & Macfarlane‐Dick, D. (2006). Formative assessment and self‐regulated learning: A model and seven principles of good feedback practice. Studies in Higher Education, 31(2), 199–218. https://doi.org/10.1080/03075070600572090</li>
              <li>Redecker, C. (2017). European framework for the digital competence of educators: DigCompEdu. Publications Office of the European Union. https://doi.org/10.2760/159770</li>
              <li>Thomas, L. (2012). Building student engagement and belonging in higher education at a time of change. Paul Hamlyn Foundation.</li>
              <li>Tinto, V. (2017). Reflections on student persistence. Student Success, 8(2), 1–8. https://doi.org/10.5204/ssj.v8i2.376</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
