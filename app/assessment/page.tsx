import { TechnicalAssessment } from "@/components/technical-assessment"

export default function AssessmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      <header className="border-b border-blue-900/30 bg-slate-950/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-white">DNALANG × IBM Technical Assessment</h1>
          <p className="text-sm text-blue-300">Comprehensive deployment framework and integration strategy</p>
        </div>
      </header>
      <div className="container mx-auto px-6 py-12">
        <TechnicalAssessment />
      </div>
    </div>
  )
}
