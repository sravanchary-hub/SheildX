"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Settings,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Key,
  Globe,
  Shield,
  Activity,
  Mail,
  Database,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Demo data for users
const usersData = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Senior Analyst",
    status: "active",
    lastLogin: "2024-01-15 14:30:22",
    created: "2023-06-15",
  },
  {
    id: "USR-002",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    role: "SOC Manager",
    status: "active",
    lastLogin: "2024-01-15 13:45:18",
    created: "2023-03-10",
  },
  {
    id: "USR-003",
    name: "Bob Smith",
    email: "bob.smith@company.com",
    role: "Junior Analyst",
    status: "active",
    lastLogin: "2024-01-15 12:20:45",
    created: "2023-09-22",
  },
  {
    id: "USR-004",
    name: "Carol Davis",
    email: "carol.davis@company.com",
    role: "Incident Responder",
    status: "inactive",
    lastLogin: "2024-01-10 16:30:12",
    created: "2023-01-08",
  },
]

// Demo data for integrations
const integrationsData = [
  {
    id: "wazuh",
    name: "Wazuh",
    description: "Security monitoring and alerting platform",
    status: "connected",
    apiUrl: "https://wazuh.company.com:55000",
    apiKey: "wazuh_api_key_***",
    lastSync: "2024-01-15 14:35:00",
  },
  {
    id: "thehive",
    name: "TheHive",
    description: "Security incident response platform",
    status: "connected",
    apiUrl: "https://thehive.company.com:9000",
    apiKey: "thehive_api_key_***",
    lastSync: "2024-01-15 14:32:00",
  },
  {
    id: "velociraptor",
    name: "Velociraptor",
    description: "Endpoint visibility and digital forensics",
    status: "connected",
    apiUrl: "https://velociraptor.company.com:8000",
    apiKey: "velociraptor_api_key_***",
    lastSync: "2024-01-15 14:28:00",
  },
  {
    id: "opnsense",
    name: "OPNsense",
    description: "Firewall and network security",
    status: "connected",
    apiUrl: "https://firewall.company.com",
    apiKey: "opnsense_api_key_***",
    lastSync: "2024-01-15 14:30:00",
  },
  {
    id: "zabbix",
    name: "Zabbix",
    description: "Infrastructure monitoring and alerting",
    status: "error",
    apiUrl: "https://zabbix.company.com",
    apiKey: "zabbix_api_key_***",
    lastSync: "2024-01-15 12:15:00",
  },
  {
    id: "phishing",
    name: "Phishing Analysis",
    description: "Email security and phishing detection",
    status: "disconnected",
    apiUrl: "",
    apiKey: "",
    lastSync: "Never",
  },
  {
    id: "device-enroll",
    name: "Device Enrollment",
    description: "Agent deployment and endpoint registration",
    status: "connected",
    apiUrl: "https://enrollment.company.com",
    apiKey: "device_enroll_api_key_***",
    lastSync: "2024-01-15 14:25:00",
  },
]

const statusColors = {
  active: "bg-green-500 text-white",
  inactive: "bg-gray-500 text-white",
  connected: "bg-green-500 text-white",
  disconnected: "bg-gray-500 text-white",
  error: "bg-red-500 text-white",
}

const roleOptions = [
  { value: "admin", label: "Administrator" },
  { value: "manager", label: "SOC Manager" },
  { value: "senior", label: "Senior Analyst" },
  { value: "analyst", label: "Security Analyst" },
  { value: "junior", label: "Junior Analyst" },
  { value: "responder", label: "Incident Responder" },
]

export function SettingsDashboard() {
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRole, setNewUserRole] = useState("")
  const [isInviting, setIsInviting] = useState(false)
  const [inviteSuccess, setInviteSuccess] = useState(false)
  const [editingIntegration, setEditingIntegration] = useState<string | null>(null)
  const [deviceName, setDeviceName] = useState("")
  const [deviceOS, setDeviceOS] = useState("")
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [enrollSuccess, setEnrollSuccess] = useState(false)

  const inviteUser = async () => {
    if (!newUserEmail || !newUserRole) return

    setIsInviting(true)
    setInviteSuccess(false)

    // Simulate user invitation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setInviteSuccess(true)
    setIsInviting(false)
    setNewUserEmail("")
    setNewUserRole("")

    // Reset success message after 3 seconds
    setTimeout(() => setInviteSuccess(false), 3000)
  }

  const enrollDevice = async () => {
    if (!deviceName || !deviceOS) return

    setIsEnrolling(true)
    setEnrollSuccess(false)

    // Simulate device enrollment
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setEnrollSuccess(true)
    setIsEnrolling(false)
    setDeviceName("")
    setDeviceOS("")

    // Reset success message after 3 seconds
    setTimeout(() => setEnrollSuccess(false), 3000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "inactive":
      case "disconnected":
        return <XCircle className="h-4 w-4 text-gray-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getIntegrationIcon = (id: string) => {
    switch (id) {
      case "wazuh":
        return <Shield className="h-5 w-5" />
      case "thehive":
        return <Activity className="h-5 w-5" />
      case "velociraptor":
        return <Settings className="h-5 w-5" />
      case "opnsense":
        return <Globe className="h-5 w-5" />
      case "zabbix":
        return <Activity className="h-5 w-5" />
      case "phishing":
        return <Mail className="h-5 w-5" />
      case "device-enroll":
        return <Database className="h-5 w-5" />
      default:
        return <Database className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Settings & User Management</h2>
          <p className="text-muted-foreground">Configure integrations, manage users, and system settings</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="integrations">Integration Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>Manage SOC team members and their access permissions</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Invite User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite New User</DialogTitle>
                      <DialogDescription>Send an invitation to join the SOC team</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="user@company.com"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={newUserRole} onValueChange={setNewUserRole}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions.map((role) => (
                              <SelectItem key={role.value} value={role.value}>
                                {role.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        onClick={inviteUser}
                        disabled={!newUserEmail || !newUserRole || isInviting}
                        className="w-full"
                      >
                        {isInviting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Sending Invitation...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-2" />
                            Send Invitation
                          </>
                        )}
                      </Button>

                      {inviteSuccess && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <p className="text-sm text-green-800 dark:text-green-200">
                            Invitation sent successfully to {newUserEmail}
                          </p>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersData.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(user.status)}
                            <Badge className={cn("text-xs", statusColors[user.status as keyof typeof statusColors])}>
                              {user.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Integration Settings
              </CardTitle>
              <CardDescription>Configure connections to security tools and platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {integrationsData.map((integration) => (
                  <AccordionItem key={integration.id} value={integration.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center gap-3">
                          {getIntegrationIcon(integration.id)}
                          <div className="text-left">
                            <div className="font-medium">{integration.name}</div>
                            <div className="text-sm text-muted-foreground">{integration.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-auto mr-4">
                          {getStatusIcon(integration.status)}
                          <Badge
                            className={cn("text-xs", statusColors[integration.status as keyof typeof statusColors])}
                          >
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        {integration.id === "device-enroll" ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="device-name">Device Name</Label>
                                <Input
                                  id="device-name"
                                  value={deviceName}
                                  onChange={(e) => setDeviceName(e.target.value)}
                                  placeholder="Enter device name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="device-os">Operating System</Label>
                                <Select value={deviceOS} onValueChange={setDeviceOS}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select OS" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="windows">Windows</SelectItem>
                                    <SelectItem value="linux">Linux</SelectItem>
                                    <SelectItem value="macos">macOS</SelectItem>
                                    <SelectItem value="android">Android</SelectItem>
                                    <SelectItem value="ios">iOS</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <Button
                              onClick={enrollDevice}
                              disabled={!deviceName || !deviceOS || isEnrolling}
                              className="w-full"
                            >
                              {isEnrolling ? (
                                <>
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  Enrolling Device...
                                </>
                              ) : (
                                <>
                                  <Plus className="h-4 w-4 mr-2" />
                                  Enroll Device
                                </>
                              )}
                            </Button>

                            {enrollSuccess && (
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                <p className="text-sm text-green-800 dark:text-green-200">
                                  Device "{deviceName}" enrolled successfully for {deviceOS}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`${integration.id}-url`}>API URL</Label>
                              <Input
                                id={`${integration.id}-url`}
                                value={integration.apiUrl}
                                placeholder="https://api.example.com"
                                readOnly={editingIntegration !== integration.id}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`${integration.id}-key`}>API Key</Label>
                              <div className="flex gap-2">
                                <Input
                                  id={`${integration.id}-key`}
                                  type="password"
                                  value={integration.apiKey}
                                  placeholder="Enter API key"
                                  readOnly={editingIntegration !== integration.id}
                                />
                                <Button variant="outline" size="sm">
                                  <Key className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch id={`${integration.id}-enabled`} checked={integration.status === "connected"} />
                            <Label htmlFor={`${integration.id}-enabled`}>Enable Integration</Label>
                          </div>
                          <div className="text-sm text-muted-foreground">Last sync: {integration.lastSync}</div>
                        </div>

                        {integration.id !== "device-enroll" && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setEditingIntegration(editingIntegration === integration.id ? null : integration.id)
                              }
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              {editingIntegration === integration.id ? "Cancel" : "Edit"}
                            </Button>
                            <Button variant="outline" size="sm">
                              Test Connection
                            </Button>
                            {editingIntegration === integration.id && (
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
