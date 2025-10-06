"use client"

import { useState } from "react"
import { SOCSidebar } from "@/components/soc-sidebar"
import { SOCHeader } from "@/components/soc-header"
import { AlertsDashboard } from "@/components/alerts-dashboard"
import { EndpointsDashboard } from "@/components/endpoints-dashboard"
import { FirewallDashboard } from "@/components/firewall-dashboard"
import { MonitoringDashboard } from "@/components/monitoring-dashboard"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { SettingsDashboard } from "@/components/settings-dashboard"

export default function SOCDashboard() {
  const [activeSection, setActiveSection] = useState("alerts")

  const renderSection = () => {
    switch (activeSection) {
      case "alerts":
        return <AlertsDashboard />
      case "cases":
        return <AlertsDashboard />
      case "endpoints":
        return <EndpointsDashboard />
      case "firewall":
        return <FirewallDashboard />
      case "monitoring":
        return <MonitoringDashboard />
      case "analytics":
        return <AnalyticsDashboard />
      case "settings":
        return <SettingsDashboard />
      default:
        return (
          <div className="bg-card rounded-lg p-6 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Dashboard
            </h2>
            <p className="text-muted-foreground">
              {activeSection === "phishing" && "Analyze and respond to phishing reports and email security threats."}
            </p>
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <SOCSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SOCHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{renderSection()}</div>
        </main>
      </div>
    </div>
  )
}
