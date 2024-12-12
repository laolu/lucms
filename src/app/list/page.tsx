"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Clock, Flame, Star, X } from "lucide-react"
import styles from "./list.module.css"
import { HomeCarousel } from "@/components/carousel"

const banners = [
  '/demo/banner1.png',
  '/demo/banner2.png',
  '/demo/banner3.png',
]

const industries = [
  { id: 'game', name: '游戏美术', active: true },
  { id: 'animation', name: '电影动画' },
  { id: 'engine', name: '游戏引擎' },
  { id: 'concept', name: '概念设计' },
  { id: 'video', name: '影视后期' },
  { id: 'architecture', name: '环艺建筑' },
  { id: 'graphic', name: '平面设计' },
  { id: 'photo', name: '摄影摄像' },
]

const skills = [
  { id: 'modeling', name: '建模雕刻' },
  { id: 'texturing', name: '贴图绘制' },
  { id: 'material', name: '材质纹理' },
  { id: 'vfx', name: '游戏特效' },
  { id: 'animation', name: '游戏动画' },
  { id: 'scene', name: '游戏场景' },
  { id: 'character', name: '游戏角色' },
  { id: 'lighting', name: '布光设置' },
]

const software = [
  { id: 'ue', name: 'Unreal Engine', icon: '/demo/icons/ue.png' },
  { id: 'maya', name: 'Maya', icon: '/demo/icons/maya.png' },
  { id: 'zbrush', name: 'Zbrush', icon: '/demo/icons/zbrush.png' },
  { id: 'unity', name: 'Unity3D', icon: '/demo/icons/unity.png' },
  { id: 'sp', name: 'SP', icon: '/demo/icons/sp.png' },
  { id: 'sd', name: 'SD', icon: '/demo/icons/sd.png' },
]

const levels = [
  { id: 'beginner', name: '入门' },
  { id: 'intermediate', name: '中级' },
  { id: 'advanced', name: '高级' },
  { id: 'expert', name: '专家' },
]

const filters = [
  { id: 'free', name: '免费' },
  { id: 'paid', name: '付费' },
  { id: 'series', name: '系列' },
  { id: 'single', name: '单课' },
]

const sortOptions = [
  { id: 'latest', name: '最新', icon: Clock },
  { id: 'popular', name: '最热', icon: Flame },
  { id: 'rating', name: '评分', icon: Star },
]

const demoItems = [
  {
    id: 1,
    title: 'Maya 2024完全自学宝典',
    cover: '/demo/course1.png',
    author: 'David Liu',
    views: '2.3k',
    rating: 4.8,
    price: 299,
    tags: ['Maya', '建模', '入门'],
    category: '入门基础',
    description: '从零开始学习Maya 2024，掌握3D建模、材质、灯光、动画等核心技能。'
  },
  {
    id: 2,
    title: 'ZBrush 角色雕刻进阶教程',
    cover: '/demo/course2.png', 
    author: 'Sarah Chen',
    views: '1.8k',
    rating: 4.9,
    price: 399,
    tags: ['ZBrush', '雕刻', '角色'],
    category: '进阶提升',
    description: '深入学习ZBrush角色雕刻技巧，提升角色制作能力。'
  },
  {
    id: 3,
    title: 'Unreal Engine 5游戏场景制作',
    cover: '/demo/course3.png',
    author: 'Mike Wang',
    views: '3.1k',
    rating: 4.7,
    price: 0,
    tags: ['UE5', '场景', '实战'],
    category: '商业实战',
    description: '使用UE5制作高质量游戏场景，掌握完整工作流程。'
  },
  {
    id: 4,
    title: '次世代游戏角色全流程制作',
    cover: '/demo/course4.png',
    author: 'Alex Zhang',
    views: '4.2k',
    rating: 4.9,
    price: 599,
    tags: ['角色', 'ZBrush', 'Maya'],
    category: '进阶提升',
    description: '完整演示次世代游戏角色制作流程，从建模到材质全覆盖。'
  },
  {
    id: 5,
    title: 'Substance Painter 材质绘制精讲',
    cover: '/demo/course5.png',
    author: 'Emma Li',
    views: '2.8k',
    rating: 4.8,
    price: 299,
    tags: ['SP', '材质', '贴图'],
    category: '入门基础',
    description: '系统学习SP材质制作，掌握PBR材质工作流程。'
  },
  {
    id: 6,
    title: 'Unity3D游戏开发基础入门',
    cover: '/demo/course6.png',
    author: 'Tom Wilson',
    views: '5.6k',
    rating: 4.6,
    price: 0,
    tags: ['Unity', '游戏', '入门'],
    category: '入门基础',
    description: 'Unity3D引擎基础知识与实战案例教学。'
  },
  {
    id: 7,
    title: '虚幻引擎5材质系统深度解析',
    cover: '/demo/course7.png',
    author: 'Chris Lee',
    views: '3.4k',
    rating: 4.9,
    price: 459,
    tags: ['UE5', '材质', '进阶'],
    category: '进阶提升',
    description: '深入学习UE5材质系统，制作高质量材质效果。'
  },
  {
    id: 8,
    title: '游戏特效全案制作实战',
    cover: '/demo/course8.png',
    author: 'Linda Wang',
    views: '2.9k',
    rating: 4.7,
    price: 399,
    tags: ['特效', 'VFX', 'UE5'],
    category: '商业实战',
    description: '商业项目实战，制作各类游戏特效。'
  },
  {
    id: 9,
    title: '3D角色动画制作精讲',
    cover: '/demo/course1-1.png',
    author: 'Jack Chen',
    views: '1.9k',
    rating: 4.8,
    price: 499,
    tags: ['动画', 'Maya', '角色'],
    category: '进阶提升',
    description: '深入学习角色动画制作技巧和流程。'
  },
  {
    id: 10,
    title: '游戏场景关卡设计实战',
    cover: '/demo/course2-2.png',
    author: 'Sophie Liu',
    views: '2.5k',
    rating: 4.6,
    price: 359,
    tags: ['关卡', '设计', 'UE5'],
    category: '商业实战',
    description: '游戏关卡设计原理与实战制作教学。'
  },
  {
    id: 11,
    title: 'Houdini特效阶教程',
    cover: '/demo/course1.png',
    author: 'Mark Zhang',
    views: '1.7k',
    rating: 4.9,
    price: 699,
    tags: ['Houdini', '特效', '进阶'],
    category: '进阶提升',
    description: 'Houdini高级特效制作技术详解。'
  },
  {
    id: 12,
    title: '写实场景环境艺术制作',
    cover: '/demo/course2.png',
    author: 'Helen Wang',
    views: '3.2k',
    rating: 4.7,
    price: 0,
    tags: ['环境', '场景', 'UE5'],
    category: '商业实战',
    description: '写实风格场景制作技巧与实战。'
  },
  {
    id: 13,
    title: '次世代角色材质制作进阶',
    cover: '/demo/course3.png',
    author: 'Kevin Chen',
    views: '2.1k',
    rating: 4.8,
    price: 459,
    tags: ['材质', 'SP', '角色'],
    category: '进阶提升',
    description: '次世代角色材质制作技术深度解析。'
  },
  {
    id: 14,
    title: 'Blender 3.0完全入门教程',
    cover: '/demo/course4.png',
    author: 'Ryan Liu',
    views: '6.7k',
    rating: 4.6,
    price: 0,
    tags: ['Blender', '建模', '入门'],
    category: '入门基础',
    description: 'Blender 3.0从入门到精通完整教程。'
  },
  {
    id: 15,
    title: '游戏道具制作全流程',
    cover: '/demo/course5.png',
    author: 'Lily Zhang',
    views: '1.9k',
    rating: 4.7,
    price: 299,
    tags: ['道具', '游戏', 'Maya'],
    category: '商业实战',
    description: '游戏道具制作从建模到材质完整流程。'
  },
  {
    id: 16,
    title: 'UE5环境光照大师班',
    cover: '/demo/course6.png',
    author: 'Michael Wu',
    views: '3.3k',
    rating: 4.9,
    price: 599,
    tags: ['UE5', '光照', '环境'],
    category: '进阶提升',
    description: 'UE5环境光照技术深度教学。'
  },
  {
    id: 17,
    title: '3D场景植被制作技巧',
    cover: '/demo/course7.png',
    author: 'Alice Wang',
    views: '2.4k',
    rating: 4.7,
    price: 359,
    tags: ['场景', '植被', 'UE5'],
    category: '商业实战',
    description: '场景植被制作技巧与实战案例。'
  },
  {
    id: 18,
    title: 'ZBrush硬表面雕刻教程',
    cover: '/demo/course8.png',
    author: 'Bob Chen',
    views: '1.8k',
    rating: 4.8,
    price: 399,
    tags: ['ZBrush', '雕刻', '硬表面'],
    category: '进阶提升',
    description: 'ZBrush硬表面雕刻技术详解。'
  },
  {
    id: 19,
    title: '游戏UI设计与制作',
    cover: '/demo/course1.png',
    author: 'Eva Li',
    views: '2.7k',
    rating: 4.6,
    price: 299,
    tags: ['UI', '设计', '游戏'],
    category: '商业实战',
    description: '游戏UI设计原理与实战制作。'
  },
  {
    id: 20,
    title: 'SP材质模板制作精讲',
    cover: '/demo/course2.png',
    author: 'Frank Zhang',
    views: '2.2k',
    rating: 4.8,
    price: 399,
    tags: ['SP', '材质', '模板'],
    category: '进阶提升',
    description: 'Substance Painter材质模板制作教学。'
  },
  {
    id: 21,
    title: '游戏动作特效制作',
    cover: '/demo/course3.png',
    author: 'Grace Liu',
    views: '3.1k',
    rating: 4.7,
    price: 459,
    tags: ['特效', '动作', 'UE5'],
    category: '商业实战',
    description: '游戏动作特效制作技巧与实战。'
  },
  {
    id: 22,
    title: 'Maya毛发系统精讲',
    cover: '/demo/course4.png',
    author: 'Henry Wu',
    views: '1.6k',
    rating: 4.9,
    price: 499,
    tags: ['Maya', '毛发', '角色'],
    category: '进阶提升',
    description: 'Maya毛发系统深度教学。'
  },
  {
    id: 23,
    title: '次世代服装制作工作流',
    cover: '/demo/course5.png',
    author: 'Iris Chen',
    views: '2.3k',
    rating: 4.8,
    price: 599,
    tags: ['服装', 'Marvelous', 'SP'],
    category: '商业实战',
    description: '次世代游戏服装制作完整流程。'
  },
  {
    id: 24,
    title: 'UE5程序化地形制作',
    cover: '/demo/course6.png',
    author: 'Jack Li',
    views: '2.8k',
    rating: 4.7,
    price: 0,
    tags: ['UE5', '地形', '程序化'],
    category: '进阶提升',
    description: 'UE5程序化地形制作技术教学。'
  }
]

export default function ListPage() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [activeFilter, setActiveFilter] = React.useState('all')
  const [activeSort, setActiveSort] = React.useState('latest')
  const [activeIndustry, setActiveIndustry] = React.useState('all')
  const [activeSkill, setActiveSkill] = React.useState('all')
  const itemsPerPage = 8
  const totalPages = Math.ceil(demoItems.length / itemsPerPage)
  
  // 计算当前显示的项目
  const currentItems = demoItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // 生成页码数组
  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }
    return pages
  }

  // 处理筛选条件点击
  const handleFilterClick = (filterId: string) => {
    if (activeFilter === filterId) {
      setActiveFilter('all')
    } else {
      setActiveFilter(filterId)
    }
  }

  // 处理行业点击
  const handleIndustryClick = (id: string) => {
    if (activeIndustry === id) {
      setActiveIndustry('all')
    } else {
      setActiveIndustry(id)
    }
  }

  // 处理技能点击
  const handleSkillClick = (id: string) => {
    if (activeSkill === id) {
      setActiveSkill('all')
    } else {
      setActiveSkill(id)
    }
  }

  return (
    <>
      {/* 顶部轮播横幅 */}
      <div className="w-full mb-8">
        <HomeCarousel images={banners} />
      </div>

      {/* 筛选条件 */}
      <div className={styles.filterSection}>
        {/* 行业 */}
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>行业</div>
          <div className={styles.filterButtons}>
            <button
              className={cn(styles.filterButton, activeIndustry === 'all' && styles.active)}
              onClick={() => setActiveIndustry('all')}
            >
              全部
            </button>
            {industries.map(industry => (
              <button
                key={industry.id}
                className={cn(styles.filterButton, activeIndustry === industry.id && styles.active)}
                onClick={() => handleIndustryClick(industry.id)}
              >
                {industry.name}
                {activeIndustry === industry.id && (
                  <span className={styles.closeIcon}>
                    <X />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 技能 */}
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>技能</div>
          <div className={styles.filterButtons}>
            <button
              className={cn(styles.filterButton, activeSkill === 'all' && styles.active)}
              onClick={() => setActiveSkill('all')}
            >
              ��部
            </button>
            {skills.map(skill => (
              <button
                key={skill.id}
                className={cn(styles.filterButton, activeSkill === skill.id && styles.active)}
                onClick={() => handleSkillClick(skill.id)}
              >
                {skill.name}
                {activeSkill === skill.id && (
                  <span className={styles.closeIcon}>
                    <X />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 软件 */}
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>软件</div>
          <div className={styles.filterButtons}>
            {software.map(sw => (
              <button
                key={sw.id}
                className={styles.softwareButton}
              >
                <Image
                  src={sw.icon}
                  alt={sw.name}
                  width={16}
                  height={16}
                  className={styles.softwareIcon}
                />
                {sw.name}
              </button>
            ))}
          </div>
        </div>

        {/* 级别 */}
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>级别</div>
          <div className={styles.filterButtons}>
            {levels.map(level => (
              <button
                key={level.id}
                className={styles.filterButton}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 灰色背景区域 */}
      <div className={styles.grayWrapper}>
        <div className={styles.grayContent}>
          {/* 筛选和排序 */}
          <div className={styles.sortSection}>
            <div className={styles.filterButtons}>
              <button
                className={cn(styles.filterButton, activeFilter === 'all' && styles.active)}
                onClick={() => handleFilterClick('all')}
              >
                全部
              </button>
              {filters.map(filter => (
                <button
                  key={filter.id}
                  className={cn(styles.filterButton, activeFilter === filter.id && styles.active)}
                  onClick={() => handleFilterClick(filter.id)}
                >
                  {filter.name}
                  {activeFilter === filter.id && (
                    <span className={styles.closeIcon}>
                      <X />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className={styles.sortButtons}>
              {sortOptions.map(option => {
                const Icon = option.icon
                return (
                  <button
                    key={option.id}
                    className={cn(styles.sortButton, activeSort === option.id && styles.active)}
                    onClick={() => setActiveSort(option.id)}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {option.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 课程列表 */}
          <div className={styles.courseGrid}>
            {currentItems.map(item => (
              <Link 
                key={item.id} 
                href={`/detail/${item.id}`}
                className={styles.courseCard}
              >
                <div className={styles.courseImage}>
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {item.price === 0 && (
                    <div className={styles.freeTag}>
                      免费
                    </div>
                  )}
                </div>
                <h3 className={styles.courseTitle}>
                  {item.title}
                </h3>
                <div className={styles.courseInfo}>
                  <span>{item.author}</span>
                  <span>{item.views} 观看</span>
                  <span>⭐ {item.rating}</span>
                </div>
                <div className={styles.courseTags}>
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={styles.courseTag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={cn(styles.coursePrice, item.price === 0 && "text-muted-foreground")}>
                  {item.price > 0 ? `¥${item.price}` : '免费课程'}
                </div>
              </Link>
            ))}
          </div>

          {/* 分页 */}
          <div className={styles.pagination}>
            <button 
              className={styles.paginationButton}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                className={cn(
                  styles.paginationButton,
                  currentPage === page && styles.active
                )}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button 
              className={styles.paginationButton}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
} 