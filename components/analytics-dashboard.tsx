"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BarChart3, LucidePieChart, TrendingUp, Download, Calendar, FileText, Loader2, CheckCircle } from "lucide-react"
import {
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { cn } from "@/lib/utils"
import { Pie } from "recharts"

// Demo data for analytics
const alertsBySeverity = [
  { name: "Critical", value: 23, color: "var(--severity-critical)" },
  { name: "High", value: 45, color: "var(--severity-high)" },
  { name: "Medium", value: 78, color: "var(--severity-medium)" },
  { name: "Low", value: 156, color: "var(--severity-low)" },
  { name: "Info", value: 234, color: "var(--severity-info)" },
]

const casesByStatus = [
  { status: "New", count: 8 },
  { status: "In Progress", count: 15 },
  { status: "Awaiting Intel", count: 6 },
  { status: "Resolved", count: 42 },
]

const compromiseAttempts = [
  { region: "North America", attempts: 234, severity: "medium" },
  { region: "Europe", attempts: 189, severity: "high" },
  { region: "Asia Pacific", attempts: 456, severity: "critical" },
  { region: "South America", attempts: 67, severity: "low" },
  { region: "Africa", attempts: 123, severity: "medium" },
  { region: "Middle East", attempts: 298, severity: "high" },
]

const weeklyTrends = [
  { week: "Week 1", alerts: 245, cases: 12, incidents: 8 },
  { week: "Week 2", alerts: 289, cases: 15, incidents: 6 },
  { week: "Week 3", alerts: 356, cases: 18, incidents: 12 },
  { week: "Week 4", alerts: 298, cases: 14, incidents: 9 },
]

const toolOptions = [
  { id: "wazuh", label: "Wazuh", description: "Security monitoring and alerting" },
  { id: "velociraptor", label: "Velociraptor", description: "Endpoint visibility and forensics" },
  { id: "firewall", label: "Firewall", description: "Network security and traffic analysis" },
  { id: "zabbix", label: "Zabbix", description: "Infrastructure monitoring" },
  { id: "phishing", label: "Phishing", description: "Email security analysis" },
]

const dateRanges = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "1y", label: "Last year" },
]

export function AnalyticsDashboard() {
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [selectedDateRange, setSelectedDateRange] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const handleToolToggle = (toolId: string) => {
    setSelectedTools((prev) => (prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]))
  }

  const generateReport = async () => {
    if (selectedTools.length === 0 || !selectedDateRange) return

    setIsGenerating(true)
    setReportGenerated(false)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setReportGenerated(true)
    setIsGenerating(false)
  }

  const downloadReport = () => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href =
      "data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKFNPQyBSZXBvcnQpCi9Qcm9kdWNlciAoU09DIERhc2hib2FyZCkKPj4KZW5kb2JqCnhyZWYKMCAxCjAwMDAwMDAwMDAgNjU1MzUgZiAKdHJhaWxlcgo8PAovU2l6ZSAxCi9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo5CiUlRU9G"
    link.download = `SOC_Report_${new Date().toISOString().split("T")[0]}.pdf`
    link.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Analytics & Reporting</h2>
          <p className="text-muted-foreground">High-level trends to help SOC managers prioritize response</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Custom Report Builder</DialogTitle>
              <DialogDescription>
                Select tools and date range to generate a comprehensive security report
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Select Tools</Label>
                <div className="space-y-2">
                  {toolOptions.map((tool) => (
                    <div key={tool.id} className="flex items-start space-x-2">
                      <Checkbox
                        id={tool.id}
                        checked={selectedTools.includes(tool.id)}
                        onCheckedChange={() => handleToolToggle(tool.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={tool.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {tool.label}
                        </label>
                        <p className="text-xs text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={generateReport}
                disabled={selectedTools.length === 0 || !selectedDateRange || isGenerating}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </>
                )}
              </Button>

              {reportGenerated && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-800 dark:text-green-200">Report generated successfully!</span>
                  </div>
                  <Button onClick={downloadReport} variant="outline" className="w-full gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Download PDF Report
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts by Severity Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucidePieChart className="h-5 w-5" />
              Alerts by Severity
            </CardTitle>
            <CardDescription>Distribution of security alerts by severity level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={alertsBySeverity}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {alertsBySeverity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {alertsBySeverity.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cases by Status Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Cases by Status
            </CardTitle>
            <CardDescription>Current case distribution across workflow stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={casesByStatus}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compromise Attempts Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Endpoint Compromise Attempts by Region
          </CardTitle>
          <CardDescription>Geographic distribution of security incidents and attack attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compromiseAttempts.map((region) => (
              <div key={region.region} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm">{region.region}</h3>
                  <Badge
                    className={cn(
                      "text-xs",
                      region.severity === "critical"
                        ? "bg-[var(--severity-critical)] text-white"
                        : region.severity === "high"
                          ? "bg-[var(--severity-high)] text-white"
                          : region.severity === "medium"
                            ? "bg-[var(--severity-medium)] text-black"
                            : "bg-[var(--severity-low)] text-white",
                    )}
                  >
                    {region.severity}
                  </Badge>
                </div>
                <div className="text-2xl font-bold">{region.attempts}</div>
                <div className="text-xs text-muted-foreground">compromise attempts</div>
                <div className="mt-2 bg-muted rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-green-500 to-red-500"
                    style={{ width: `${Math.min((region.attempts / 500) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Security Trends
          </CardTitle>
          <CardDescription>Trends in alerts, cases, and incidents over the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alerts" stroke="var(--chart-1)" strokeWidth={2} name="Alerts" />
                <Line type="monotone" dataKey="cases" stroke="var(--chart-2)" strokeWidth={2} name="Cases" />
                <Line type="monotone" dataKey="incidents" stroke="var(--chart-3)" strokeWidth={2} name="Incidents" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Alerts (30d)</p>
                <p className="text-2xl font-bold">1,188</p>
                <p className="text-xs text-green-600">↑ 12% from last month</p>
              </div>
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                <p className="text-2xl font-bold">29</p>
                <p className="text-xs text-yellow-600">↑ 3 new this week</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">MTTR (Hours)</p>
                <p className="text-2xl font-bold">4.2</p>
                <p className="text-xs text-green-600">↓ 0.8h improvement</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Threat Score</p>
                <p className="text-2xl font-bold text-orange-600">7.3</p>
                <p className="text-xs text-red-600">↑ High risk level</p>
              </div>
              <Badge className="bg-orange-500 text-white">HIGH</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
