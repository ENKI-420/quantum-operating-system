"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, Key, FileCheck, AlertTriangle, CheckCircle2, Eye, Database, Server, Globe } from "lucide-react"

export function SecurityComplianceDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Security & Compliance Framework
            </h1>
            <p className="text-gray-400 mt-2">Enterprise-grade security for quantum computing infrastructure</p>
          </div>
          <Badge className="bg-green-600 text-white px-4 py-2">All Systems Secure</Badge>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Shield className="w-6 h-6 text-green-400" />
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-gray-400">Security Score</p>
            <p className="text-3xl font-bold text-white">98/100</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <FileCheck className="w-6 h-6 text-blue-400" />
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-sm text-gray-400">Compliance Status</p>
            <p className="text-3xl font-bold text-white">100%</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
              <span className="text-xs text-gray-400">Last 30 days</span>
            </div>
            <p className="text-sm text-gray-400">Security Incidents</p>
            <p className="text-3xl font-bold text-white">0</p>
          </Card>

          <Card className="p-4 bg-gray-900/50 border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-6 h-6 text-purple-400" />
              <span className="text-xs text-gray-400">Active</span>
            </div>
            <p className="text-sm text-gray-400">Audit Logs</p>
            <p className="text-3xl font-bold text-white">24/7</p>
          </Card>
        </div>

        <Tabs defaultValue="certifications" className="space-y-6">
          <TabsList className="bg-gray-900 border border-gray-800 grid grid-cols-5 w-full">
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="access-control">Access Control</TabsTrigger>
            <TabsTrigger value="encryption">Encryption</TabsTrigger>
            <TabsTrigger value="audit">Audit & Monitoring</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="certifications" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Security Certifications & Standards</h3>
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    name: "SOC 2 Type II",
                    status: "Certified",
                    date: "Valid until Dec 2025",
                    color: "green",
                    icon: <Shield className="w-8 h-8" />,
                  },
                  {
                    name: "ISO 27001",
                    status: "Certified",
                    date: "Valid until Mar 2026",
                    color: "blue",
                    icon: <FileCheck className="w-8 h-8" />,
                  },
                  {
                    name: "HIPAA Compliant",
                    status: "Certified",
                    date: "Ongoing compliance",
                    color: "purple",
                    icon: <Lock className="w-8 h-8" />,
                  },
                  {
                    name: "GDPR Compliant",
                    status: "Certified",
                    date: "EU data protection",
                    color: "cyan",
                    icon: <Globe className="w-8 h-8" />,
                  },
                  {
                    name: "FedRAMP",
                    status: "In Progress",
                    date: "Expected Q3 2025",
                    color: "yellow",
                    icon: <Server className="w-8 h-8" />,
                  },
                  {
                    name: "PCI DSS",
                    status: "Certified",
                    date: "Level 1 compliant",
                    color: "green",
                    icon: <Key className="w-8 h-8" />,
                  },
                ].map((cert, idx) => (
                  <Card key={idx} className={`p-6 bg-${cert.color}-900/20 border-${cert.color}-500/30`}>
                    <div className={`text-${cert.color}-400 mb-4`}>{cert.icon}</div>
                    <h4 className="text-lg font-semibold mb-2">{cert.name}</h4>
                    <Badge className={`bg-${cert.color}-600 text-white mb-2`}>{cert.status}</Badge>
                    <p className="text-sm text-gray-400">{cert.date}</p>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="access-control" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Access Control & Authentication</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-6 bg-blue-900/20 border-blue-500/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Key className="w-5 h-5 text-blue-400" />
                      Multi-Factor Authentication (MFA)
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Enforcement</span>
                        <Badge className="bg-green-600">Required</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Methods</span>
                        <span className="text-sm text-white">TOTP, SMS, Hardware Keys</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Adoption Rate</span>
                        <span className="text-sm text-green-400 font-semibold">100%</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-purple-900/20 border-purple-500/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-400" />
                      Role-Based Access Control (RBAC)
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Roles Defined</span>
                        <span className="text-sm text-white">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Permissions</span>
                        <span className="text-sm text-white">45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Least Privilege</span>
                        <Badge className="bg-green-600">Enforced</Badge>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 bg-gray-800/50 border-gray-700">
                  <h4 className="text-lg font-semibold mb-4">User Roles & Permissions</h4>
                  <div className="space-y-3">
                    {[
                      { role: "Super Admin", users: 2, permissions: "Full system access" },
                      { role: "Admin", users: 5, permissions: "User management, configuration" },
                      { role: "Developer", users: 24, permissions: "Circuit creation, execution" },
                      { role: "Analyst", users: 18, permissions: "Read-only, analytics" },
                      { role: "Auditor", users: 3, permissions: "Audit logs, compliance reports" },
                    ].map((role, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded">
                        <div>
                          <p className="font-semibold">{role.role}</p>
                          <p className="text-sm text-gray-400">{role.permissions}</p>
                        </div>
                        <Badge variant="secondary">{role.users} users</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="encryption" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Encryption & Data Protection</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-6 bg-green-900/20 border-green-500/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-400" />
                      Data at Rest
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Algorithm</span>
                        <span className="text-sm text-white">AES-256-GCM</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Key Management</span>
                        <span className="text-sm text-white">AWS KMS / Azure Key Vault</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Key Rotation</span>
                        <Badge className="bg-green-600">Automatic (90 days)</Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-blue-900/20 border-blue-500/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-400" />
                      Data in Transit
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Protocol</span>
                        <span className="text-sm text-white">TLS 1.3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Certificate</span>
                        <span className="text-sm text-white">EV SSL (Extended Validation)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Perfect Forward Secrecy</span>
                        <Badge className="bg-green-600">Enabled</Badge>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-6 bg-purple-900/20 border-purple-500/30">
                  <h4 className="text-lg font-semibold mb-4">Quantum-Safe Cryptography</h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Preparing for post-quantum cryptography with hybrid encryption schemes
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-900/50 rounded">
                      <p className="text-xs text-gray-400 mb-1">Current</p>
                      <p className="font-semibold">RSA-4096 + ECDSA</p>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded">
                      <p className="text-xs text-gray-400 mb-1">Hybrid (2025)</p>
                      <p className="font-semibold">Kyber + Dilithium</p>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded">
                      <p className="text-xs text-gray-400 mb-1">Post-Quantum (2026)</p>
                      <p className="font-semibold">NIST PQC Standards</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Audit Logging & Monitoring</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 bg-blue-900/20 border-blue-500/30">
                    <Eye className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-400">Events Logged (24h)</p>
                    <p className="text-2xl font-bold text-white">1.2M</p>
                  </Card>
                  <Card className="p-4 bg-green-900/20 border-green-500/30">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mb-2" />
                    <p className="text-sm text-gray-400">Retention Period</p>
                    <p className="text-2xl font-bold text-white">7 Years</p>
                  </Card>
                  <Card className="p-4 bg-purple-900/20 border-purple-500/30">
                    <AlertTriangle className="w-6 h-6 text-purple-400 mb-2" />
                    <p className="text-sm text-gray-400">Alerts Triggered</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </Card>
                </div>

                <Card className="p-6 bg-gray-800/50 border-gray-700">
                  <h4 className="text-lg font-semibold mb-4">Audit Log Categories</h4>
                  <div className="space-y-2">
                    {[
                      { category: "Authentication Events", count: "245K", status: "Normal" },
                      { category: "Authorization Changes", count: "1.2K", status: "Normal" },
                      { category: "Data Access", count: "892K", status: "Normal" },
                      { category: "Configuration Changes", count: "156", status: "Normal" },
                      { category: "Security Events", count: "0", status: "Secure" },
                    ].map((log, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded">
                        <span className="font-semibold">{log.category}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-400">{log.count} events</span>
                          <Badge className="bg-green-600">{log.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-cyan-900/20 border-cyan-500/30">
                  <h4 className="text-lg font-semibold mb-4">Real-time Monitoring</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">SIEM Integration</p>
                      <p className="text-white">Splunk, Datadog, ELK Stack</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Alert Channels</p>
                      <p className="text-white">Email, Slack, PagerDuty</p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card className="p-6 bg-gray-900/50 border-gray-800">
              <h3 className="text-2xl font-bold mb-6">Regulatory Compliance</h3>
              <div className="space-y-6">
                {[
                  {
                    regulation: "GDPR (General Data Protection Regulation)",
                    region: "European Union",
                    status: "Compliant",
                    color: "blue",
                    requirements: [
                      "Right to erasure implemented",
                      "Data portability enabled",
                      "Privacy by design enforced",
                      "DPO appointed",
                    ],
                  },
                  {
                    regulation: "HIPAA (Health Insurance Portability and Accountability Act)",
                    region: "United States",
                    status: "Compliant",
                    color: "purple",
                    requirements: [
                      "PHI encryption at rest and in transit",
                      "Access controls and audit logs",
                      "Business Associate Agreements (BAA)",
                      "Breach notification procedures",
                    ],
                  },
                  {
                    regulation: "SOC 2 Type II",
                    region: "Global",
                    status: "Certified",
                    color: "green",
                    requirements: [
                      "Security controls validated",
                      "Availability monitoring",
                      "Processing integrity verified",
                      "Confidentiality maintained",
                    ],
                  },
                ].map((compliance, idx) => (
                  <Card key={idx} className={`p-6 bg-${compliance.color}-900/20 border-${compliance.color}-500/30`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">{compliance.regulation}</h4>
                        <p className="text-sm text-gray-400">{compliance.region}</p>
                      </div>
                      <Badge className={`bg-${compliance.color}-600 text-white`}>{compliance.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      {compliance.requirements.map((req, reqIdx) => (
                        <div key={reqIdx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 text-${compliance.color}-400 mt-0.5`} />
                          <span className="text-sm text-gray-300">{req}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Security Posture: Excellent</h3>
              <p className="text-sm text-gray-400">
                All security controls active, zero incidents in the last 90 days, 100% compliance across all frameworks
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">Download Security Report</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
