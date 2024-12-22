import {
  Sun,
  Moon,
  Upload,
  X,
  Loader2,
  GripVertical,
  type LucideIcon,
} from "lucide-react"
import { WechatIcon } from "./wechat-icon"
import { QqIcon } from "./qq-icon"

export type Icon = LucideIcon

export const Icons = {
  sun: Sun,
  moon: Moon,
  upload: Upload,
  close: X,
  spinner: Loader2,
  move: GripVertical,
  wechat: WechatIcon,
  qq: QqIcon,
} as const 