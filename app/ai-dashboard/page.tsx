import { MobileFirstNavigation } from "@/components/mobile-first-navigation"
import { AIAssistant } from "@/components/ai-assistant"
import { Card } from "@/components/ui/card"
import { Sparkles, Zap, TrendingUp, Target, Brain, Cpu } from "lucide-react"

export default function AIDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <MobileFirstNavigation />
      <AIAssistant />

      {/* Mobile-first layout with proper spacing for bottom nav */}
      <main className="pb-20 md:pb-6 md:ml-64">
        {/* Header */}
        <div className="p-4 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">AI Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Intelligent insights and automation for your quantum workflows
          </p>
        </div>

        {/* AI Insights Grid - Mobile-first responsive */}
        <div className="px-4 md:px-8 space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">Optimizations</span>
              </div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs text-green-500">+12% this week</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Efficiency</span>
              </div>
              <div className="text-2xl font-bold">94%</div>
              <div className="text-xs text-green-500">+8% improvement</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-500" />
                <span className="text-xs text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-2xl font-bold">98.2%</div>
              <div className="text-xs text-green-500">+2.1% better</div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-pink-500" />
                <span className="text-xs text-muted-foreground">AI Actions</span>
              </div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-xs text-green-500">+34 today</div>
            </Card>
          </div>

          {/* AI Features */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">AI-Powered Features</h2>

            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Cpu className="h-6 w-6 text-purple-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2">Smart Circuit Optimization</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    AI automatically analyzes and optimizes your quantum circuits for better performance
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                      23% faster execution
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                      15% fewer gates
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                  <Brain className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2">Intelligent Backend Selection</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ML models predict the best quantum backend for your specific workload
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                      40% cost reduction
                    </span>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium">
                      98% accuracy
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-500/10 rounded-xl">
                  <Sparkles className="h-6 w-6 text-pink-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold mb-2">Predictive Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Forecast resource needs and potential issues before they occur
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
                      85% issue prevention
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                      Real-time alerts
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
