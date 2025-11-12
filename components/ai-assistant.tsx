"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, X, Send, Lightbulb, Zap, TrendingUp } from "lucide-react"

interface AISuggestion {
  id: string
  type: "optimization" | "insight" | "automation"
  title: string
  description: string
  impact: "high" | "medium" | "low"
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  const suggestions: AISuggestion[] = [
    {
      id: "1",
      type: "optimization",
      title: "Circuit Optimization Available",
      description: "Your circuit can be reduced by 23% using gate fusion",
      impact: "high",
    },
    {
      id: "2",
      type: "insight",
      title: "Backend Recommendation",
      description: "ibm_brisbane is 40% faster for your workload",
      impact: "high",
    },
    {
      id: "3",
      type: "automation",
      title: "Auto-scaling Suggested",
      description: "Enable auto-scaling to reduce costs by 30%",
      impact: "medium",
    },
  ]

  return (
    <>
      {/* AI Assistant Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        size="icon"
      >
        <Sparkles className="h-6 w-6" />
      </Button>

      {/* AI Assistant Panel */}
      {isOpen && (
        <Card className="fixed bottom-36 right-4 md:bottom-24 md:right-6 z-50 w-[calc(100vw-2rem)] md:w-96 max-h-[60vh] flex flex-col shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-sm text-muted-foreground mb-4">
              I've analyzed your quantum workflows and found these opportunities:
            </div>

            {suggestions.map((suggestion) => {
              const Icon =
                suggestion.type === "optimization" ? Zap : suggestion.type === "insight" ? Lightbulb : TrendingUp

              return (
                <Card key={suggestion.id} className="p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        suggestion.impact === "high" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">{suggestion.title}</h4>
                      <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 px-3 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="icon" className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
