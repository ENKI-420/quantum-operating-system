"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, AlertCircle } from "lucide-react"

const enhancements = [
  {
    category: "Navigation",
    items: [
      { name: "Responsive sidebar navigation", status: "complete", impact: "high" },
      { name: "Breadcrumb navigation", status: "complete", impact: "medium" },
      { name: "Quick access shortcuts", status: "complete", impact: "high" },
      { name: "Search functionality", status: "in-progress", impact: "high" },
    ],
  },
  {
    category: "Accessibility",
    items: [
      { name: "WCAG 2.1 AA compliance", status: "complete", impact: "critical" },
      { name: "Keyboard navigation", status: "complete", impact: "critical" },
      { name: "Screen reader support", status: "complete", impact: "critical" },
      { name: "High contrast mode", status: "complete", impact: "high" },
      { name: "Font size adjustment", status: "complete", impact: "medium" },
    ],
  },
  {
    category: "Responsive Design",
    items: [
      { name: "Mobile optimization", status: "complete", impact: "critical" },
      { name: "Tablet layout", status: "complete", impact: "high" },
      { name: "Desktop experience", status: "complete", impact: "high" },
      { name: "Touch-friendly controls", status: "complete", impact: "high" },
    ],
  },
  {
    category: "Data Visualization",
    items: [
      { name: "Quantum circuit visualizer", status: "complete", impact: "critical" },
      { name: "Real-time metrics charts", status: "complete", impact: "high" },
      { name: "Interactive cost analysis", status: "complete", impact: "high" },
      { name: "3D landscape visualization", status: "complete", impact: "medium" },
    ],
  },
  {
    category: "Performance",
    items: [
      { name: "Code splitting", status: "complete", impact: "high" },
      { name: "Lazy loading", status: "complete", impact: "high" },
      { name: "Image optimization", status: "complete", impact: "medium" },
      { name: "Caching strategy", status: "complete", impact: "high" },
    ],
  },
  {
    category: "User Feedback",
    items: [
      { name: "Toast notifications", status: "complete", impact: "medium" },
      { name: "Loading states", status: "complete", impact: "high" },
      { name: "Error messages", status: "complete", impact: "high" },
      { name: "Success confirmations", status: "complete", impact: "medium" },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "complete":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "in-progress":
      return <AlertCircle className="h-4 w-4 text-yellow-500" />
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />
  }
}

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "critical":
      return "bg-red-500/10 text-red-500 border-red-500/20"
    case "high":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20"
    case "medium":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    default:
      return "bg-gray-500/10 text-gray-500 border-gray-500/20"
  }
}

export function UXEnhancementDashboard() {
  const totalItems = enhancements.reduce((sum, cat) => sum + cat.items.length, 0)
  const completedItems = enhancements.reduce(
    (sum, cat) => sum + cat.items.filter((item) => item.status === "complete").length,
    0,
  )
  const completionPercentage = Math.round((completedItems / totalItems) * 100)

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">UX Enhancement Dashboard</CardTitle>
          <CardDescription>Comprehensive UI/UX improvements and feature development</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedItems} / {totalItems} completed
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{completionPercentage}% complete</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-green-500">{completedItems}</div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card className="border-yellow-500/20 bg-yellow-500/5">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-yellow-500">
                    {enhancements.reduce(
                      (sum, cat) => sum + cat.items.filter((item) => item.status === "in-progress").length,
                      0,
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </CardContent>
              </Card>
              <Card className="border-blue-500/20 bg-blue-500/5">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-blue-500">{enhancements.length}</div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={enhancements[0].category} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          {enhancements.map((cat) => (
            <TabsTrigger key={cat.category} value={cat.category}>
              {cat.category}
            </TabsTrigger>
          ))}
        </TabsList>

        {enhancements.map((cat) => (
          <TabsContent key={cat.category} value={cat.category} className="mt-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>{cat.category} Enhancements</CardTitle>
                <CardDescription>
                  {cat.items.filter((item) => item.status === "complete").length} of {cat.items.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cat.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <Badge variant="outline" className={getImpactColor(item.impact)}>
                        {item.impact}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
