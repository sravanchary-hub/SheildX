"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BrickWall as Firewall, Shield, Search, Filter, TrendingUp, Globe, MapPin, Eye, Loader2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

// Demo data for firewall stats
const firewallStats = {
  blockedConnections24h: 15847,
  allowedTraffic24h: 892341,
  topSourceIPs: [
    { ip: "203.0.113.45", count: 2341, country: "Unknown" },
    { ip: "198.51.100.25", count: 1876, country: "Russia" },
    { ip: "192.0.2.100", count: 1234, country: "China" },
    { ip: "10.0.0.50", count: 987, country: "Internal" },
  ],
  topDestinations: [
    { ip: "192.168.1.10", port: 80, count: 5432 },
    { ip: "192.168.1.20", port: 443, count: 4321 },
    { ip: "192.168.1.30", port: 22, count: 2109 },
    { ip: "192.168.1.40", port: 3389, count: 1876 },
  ],
}

// Demo data for traffic chart
const trafficData = [
  { time: "00:00", blocked: 1200, allowed: 8500 },
  { time: "04:00", blocked: 800, allowed: 6200 },
  { time: "08:00", blocked: 2100, allowed: 12400 },
  { time: "12:00", blocked: 1800, allowed: 15600 },
  { time: "16:00", blocked: 2400, allowed: 18200 },
  { time: "20:00", blocked: 1900, allowed: 14800 },
]

// Demo data for IDS events
const idsEventsData = [
  {
    id: "IDS-001",
    timestamp: "2024-01-15 14:35:22",
    sourceIP: "203.0.113.45",
    destIP: "192.168.1.10",
    signature: "ET TROJAN Possible Malware Download",
    severity: "high",
    protocol: "TCP",
    port: 80,
  },
  {
    id: "IDS-002",
    timestamp: "2024-01-15 14:32:18",
    sourceIP: "198.51.100.25",
    destIP: "192.168.1.20",
    signature: "ET SCAN Suspicious inbound to mySQL port 3306",
    severity: "medium",
    protocol: "TCP",
    port: 3306,
  },
  {
    id: "IDS-003",
    timestamp: "2024-01-15 14:28:45",
    sourceIP: "192.0.2.100",
    destIP: "192.168.1.30",
    signature: "ET POLICY SSH connection",
    severity: "low",
    protocol: "TCP",
    port: 22,
  },
  {
    id: "IDS-004",
    timestamp: "2024-01-15 14:25:33",
    sourceIP: "10.0.0.50",
    destIP: "192.168.1.40",
    signature: "ET WEB_SERVER Possible SQL Injection attempt",
    severity: "critical",
    protocol: "TCP",
    port: 443,
  },
  {
    id: "IDS-005",
    timestamp: "2024-01-15 14:22:11",
    sourceIP: "172.16.0.25",
    destIP: "192.168.1.50",
    signature: "ET SCAN Nmap TCP",
    severity: "medium",
    protocol: "TCP",
    port: 80,
  },
]

const severityColors = {
  info: "bg-[var(--severity-info)] text-white",
  low: "bg-[var(--severity-low)] text-white",
  medium: "bg-[var(--severity-medium)] text-black",
  high: "bg-[var(--severity-high)] text-white",
  critical: "bg-[var(--severity-critical)] text-white",
}

export function FirewallDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedIP, setSelectedIP] = useState<string | null>(null)
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [lookupResult, setLookupResult] = useState<any>(null)

  const filteredEvents = idsEventsData.filter((event) => {
    const matchesSearch =
      event.sourceIP.includes(searchTerm) ||
      event.destIP.includes(searchTerm) ||
      event.signature.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === "all" || event.severity === severityFilter
    return matchesSearch && matchesSeverity
  })

  const performIPLookup = async (ip: string) => {
    setIsLookingUp(true)
    setLookupResult(null)
    setSelectedIP(ip)

    // Simulate WHOIS + GeoIP lookup
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Demo lookup result
    const demoResult = {
      ip: ip,
      country: ip.startsWith("192.168")
        ? "Internal Network"
        : ["Russia", "China", "Unknown", "United States"][Math.floor(Math.random() * 4)],
      city: ip.startsWith("192.168")
        ? "Local"
        : ["Moscow", "Beijing", "Unknown", "New York"][Math.floor(Math.random() * 4)],
      isp: ip.startsWith("192.168")
        ? "Internal"
        : ["Evil Corp ISP", "Suspicious Networks", "Unknown ISP", "Legitimate ISP"][Math.floor(Math.random() * 4)],
      threat: Math.random() > 0.5 ? "Known malicious IP" : "Clean",
      asn: `AS${Math.floor(Math.random() * 65535)}`,
    }

    setLookupResult(demoResult)
    setIsLookingUp(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Firewall & IDS Monitoring</h2>
          <p className="text-muted-foreground">Firewall insights from OPNsense and Suricata in real time</p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Firewall Dashboard</TabsTrigger>
          <TabsTrigger value="ids">IDS Events</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Blocked Connections (24h)</p>
                    <p className="text-2xl font-bold text-red-600">
                      {firewallStats.blockedConnections24h.toLocaleString()}
                    </p>
                  </div>
                  <Shield className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Allowed Traffic (24h)</p>
                    <p className="text-2xl font-bold text-green-600">
                      {firewallStats.allowedTraffic24h.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Top Threat Sources</p>
                    <p className="text-2xl font-bold">{firewallStats.topSourceIPs.length}</p>
                  </div>
                  <Globe className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Rules</p>
                    <p className="text-2xl font-bold">247</p>
                  </div>
                  <Firewall className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Traffic Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview (24h)</CardTitle>
              <CardDescription>Blocked vs Allowed connections over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="blocked" stroke="#dc2626" strokeWidth={2} name="Blocked" />
                    <Line type="monotone" dataKey="allowed" stroke="#16a34a" strokeWidth={2} name="Allowed" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Sources and Destinations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Source IPs</CardTitle>
                <CardDescription>Most active source addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {firewallStats.topSourceIPs.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-mono text-sm">{source.ip}</p>
                          <p className="text-xs text-muted-foreground">{source.country}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{source.count.toLocaleString()}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => performIPLookup(source.ip)}
                          className="text-xs"
                        >
                          Lookup
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Destinations</CardTitle>
                <CardDescription>Most targeted internal addresses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {firewallStats.topDestinations.map((dest, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-mono text-sm">
                          {dest.ip}:{dest.port}
                        </p>
                        <p className="text-xs text-muted-foreground">Port {dest.port}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{dest.count.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">connections</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ids" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Intrusion Detection Events
              </CardTitle>
              <CardDescription>Real-time IDS events from Suricata</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search IDS events..."
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
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Source IP</TableHead>
                      <TableHead>Destination IP</TableHead>
                      <TableHead>Signature</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Protocol</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-mono text-sm">{event.timestamp}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            className="font-mono text-sm p-0 h-auto"
                            onClick={() => performIPLookup(event.sourceIP)}
                          >
                            {event.sourceIP}
                          </Button>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{event.destIP}</TableCell>
                        <TableCell className="max-w-md truncate">{event.signature}</TableCell>
                        <TableCell>
                          <Badge
                            className={cn("text-xs", severityColors[event.severity as keyof typeof severityColors])}
                          >
                            {event.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {event.protocol}:{event.port}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* IP Lookup Dialog */}
      <Dialog open={!!selectedIP} onOpenChange={() => setSelectedIP(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>IP Address Lookup</DialogTitle>
            <DialogDescription>WHOIS and GeoIP information for {selectedIP}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isLookingUp ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Looking up IP information...</span>
              </div>
            ) : lookupResult ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">IP Address</label>
                    <p className="font-mono text-sm">{lookupResult.ip}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <p className="text-sm">{lookupResult.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <p className="text-sm">{lookupResult.city}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">ISP</label>
                    <p className="text-sm">{lookupResult.isp}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">ASN</label>
                    <p className="text-sm">{lookupResult.asn}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Threat Status</label>
                    <Badge
                      className={cn(
                        "text-xs",
                        lookupResult.threat.includes("malicious") ? "bg-red-500 text-white" : "bg-green-500 text-white",
                      )}
                    >
                      {lookupResult.threat}
                    </Badge>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
