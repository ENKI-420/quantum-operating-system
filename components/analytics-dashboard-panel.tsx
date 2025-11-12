"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, DollarSign, Clock, Zap } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export function AnalyticsDashboardPanel() {
  const jobTrends = [
    { date: "Mon", completed: 45, failed: 3, queued: 12 },
    { date: "Tue", completed: 52, failed: 2, queued: 15 },
    { date: "Wed", completed: 48, failed: 4, queued: 10 },
    { date: "Thu", completed: 61, failed: 1, queued: 18 },
    { date: "Fri", completed: 55, failed: 2, queued: 14 },
    { date: "Sat", completed: 38, failed: 1, queued: 8 },
    { date: "Sun", completed: 42, failed: 2, queued: 11 },
  ]

  const coherenceData = [
    { time: "00:00", coherence: 0.856 },
    { time: "04:00", coherence: 0.892 },
    { time: "08:00", coherence: 0.878 },
    { time: "12:00", coherence: 0.901 },
    { time: "16:00", coherence: 0.885 },
    { time: "20:00", coherence: 0.912 },
  ]

  const backendUsage = [
    { name: "ibm_torino", value: 35, color: "#3b82f6" },
    { name: "ibm_kyoto", value: 28, color: "#8b5cf6" },
    { name: "ibm_osaka", value: 22, color: "#06b6d4" },
    { name: "ibm_brisbane", value: 15, color: "#10b981" },
  ]

  const costData = [
    { month: "Jan", cost: 1250 },
    { month: "Feb", cost: 1420 },
    { month: "Mar", cost: 1180 },
    { month: "Apr", cost: 1650 },
    { month: "May", cost: 1380 },
    { month: "Jun", cost: 1520 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
        <p className="text-sm text-gray-400">Real-time insights and performance metrics</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4 bg-gray-900/50 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-blue-400" />
            <Badge className="bg-green-600 text-white flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12%
            </Badge>
          </div>
          <p className="text-sm text-gray-400">Total Jobs</p>
          <p className="text-2xl font-bold text-white">1,247</p>
        </Card>

        <Card className="p-4 bg-gray-900/50 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-purple-400" />
            <Badge className="bg-green-600 text-white flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8%
            </Badge>
          </div>
          <p className="text-sm text-gray-400">Avg Coherence</p>
          <p className="text-2xl font-bold text-white">0.889</p>
        </Card>

        <Card className="p-4 bg-gray-900/50 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <Badge className="bg-red-600 text-white flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              -15%
            </Badge>
          </div>
          <p className="text-sm text-gray-400">Total Cost</p>
          <p className="text-2xl font-bold text-white">$8,400</p>
        </Card>

        <Card className="p-4 bg-gray-900/50 border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <Badge className="bg-green-600 text-white flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +5%
            </Badge>
          </div>
          <p className="text-sm text-gray-400">Avg Queue Time</p>
          <p className="text-2xl font-bold text-white">4.2m</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Job Completion Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={jobTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
              <Legend />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
              <Bar dataKey="failed" fill="#ef4444" name="Failed" />
              <Bar dataKey="queued" fill="#8b5cf6" name="Queued" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Coherence Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={coherenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis domain={[0.8, 1.0]} stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
              <Line type="monotone" dataKey="coherence" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Backend Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={backendUsage}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {backendUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Monthly Cost Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }} />
              <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
