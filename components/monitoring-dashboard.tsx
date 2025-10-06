"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, HardDrive, MemoryStick, Wifi, Server, AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { cn } from "@/lib/utils"

// Demo data for system metrics
const systemMetrics = [
  {
    id: "srv-web-01",
    name: "Web Server 01",
    type: "Web Server",
    status: "healthy",
    cpu: 45,
    memory: 67,
    disk: 34,
    network: 23,
    uptime: "15d 4h 23m",
    lastUpdate: "2024-01-15 14:35:22",
  },
  {
    id: "srv-db-01",
    name: "Database Server 01",
    type: "Database",
    status: "warning",
    cpu: 78,
    memory: 89,
    disk: 56,
    network: 45,
    uptime: "8d 12h 45m",
    lastUpdate: "2024-01-15 14:35:18",
  },
  {
    id: "srv-app-01",
    name: "Application Server 01",
    type: "Application",
    status: "healthy",
    cpu: 32,
    memory: 54,
    disk: 23,
    network: 67,
    uptime: "22d 8h 12m",
    lastUpdate: "2024-01-15 14:35:25",
  },
  {
    id: "srv-fw-01",
    name: "Firewall 01",
    type: "Security",
    status: "critical",
    cpu: 92,
    memory: 95,
    disk: 78,
    network: 89,
    uptime: "2d 6h 34m",
    lastUpdate: "2024-01-15 14:35:12",
  },
  {
    id: "srv-backup-01",
    name: "Backup Server 01",
    type: "Storage",
    status: "healthy",
    cpu: 12,
    memory: 34,
    disk: 89,
    network: 15,
    uptime: "45d 12h 8m",
    lastUpdate: "2024-01-15 14:35:30",
  },
]

// Historical data for charts
const cpuTrend = [
  { time: "00:00", value: 45 },
  { time: "04:00", value: 52 },
  { time: "08:00", value: 67 },
  { time: "12:00", value: 78 },
  { time: "16:00", value: 65 },
  { time: "20:00", value: 58 },
]

const memoryTrend = [
  { time: "00:00", value: 62 },
  { time: "04:00", value: 58 },
  { time: "08:00", value: 71 },
  { time: "12:00", value: 85 },
  { time: "16:00", value: 79 },
  { time: "20:00", value: 73 },
]

const networkTrend = [
  { time: "00:00", in: 234, out: 189 },
  { time: "04:00", in: 189, out: 156 },
  { time: "08:00", in: 456, out: 378 },
  { time: "12:00", in: 567, out: 445 },
  { time: "16:00", in: 445, out: 389 },
  { time: "20:00", in: 378, out: 334 },
]

const diskUsage = [
  { server: "Web-01", used: 34, free: 66 },
  { server: "DB-01", used: 56, free: 44 },
  { server: "App-01", used: 23, free: 77 },
  { server: "FW-01", used: 78, free: 22 },
  { server: "Backup-01", used: 89, free: 11 },
]

const statusColors = {
  healthy: "bg-green-500 text-white",
  warning: "bg-yellow-500 text-black",
  critical: "bg-red-500 text-white",
  offline: "bg-gray-500 text-white",
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "healthy":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    case "critical":
      return <XCircle className="h-4 w-4 text-red-500" />
    default:
      return <XCircle className="h-4 w-4 text-gray-500" />
  }
}

const getMetricColor = (value: number) => {
  if (value >= 90) return "text-red-500"
  if (value >= 75) return "text-yellow-500"
  return "text-green-500"
}

const getProgressColor = (value: number) => {
  if (value >= 90) return "bg-red-500"
  if (value >= 75) return "bg-yellow-500"
  return "bg-green-500"
}

export function MonitoringDashboard() {
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLastRefresh(new Date())
    setIsRefreshing(false)
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Infrastructure Monitoring</h2>
          <p className="text-muted-foreground">Real-time system health and performance metrics from Zabbix</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">Last updated: {lastRefresh.toLocaleTimeString()}</div>
          <Button onClick={refreshData} disabled={isRefreshing} variant="outline" size="sm">
            <RefreshCw className={cn("h-4 w-4 mr-2", isRefreshing && "animate-spin")} />
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Servers</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-green-600">4 healthy, 1 warning</p>
              </div>
              <Server className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg CPU Usage</p>
                <p className="text-2xl font-bold">58%</p>
                <p className="text-xs text-green-600">↓ 5% from last hour</p>
              </div>
              <Cpu className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Memory Usage</p>
                <p className="text-2xl font-bold">68%</p>
                <p className="text-xs text-yellow-600">↑ 3% from last hour</p>
              </div>
              <MemoryStick className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Network Traffic</p>
                <p className="text-2xl font-bold">445 MB/s</p>
                <p className="text-xs text-blue-600">Peak: 567 MB/s</p>
              </div>
              <Wifi className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="servers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="servers">Server Status</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="servers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {systemMetrics.map((server) => (
              <Card key={server.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{server.name}</CardTitle>
                      <CardDescription>{server.type}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(server.status)}
                      <Badge className={cn("text-xs", statusColors[server.status as keyof typeof statusColors])}>
                        {server.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* CPU Usage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span className="text-sm font-medium">CPU</span>
                      </div>
                      <span className={cn("text-sm font-bold", getMetricColor(server.cpu))}>{server.cpu}%</span>
                    </div>
                    <Progress value={server.cpu} className="h-2" />
                  </div>

                  {/* Memory Usage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="h-4 w-4" />
                        <span className="text-sm font-medium">Memory</span>
                      </div>
                      <span className={cn("text-sm font-bold", getMetricColor(server.memory))}>{server.memory}%</span>
                    </div>
                    <Progress value={server.memory} className="h-2" />
                  </div>

                  {/* Disk Usage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" />
                        <span className="text-sm font-medium">Disk</span>
                      </div>
                      <span className={cn("text-sm font-bold", getMetricColor(server.disk))}>{server.disk}%</span>
                    </div>
                    <Progress value={server.disk} className="h-2" />
                  </div>

                  {/* Network Usage */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        <span className="text-sm font-medium">Network</span>
                      </div>
                      <span className={cn("text-sm font-bold", getMetricColor(server.network))}>{server.network}%</span>
                    </div>
                    <Progress value={server.network} className="h-2" />
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Uptime: {server.uptime}</span>
                      <span>{server.lastUpdate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* CPU Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  CPU Usage Trend
                </CardTitle>
                <CardDescription>Average CPU utilization over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cpuTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--chart-1)"
                        fill="var(--chart-1)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Memory Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MemoryStick className="h-5 w-5" />
                  Memory Usage Trend
                </CardTitle>
                <CardDescription>Average memory utilization over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={memoryTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="var(--chart-2)"
                        fill="var(--chart-2)"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Network Traffic */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Network Traffic
                </CardTitle>
                <CardDescription>Inbound and outbound network traffic (MB/s)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={networkTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="in" stroke="var(--chart-3)" strokeWidth={2} name="Inbound" />
                      <Line type="monotone" dataKey="out" stroke="var(--chart-4)" strokeWidth={2} name="Outbound" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Disk Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5" />
                  Disk Usage by Server
                </CardTitle>
                <CardDescription>Current disk space utilization across all servers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={diskUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="server" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="used" stackId="a" fill="var(--chart-1)" name="Used %" />
                      <Bar dataKey="free" stackId="a" fill="var(--chart-2)" name="Free %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Active System Alerts
              </CardTitle>
              <CardDescription>Current infrastructure alerts and warnings from Zabbix</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">High CPU usage on Firewall 01</span>
                      <Badge className="bg-red-500 text-white text-xs">CRITICAL</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">CPU usage has exceeded 90% for the last 15 minutes</p>
                    <p className="text-xs text-muted-foreground mt-1">Triggered: 2024-01-15 14:20:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">High memory usage on Database Server 01</span>
                      <Badge className="bg-yellow-500 text-black text-xs">WARNING</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Memory usage has exceeded 85% threshold</p>
                    <p className="text-xs text-muted-foreground mt-1">Triggered: 2024-01-15 13:45:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Disk space warning on Backup Server 01</span>
                      <Badge className="bg-yellow-500 text-black text-xs">WARNING</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Disk usage has reached 89% capacity</p>
                    <p className="text-xs text-muted-foreground mt-1">Triggered: 2024-01-15 12:30:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Backup completed successfully</span>
                      <Badge className="bg-blue-500 text-white text-xs">INFO</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Daily backup process completed without errors</p>
                    <p className="text-xs text-muted-foreground mt-1">Completed: 2024-01-15 02:00:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
