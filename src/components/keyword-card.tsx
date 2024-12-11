import styles from './keyword-card.module.css'
import { Laptop, Flame, Lightbulb } from "lucide-react"

const keywordData = [
  {
    id: 1,
    title: '常用软件',
    icon: <Laptop className="w-5 h-5" />,
    tags: [
      'Unreal Engine', 'Maya', 'ZBrush', 'Houdini', '3ds Max',
      'Substance Painter', 'Unity', 'Cinema 4D', 'Blender', 'Substance Designer'
    ]
  },
  {
    id: 2,
    title: '热搜关键词',
    icon: <Flame className="w-5 h-5" />,
    tags: [
      '建模', '角色', '手办', '场景', '特效',
      '游戏场景', '次世代', '毛发', '动画', '材质',
      '硬表面', '绑定'
    ]
  },
  {
    id: 3,
    title: '技能关键词',
    icon: <Lightbulb className="w-5 h-5" />,
    tags: [
      '角色制作', '游戏特效', '游戏开发', '渲染合成',
      '动画制作', '电影特效', '虚幻引擎动画制作', '虚幻引擎游戏开发'
    ]
  }
]

export function KeywordCard() {
  return (
    <div className={styles.keywordCard}>
      {keywordData.map(section => (
        <div key={section.id} className={styles.keywordCardCell}>
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <span className={styles.iconWrap}>
                {section.icon}
              </span>
              <span className={styles.title}>{section.title}</span>
            </div>
          </div>
          <div className={styles.keywordTagsWrap}>
            {section.tags.map(tag => (
              <span key={tag} className={styles.keywordTag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 