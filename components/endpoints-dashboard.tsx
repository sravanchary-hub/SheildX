"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Monitor,
  Search,
  Filter,
  Download,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Laptop,
  Server,
  Smartphone,
} from "lucide-react"
import { cn } from "@/lib/utils"

const endpointsData = [
  {
    id: "EP-001",
    hostname: "monk-web-01",
    os: "Windows Server 2019",
    lastSeen: "2024-01-15 14:35:22",
    status: "active",
    agentVersion: "4.7.2",
    openCases: 2,
    type: "server",
    ip: "192.168.10.10",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 14:30:00",
  },
  {
    id: "EP-002",
    hostname: "monk-db-02",
    os: "Ubuntu 22.04 LTS",
    lastSeen: "2024-01-15 14:34:18",
    status: "active",
    agentVersion: "4.7.2",
    openCases: 0,
    type: "server",
    ip: "192.168.10.20",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 14:25:00",
  },
  {
    id: "EP-003",
    hostname: "monk-laptop-alice",
    os: "Windows 11 Pro",
    lastSeen: "2024-01-15 13:45:33",
    status: "active",
    agentVersion: "4.7.1",
    openCases: 1,
    type: "laptop",
    ip: "192.168.10.105",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 13:40:00",
  },
  {
    id: "EP-004",
    hostname: "monk-mail-01",
    os: "CentOS 8",
    lastSeen: "2024-01-15 12:22:15",
    status: "inactive",
    agentVersion: "4.6.8",
    openCases: 3,
    type: "server",
    ip: "192.168.10.30",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 12:20:00",
  },
  {
    id: "EP-005",
    hostname: "monk-workstation-bob",
    os: "macOS Ventura",
    lastSeen: "2024-01-15 14:32:44",
    status: "active",
    agentVersion: "4.7.2",
    openCases: 0,
    type: "laptop",
    ip: "192.168.10.115",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 14:30:00",
  },
  {
    id: "EP-006",
    hostname: "monk-mobile-carol",
    os: "Android 13",
    lastSeen: "2024-01-15 14:28:12",
    status: "active",
    agentVersion: "4.7.0",
    openCases: 0,
    type: "mobile",
    ip: "192.168.10.200",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 14:25:00",
  },
  {
    id: "EP-007",
    hostname: "monk-app-03",
    os: "Red Hat Enterprise Linux 8",
    lastSeen: "2024-01-15 14:30:55",
    status: "active",
    agentVersion: "4.7.2",
    openCases: 0,
    type: "server",
    ip: "192.168.10.40",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 14:28:00",
  },
  {
    id: "EP-008",
    hostname: "monk-laptop-dave",
    os: "Ubuntu 23.04",
    lastSeen: "2024-01-15 11:15:30",
    status: "inactive",
    agentVersion: "4.7.1",
    openCases: 0,
    type: "laptop",
    ip: "192.168.10.120",
    domain: "MONK.LOCAL",
    lastUpdate: "2024-01-15 11:10:00",
  },
]

const statusColors = {
  active: "bg-green-500 text-white",
  inactive: "bg-red-500 text-white",
}

const artifactTypes = [
  { value: "memory", label: "Memory Dump", description: "Capture system memory for analysis" },
  { value: "processes", label: "Process Tree", description: "List all running processes and their relationships" },
  { value: "timeline", label: "File Timeline", description: "Generate timeline of file system changes" },
  { value: "registry", label: "Registry Hive", description: "Export Windows registry for analysis" },
  { value: "network", label: "Network Connections", description: "Capture active network connections" },
  { value: "logs", label: "System Logs", description: "Collect system and application logs" },
]

export function EndpointsDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedEndpoint, setSelectedEndpoint] = useState<(typeof endpointsData)[0] | null>(null)
  const [selectedArtifact, setSelectedArtifact] = useState("")
  const [isCollecting, setIsCollecting] = useState(false)
  const [collectionResult, setCollectionResult] = useState<string | null>(null)

  const filteredEndpoints = endpointsData.filter((endpoint) => {
    const matchesSearch =
      endpoint.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.os.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.ip.includes(searchTerm)
    const matchesStatus = statusFilter === "all" || endpoint.status === statusFilter
    const matchesType = typeFilter === "all" || endpoint.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const collectArtifact = async () => {
    if (!selectedArtifact || !selectedEndpoint) return

    setIsCollecting(true)
    setCollectionResult(null)

    // Simulate artifact collection
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const artifactName = artifactTypes.find((a) => a.value === selectedArtifact)?.label
    setCollectionResult(`${artifactName} collected successfully from ${selectedEndpoint.hostname}`)
    setIsCollecting(false)
  }

  const getEndpointIcon = (type: string) => {
    switch (type) {
      case "server":
        return <Server className="h-5 w-5" />
      case "laptop":
        return <Laptop className="h-5 w-5" />
      case "mobile":
        return <Smartphone className="h-5 w-5" />
      default:
        return <Monitor className="h-5 w-5" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Inventory</h2>
          <p className="text-muted-foreground">
            Monitor device health, collect forensic artifacts, or start remote sessions
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Devices</p>
                <p className="text-2xl font-bold">{endpointsData.length}</p>
              </div>
              <Monitor className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">
                  {endpointsData.filter((e) => e.status === "active").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold text-red-600">
                  {endpointsData.filter((e) => e.status === "inactive").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Cases</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {endpointsData.reduce((sum, e) => sum + e.openCases, 0)}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Device Management
          </CardTitle>
          <CardDescription>
            Monitor device health and collect forensic artifacts using Velociraptor and MeshCentral
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search devices by name, OS, or IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="server">Servers</SelectItem>
                <SelectItem value="laptop">Laptops</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Endpoints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEndpoints.map((endpoint) => (
              <Card key={endpoint.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getEndpointIcon(endpoint.type)}
                        <h3 className="font-semibold text-sm">{endpoint.hostname}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(endpoint.status)}
                        <Badge
                          className={cn(
                            "text-xs capitalize",
                            statusColors[endpoint.status as keyof typeof statusColors],
                          )}
                        >
                          {endpoint.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>
                        <span className="font-medium">OS:</span> {endpoint.os}
                      </p>
                      <p>
                        <span className="font-medium">IP:</span> {endpoint.ip}
                      </p>
                      <p>
                        <span className="font-medium">Last Seen:</span> {endpoint.lastSeen}
                      </p>
                      <p>
                        <span className="font-medium">Agent:</span> v{endpoint.agentVersion}
                      </p>
                      {endpoint.openCases > 0 && (
                        <p>
                          <span className="font-medium">Open Cases:</span> {endpoint.openCases}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-transparent"
                            onClick={() => setSelectedEndpoint(endpoint)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Collect Artifact
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Collect Forensic Artifact</DialogTitle>
                            <DialogDescription>
                              Select an artifact type to collect from {endpoint.hostname}
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="artifact-type">Artifact Type</Label>
                              <Select value={selectedArtifact} onValueChange={setSelectedArtifact}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select artifact type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {artifactTypes.map((artifact) => (
                                    <SelectItem key={artifact.value} value={artifact.value}>
                                      <div>
                                        <div className="font-medium">{artifact.label}</div>
                                        <div className="text-xs text-muted-foreground">{artifact.description}</div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {selectedArtifact && (
                              <div className="p-3 bg-muted rounded-lg">
                                <p className="text-sm">
                                  <span className="font-medium">Target:</span> {endpoint.hostname} ({endpoint.ip})
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Artifact:</span>{" "}
                                  {artifactTypes.find((a) => a.value === selectedArtifact)?.label}
                                </p>
                              </div>
                            )}

                            <Button
                              onClick={collectArtifact}
                              disabled={!selectedArtifact || isCollecting}
                              className="w-full"
                            >
                              {isCollecting ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Collecting...
                                </>
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  Start Collection
                                </>
                              )}
                            </Button>

                            {collectionResult && (
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-sm text-green-800 dark:text-green-200">{collectionResult}</p>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button variant="outline" size="sm" disabled={endpoint.status === "inactive"}>
                        Remote Session
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
