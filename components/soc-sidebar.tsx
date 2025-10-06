"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  AlertTriangle,
  Briefcase,
  Monitor,
  BrickWall as Firewall,
  Activity,
  Mail,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navigationItems = [
  { id: "incidents", label: "Incidents", icon: Briefcase, badge: 8, severity: "medium" },
  { id: "alerts", label: "Alerts", icon: AlertTriangle, badge: 23, severity: "critical" },
  { id: "dlp", label: "DLP", icon: Activity, badge: 12, severity: "info" },
  { id: "active-response", label: "Active Response", icon: Mail, badge: 3, severity: "medium" },
  { id: "firewall", label: "Firewall", icon: Firewall, badge: 45, severity: "high" },
  { id: "inventory", label: "Inventory", icon: Monitor, badge: 156, severity: "low" },
  { id: "settings", label: "Settings", icon: Settings },
]

const severityColors = {
  info: "bg-[var(--severity-info)] text-white",
  low: "bg-[var(--severity-low)] text-white",
  medium: "bg-[var(--severity-medium)] text-black",
  high: "bg-[var(--severity-high)] text-white",
  critical: "bg-[var(--severity-critical)] text-white",
}

export function SOCSidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-sidebar-accent" />
            <span className="font-semibold text-sidebar-foreground">SOC Dashboard</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-10",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                collapsed && "justify-center px-2",
              )}
              onClick={() => onSectionChange(item.id)}
              title={collapsed ? item.label : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs px-1.5 py-0.5 min-w-[20px] justify-center",
                        item.severity && severityColors[item.severity as keyof typeof severityColors],
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && <div className="text-xs text-sidebar-foreground/60">SOC Analyst: John Doe</div>}
      </div>
    </div>
  )
}
