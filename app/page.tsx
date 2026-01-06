"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/Navigation"

export default function HomePage() {
  const features = [
    {
      title: "Quantum Lab",
      description:
        "Run quantum experiments with AIDEN AI assistant. Execute circuits, monitor jobs, and analyze results in real-time.",
      href: "/quantum",
      metric: "5+ Algorithms",
      icon: "⚛️",
    },
    {
      title: "DNA-Lang Platform",
      description:
        "Visualize organism states with Gemini-powered insights. Generate documentation and analyze quantum DNA structures.",
      href: "/dna-lang",
      metric: "AI-Powered",
      icon: "🧬",
    },
    {
      title: "Research Dashboard",
      description:
        "Autonomous experiment orchestration with auto-enhancement. Monitor breakthroughs and optimize parameters automatically.",
      href: "/research",
      metric: "Auto-Optimize",
      icon: "🔬",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
            The complete platform for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              quantum computing
            </span>{" "}
            research.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Accelerate scientific breakthroughs with autonomous experiments, AI-powered insights, and self-optimizing
            quantum algorithms.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
              Start Experimenting
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-12 px-8 bg-transparent">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { value: "10x", label: "faster", sublabel: "experiment iteration" },
            { value: "95%", label: "accuracy", sublabel: "in predictions" },
            { value: "24/7", label: "autonomous", sublabel: "operation" },
            { value: "∞", label: "scalable", sublabel: "quantum circuits" },
          ].map((stat, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-lg font-medium">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Accelerate your research.</h2>
            <p className="text-xl text-muted-foreground">
              Three powerful platforms working together to advance quantum computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <Card className="bg-card border-border hover:border-primary transition-all h-full group cursor-pointer">
                  <CardHeader>
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      {feature.metric}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 max-w-4xl mx-auto">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to advance quantum science?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join researchers using Quantum OS to accelerate breakthroughs in quantum computing, materials science, and
              beyond.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12 px-8">
              Get Started Free
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <span className="font-bold">Quantum OS</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2025 Quantum OS. Powered by DNALang v2.5</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
