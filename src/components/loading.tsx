import { Icons } from "@/components/icons"

export function LoadingPage() {
  return (
    <div className="flex h-[50vh] items-center justify-center">
      <Icons.spinner className="h-8 w-8 animate-spin" />
    </div>
  )
} 