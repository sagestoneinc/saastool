"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  Workflow, 
  Globe, 
  FileText, 
  TrendingUp, 
  Calendar, 
  Settings 
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Contacts", href: "/dashboard/contacts", icon: Users },
  { name: "Campaigns", href: "/dashboard/campaigns", icon: Mail },
  { name: "Automations", href: "/dashboard/automations", icon: Workflow },
  { name: "Funnels", href: "/dashboard/funnels", icon: Globe },
  { name: "Forms", href: "/dashboard/forms", icon: FileText },
  { name: "Pipelines", href: "/dashboard/pipelines", icon: TrendingUp },
  { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="flex items-center h-16 px-6 border-b border-gray-800">
        <Link href="/dashboard" className="text-xl font-bold">
          Sagestone
        </Link>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
