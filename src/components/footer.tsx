import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col items-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              LuCMS
            </Link>
            . The source code is available on{" "}
            <Link
              href="https://github.com/yourusername/lucms"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/terms"
            className="text-sm font-medium underline underline-offset-4"
          >
            服务条款
          </Link>
          <Link
            href="/privacy"
            className="text-sm font-medium underline underline-offset-4"
          >
            隐私政策
          </Link>
        </div>
      </div>
    </footer>
  )
} 