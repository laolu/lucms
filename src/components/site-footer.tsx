import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} 版权所有
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
            关于我们
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            用户协议
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            隐私政策
          </Link>
        </div>
      </div>
    </footer>
  );
} 