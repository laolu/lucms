import React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} LuCMS. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="flex items-center space-x-4 text-sm">
            <Link
              href="/terms"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              服务条款
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              隐私政策
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              联系我们
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
} 