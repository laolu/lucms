import React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div className="container min-h-screen mx-auto flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            {children}
          </div>
        </div>
        <footer className="py-6 text-sm text-center text-gray-500">
          <p>© {new Date().getFullYear()} LuCMS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
} 