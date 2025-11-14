import Link from "next/link"
import { Shield } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">Admin Dashboard</span>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="/admin"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Overview
              </Link>
              <Link
                href="/admin/users"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Users
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Back to App
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
