"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, FileCheck, AlertTriangle, CheckCircle2 } from "lucide-react"

export function SecurityCompliance() {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-blue-900/30">
        <CardHeader>
          <CardTitle className="text-white">Security & Compliance Framework</CardTitle>
          <CardDescription className="text-blue-300">
            Enterprise-grade security with automated compliance validation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Security Standards</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "TLS 1.3", status: "Implemented", color: "green" },
                  { name: "OAuth 2.0 / OIDC", status: "Implemented", color: "green" },
                  { name: "AES-256 Encryption", status: "Implemented", color: "green" },
                  { name: "Zero Trust Architecture", status: "Implemented", color: "green" },
                  { name: "Quantum-Safe Cryptography", status: "In Progress", color: "blue" },
                ].map((standard) => (
                  <div
                    key={standard.name}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700/50"
                  >
                    <span className="text-sm text-blue-100">{standard.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        standard.color === "green"
                          ? "border-green-500/50 text-green-400"
                          : "border-blue-500/50 text-blue-400"
                      }`}
                    >
                      {standard.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck className="h-6 w-6 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Compliance Certifications</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "HIPAA", status: "Certified", color: "green" },
                  { name: "GDPR", status: "Certified", color: "green" },
                  { name: "FDA 21 CFR Part 11", status: "Certified", color: "green" },
                  { name: "SOC 2 Type II", status: "In Progress", color: "blue" },
                  { name: "ISO 27001", status: "Planned", color: "orange" },
                ].map((cert) => (
                  <div
                    key={cert.name}
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700/50"
                  >
                    <span className="text-sm text-blue-100">{cert.name}</span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        cert.color === "green"
                          ? "border-green-500/50 text-green-400"
                          : cert.color === "blue"
                            ? "border-blue-500/50 text-blue-400"
                            : "border-orange-500/50 text-orange-400"
                      }`}
                    >
                      {cert.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="bg-blue-950/30 border-blue-900/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-white text-lg">Immutable Audit Trail</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-blue-100">
              <p className="text-sm leading-relaxed">
                DNALANG maintains cryptographically signed, immutable audit logs of all system modifications, ensuring
                that autonomous evolution never violates regulatory boundaries.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900/50 rounded border border-blue-900/30">
                  <div className="text-xs text-blue-400 mb-1">Events Logged</div>
                  <div className="text-lg font-bold text-white">100%</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded border border-blue-900/30">
                  <div className="text-xs text-blue-400 mb-1">Retention Period</div>
                  <div className="text-lg font-bold text-white">7 Years</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded border border-blue-900/30">
                  <div className="text-xs text-blue-400 mb-1">Tamper Detection</div>
                  <div className="text-lg font-bold text-white">Real-time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-950/30 border-green-900/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <CardTitle className="text-white text-lg">Self-Certifying Compliance</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-green-100">
              <p className="text-sm leading-relaxed">
                The system continuously validates its own compliance state, automatically generating compliance reports
                and alerting administrators to potential violations before they occur.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Automated policy enforcement across all infrastructure layers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Real-time compliance scoring with predictive violation detection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>Automatic remediation workflows for common compliance gaps</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-orange-950/30 border-orange-900/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <CardTitle className="text-white text-lg">Sovereign Cloud Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-orange-100">
              <p className="text-sm leading-relaxed">
                DNALANG provides native support for sovereign cloud deployments, ensuring data residency requirements
                and regulatory compliance for highly regulated industries.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/50 rounded border border-orange-900/30">
                  <div className="text-sm font-medium text-white mb-1">Data Residency</div>
                  <div className="text-xs text-orange-200">Configurable per-region data storage with geo-fencing</div>
                </div>
                <div className="p-3 bg-slate-900/50 rounded border border-orange-900/30">
                  <div className="text-sm font-medium text-white mb-1">Air-Gapped Mode</div>
                  <div className="text-xs text-orange-200">Full functionality without external network access</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
