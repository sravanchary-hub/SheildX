"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Search, Filter, Eye, Play, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// Demo data for alerts
const alertsData = [
  {
    id: "ALT-001",
    timestamp: "2024-01-15 14:32:15",
    agent: "WEB-SRV-01",
    type: "Malware Detection",
    severity: "critical",
    description: "Trojan.Win32.Agent detected in C:\\temp\\malicious.exe",
    status: "open",
    observables: ["192.168.1.100", "malicious.exe", "C:\\temp\\"],
  },
  {
    id: "ALT-002",
    timestamp: "2024-01-15 14:28:42",
    agent: "DB-SRV-02",
    type: "Failed Login",
    severity: "medium",
    description: "Multiple failed login attempts from 203.0.113.45",
    status: "investigating",
    observables: ["203.0.113.45", "admin", "database"],
  },
  {
    id: "ALT-003",
    timestamp: "2024-01-15 14:25:18",
    agent: "MAIL-SRV-01",
    type: "Phishing Email",
    severity: "high",
    description: "Suspicious email with malicious attachment detected",
    status: "open",
    observables: ["phishing@evil.com", "invoice.pdf.exe", "SMTP"],
  },
  {
    id: "ALT-004",
    timestamp: "2024-01-15 14:20:33",
    agent: "FW-01",
    type: "Port Scan",
    severity: "low",
    description: "Port scanning activity detected from external IP",
    status: "closed",
    observables: ["198.51.100.25", "TCP", "22,80,443"],
  },
  {
    id: "ALT-005",
    timestamp: "2024-01-15 14:15:07",
    agent: "WEB-SRV-02",
    type: "SQL Injection",
    severity: "high",
    description: "SQL injection attempt detected in web application",
    status: "escalated",
    observables: ["10.0.0.50", "login.php", "' OR 1=1--"],
  },
]

// Demo data for cases
const casesData = [
  {
    id: "CASE-001",
    title: "APT Campaign Investigation",
    severity: "critical",
    analyst: "Alice Johnson",
    alertsCount: 15,
    status: "new",
    created: "2024-01-15 13:45:00",
  },
  {
    id: "CASE-002",
    title: "Insider Threat Analysis",
    severity: "high",
    analyst: "Bob Smith",
    alertsCount: 8,
    status: "in-progress",
    created: "2024-01-15 10:30:00",
  },
  {
    id: "CASE-003",
    title: "Phishing Campaign Response",
    severity: "medium",
    analyst: "Carol Davis",
    alertsCount: 23,
    status: "awaiting-intel",
    created: "2024-01-14 16:20:00",
  },
  {
    id: "CASE-004",
    title: "Malware Outbreak Containment",
    severity: "critical",
    analyst: "David Wilson",
    alertsCount: 42,
    status: "resolved",
    created: "2024-01-14 09:15:00",
  },
]

const severityColors = {
  info: "bg-[var(--severity-info)] text-white",
  low: "bg-[var(--severity-low)] text-white",
  medium: "bg-[var(--severity-medium)] text-black",
  high: "bg-[var(--severity-high)] text-white",
  critical: "bg-[var(--severity-critical)] text-white",
}

const statusColors = {
  open: "bg-blue-500 text-white",
  investigating: "bg-yellow-500 text-black",
  escalated: "bg-orange-500 text-white",
  closed: "bg-green-500 text-white",
  new: "bg-blue-500 text-white",
  "in-progress": "bg-yellow-500 text-black",
  "awaiting-intel": "bg-purple-500 text-white",
  resolved: "bg-green-500 text-white",
}

export function AlertsDashboard() {
  const [selectedAlert, setSelectedAlert] = useState<(typeof alertsData)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string | null>(null)

  const filteredAlerts = alertsData.filter((alert) => {
    const matchesSearch =
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.agent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  const runAnalyzer = async () => {
    setIsAnalyzing(true)
    setAnalysisResult(null)

    // Simulate analyzer processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const results = ["Malicious", "Suspicious", "Clean"]
    const randomResult = results[Math.floor(Math.random() * results.length)]
    setAnalysisResult(randomResult)
    setIsAnalyzing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Alerts & Case Management</h2>
          <p className="text-muted-foreground">Monitor and manage security alerts from Wazuh and TheHive integration</p>
        </div>
      </div>

      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
          <TabsTrigger value="cases">Case Management</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          {/* Alerts Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Security Alerts
              </CardTitle>
              <CardDescription>Click an alert to drill down into details or escalate to a case.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Alerts Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Alert Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-mono text-sm">{alert.timestamp}</TableCell>
                        <TableCell className="font-medium">{alert.agent}</TableCell>
                        <TableCell>{alert.type}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn("text-xs", severityColors[alert.severity as keyof typeof severityColors])}
                          >
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-md truncate">{alert.description}</TableCell>
                        <TableCell>
                          <Badge className={cn("text-xs", statusColors[alert.status as keyof typeof statusColors])}>
                            {alert.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedAlert(alert)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[600px] sm:w-[800px]">
                              <SheetHeader>
                                <SheetTitle>Alert Details - {alert.id}</SheetTitle>
                                <SheetDescription>
                                  Analysts can run analyzers on observables to check for malicious indicators.
                                </SheetDescription>
                              </SheetHeader>

                              {selectedAlert && (
                                <div className="mt-6 space-y-6">
                                  <Tabs defaultValue="overview">
                                    <TabsList className="grid w-full grid-cols-4">
                                      <TabsTrigger value="overview">Overview</TabsTrigger>
                                      <TabsTrigger value="observables">Observables</TabsTrigger>
                                      <TabsTrigger value="analyzers">Analyzer Results</TabsTrigger>
                                      <TabsTrigger value="cases">Related Cases</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium">Alert ID</label>
                                          <p className="text-sm text-muted-foreground">{selectedAlert.id}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Timestamp</label>
                                          <p className="text-sm text-muted-foreground">{selectedAlert.timestamp}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Agent</label>
                                          <p className="text-sm text-muted-foreground">{selectedAlert.agent}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium">Type</label>
                                          <p className="text-sm text-muted-foreground">{selectedAlert.type}</p>
                                        </div>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Description</label>
                                        <p className="text-sm text-muted-foreground mt-1">
                                          {selectedAlert.description}
                                        </p>
                                      </div>
                                    </TabsContent>

                                    <TabsContent value="observables" className="space-y-4">
                                      <div className="space-y-2">
                                        {selectedAlert.observables.map((observable, index) => (
                                          <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border rounded-lg"
                                          >
                                            <span className="font-mono text-sm">{observable}</span>
                                            <Button variant="outline" size="sm">
                                              Investigate
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    </TabsContent>

                                    <TabsContent value="analyzers" className="space-y-4">
                                      <div className="flex items-center gap-4">
                                        <Button onClick={runAnalyzer} disabled={isAnalyzing} className="gap-2">
                                          {isAnalyzing ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                          ) : (
                                            <Play className="h-4 w-4" />
                                          )}
                                          Run Analyzer
                                        </Button>
                                        {analysisResult && (
                                          <Badge
                                            className={cn(
                                              "text-sm",
                                              analysisResult === "Malicious"
                                                ? "bg-red-500 text-white"
                                                : analysisResult === "Suspicious"
                                                  ? "bg-yellow-500 text-black"
                                                  : "bg-green-500 text-white",
                                            )}
                                          >
                                            {analysisResult}
                                          </Badge>
                                        )}
                                      </div>
                                      {isAnalyzing && (
                                        <div className="text-sm text-muted-foreground">
                                          Analyzing observables for malicious indicators...
                                        </div>
                                      )}
                                    </TabsContent>

                                    <TabsContent value="cases">
                                      <p className="text-sm text-muted-foreground">No related cases found.</p>
                                    </TabsContent>
                                  </Tabs>
                                </div>
                              )}
                            </SheetContent>
                          </Sheet>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Case Management Board</CardTitle>
              <CardDescription>Drag and drop cases to update their status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {["new", "in-progress", "awaiting-intel", "resolved"].map((status) => (
                  <div key={status} className="space-y-3">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      {status.replace("-", " ")}
                    </h3>
                    <div className="space-y-3">
                      {casesData
                        .filter((case_) => case_.status === status)
                        .map((case_) => (
                          <Card key={case_.id} className="cursor-move hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-sm">{case_.title}</h4>
                                  <Badge
                                    className={cn(
                                      "text-xs",
                                      severityColors[case_.severity as keyof typeof severityColors],
                                    )}
                                  >
                                    {case_.severity}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">ID: {case_.id}</p>
                                <p className="text-xs text-muted-foreground">Analyst: {case_.analyst}</p>
                                <p className="text-xs text-muted-foreground">Alerts: {case_.alertsCount}</p>
                                <p className="text-xs text-muted-foreground">Created: {case_.created}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
