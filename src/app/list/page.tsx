"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  { id: 'latest', name: '最新', active: true },
  { id: 'popular', name: '最热' },
  { id: 'rating', name: '评分' },
]

const demoItems = [
  {
    id: 1,
    title: 'Maya 2024完全自学宝典',
    cover: '/demo/covers/1.jpg',
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
    cover: '/demo/covers/2.jpg', 
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
    cover: '/demo/covers/3.jpg',
    author: 'Mike Wang',
    views: '3.1k',
    rating: 4.7,
    price: 0,
    tags: ['UE5', '场景', '实战'],
    category: '商业实战',
    description: '使用UE5制作高质量游戏场景，掌握完整工作流程。'
  },
]

export default function ListPage() {
  return (
    <>
      {/* 顶部轮播横幅 */}
      <div className="w-full">
        <HomeCarousel images={banners} />
      </div>

      <div className="container px-4 py-8 mx-auto md:px-6">
        {/* 筛选条件 */}
        <div className={styles.filterSection}>
          {/* 行业 */}
          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>行业</div>
            <div className={styles.filterButtons}>
              {industries.map(industry => (
                <button
                  key={industry.id}
                  className={cn(styles.filterButton, industry.active && styles.active)}
                >
                  {industry.name}
                </button>
              ))}
            </div>
          </div>

          {/* 技能 */}
          <div className={styles.filterGroup}>
            <div className={styles.filterTitle}>技能</div>
            <div className={styles.filterButtons}>
              {skills.map(skill => (
                <button
                  key={skill.id}
                  className={styles.filterButton}
                >
                  {skill.name}
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

        {/* 筛选和排序 */}
        <div className={styles.sortSection}>
          <div className={styles.filterButtons}>
            {filters.map(filter => (
              <button
                key={filter.id}
                className={styles.filterButton}
              >
                {filter.name}
              </button>
            ))}
          </div>
          <div className={styles.sortButtons}>
            {sortOptions.map(option => (
              <button
                key={option.id}
                className={cn(styles.sortButton, option.active && styles.active)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>

        {/* 课程列表 */}
        <div className={styles.courseGrid}>
          {demoItems.map(item => (
            <Link 
              key={item.id} 
              href={`/course/${item.id}`}
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
                <span>{item.views} 观</span>
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
          <button className={styles.paginationButton}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className={cn(styles.paginationButton, styles.active)}>1</button>
          <button className={styles.paginationButton}>2</button>
          <button className={styles.paginationButton}>3</button>
          <span className="mx-2">...</span>
          <button className={styles.paginationButton}>10</button>
          <button className={styles.paginationButton}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  )
} 