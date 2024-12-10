import * as React from "react"
import { Laptop, Flame, Lightbulb } from "lucide-react"

interface KeywordTagProps {
  children: React.ReactNode
}

const KeywordTag = ({ children }: KeywordTagProps) => (
  <span className="cg-keyword-tag">
    {children}
  </span>
)

const keywordData = {
  software: {
    icon: <Laptop className="w-7 h-7" />,
    title: "常用软件",
    tags: [
      "Unreal engine", "Maya", "Zbrush", "houdini", "3ds max",
      "substance painter", "Unity3d", "Cinema4D", "Blender", "substance"
    ]
  },
  hotSearch: {
    icon: <Flame className="w-7 h-7" />,
    title: "热搜关键词",
    tags: [
      "建模", "角色", "手办", "场景", "特效", "游戏场景",
      "次世代", "毛发", "动画", "材质", "硬表面", "绑定"
    ]
  },
  skills: {
    icon: <Lightbulb className="w-7 h-7" />,
    title: "技能关键词",
    tags: [
      "角色制作", "游戏特效", "游戏开发", "渲染合成",
      "动画制作", "电影特效", "虚幻引擎动画制作", "虚幻引擎游戏开发"
    ]
  }
}

export function KeywordCard() {
  return (
    <div className="keyword-card">
      {Object.entries(keywordData).map(([key, section]) => (
        <div key={key} className="keyword-card-cell">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-muted-foreground">{section.icon}</span>
            <span className="text-xl font-medium">{section.title}</span>
          </div>
          <div className="keyword-tags-wrap">
            {section.tags.map((tag) => (
              <KeywordTag key={tag}>{tag}</KeywordTag>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 