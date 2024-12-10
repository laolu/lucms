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
    <div className="min-h-screen flex flex-col items-center justify-center auth-gradient">
      <div className="w-full max-w-[400px] px-8">
        <div className="mb-8 flex flex-col items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold">LuCMS</span>
          </Link>
        </div>
        <Card className="p-8 backdrop-blur-[2px] bg-card/60 border-border/40">
          {children}
        </Card>
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LuCMS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
} 