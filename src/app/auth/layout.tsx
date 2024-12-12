import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen auth-gradient">
      <div className="w-full max-w-[400px] px-8">
        <Card className="p-8 backdrop-blur-[2px] bg-card/60 border-border/40">
          {children}
        </Card>
        <footer className="mt-8 text-sm text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} LuCMS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
} 