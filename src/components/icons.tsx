import {
  Loader2,
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  spinner: Loader2,
  wechat: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 1 6 12c0-1.38 1.12-2.5 2.5-2.5.53 0 1.01.16 1.42.44l-.02-.19c0-2.9 2.35-5.25 5.25-5.25 2.9 0 5.25 2.35 5.25 5.25a5.25 5.25 0 0 1-8.18 4.37l.02.19c0 1.38-1.12 2.5-2.5 2.5h-.24z" />
      <path d="M10.5 18.5A2.5 2.5 0 0 1 8 16c0-1.38 1.12-2.5 2.5-2.5.53 0 1.01.16 1.42.44l-.02-.19a5.25 5.25 0 0 1 8.18-4.37l-.02-.19c0-1.38 1.12-2.5 2.5-2.5.53 0 1.01.16 1.42.44" />
    </svg>
  ),
  qq: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 6c-2.21 0-4 1.79-4 4v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-2c0-2.21-1.79-4-4-4z" />
      <path d="M15 14H9c-.6 0-1 .4-1 1v2c0 2.21 1.79 4 4 4s4-1.79 4-4v-2c0-.6-.4-1-1-1z" />
    </svg>
  ),
} 