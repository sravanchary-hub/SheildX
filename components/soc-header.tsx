"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Search, User, Settings, Moon, Sun, LogOut } from "lucide-react"
import { useTheme } from "next-themes"

const recentAlerts = [
  { id: 1, message: "Suspicious login attempt detected", severity: "high", time: "2 min ago" },
  { id: 2, message: "Malware signature updated", severity: "info", time: "5 min ago" },
  { id: 3, message: "Firewall rule violation", severity: "medium", time: "8 min ago" },
  { id: 4, message: "Endpoint disconnected", severity: "low", time: "12 min ago" },
  { id: 5, message: "Critical vulnerability detected", severity: "critical", time: "15 min ago" },
]

const severityColors = {
  info: "bg-[var(--severity-info)] text-white",
  low: "bg-[var(--severity-low)] text-white",
  medium: "bg-[var(--severity-medium)] text-black",
  high: "bg-[var(--severity-high)] text-white",
  critical: "bg-[var(--severity-critical)] text-white",
}

export function SOCHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts, observables, cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center bg-[var(--severity-critical)]"
              >
                5
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {recentAlerts.map((alert) => (
              <DropdownMenuItem key={alert.id} className="flex items-start gap-2 p-3">
                <Badge
                  variant="secondary"
                  className={cn("text-xs px-1.5 py-0.5", severityColors[alert.severity as keyof typeof severityColors])}
                >
                  {alert.severity}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Analyst: John Doe</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
