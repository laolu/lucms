import {
  Sun,
  Moon,
  Upload,
  X,
  Loader2,
  type LucideIcon,
} from "lucide-react"
import { QqIcon } from "./qq-icon"
import { WechatIcon } from "./wechat-icon"

export type Icon = LucideIcon

export const Icons = {
  sun: Sun,
  moon: Moon,
  upload: Upload,
  close: X,
  spinner: Loader2,
  wechat: WechatIcon,
  qq: QqIcon,
} as const 