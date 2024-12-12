"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Clock, Users, Star, Play, BookOpen, Award, CheckCircle2,
  Target, Book, Laptop, Brain, Zap, Trophy, Rocket, Heart, ChevronRight, Eye, Shield, Crown, CreditCard, User, MessageCircle, FileBox, Layers, Wrench, FolderOpen, Calendar
} from "lucide-react"
import styles from "./detail.module.css"
import { Comments } from "@/components/comments"
import { Card, CardContent } from "@/components/ui/card"
import { Users2 } from "lucide-react"

// 模拟数据
const courseData = {
  id: 1,
  title: "法常次世代与影视角色提高班第五期",
  description: "掌握次世代角色制作流程，打造高品质作品集。本课程将带你深入学习角色制作的各个环节，从概念设计到最终渲染，全方位提升你的角色制作能力。",
  coverImage: "/demo/banner1.png",
  price: 3980,
  originalPrice: 4298,
  rating: 4.9,
  studentsCount: 2138,
  duration: "40小时",
  level: "进阶",
  category: "游戏美术",
  updateDate: "2024-01-15",
  progress: 85,
  software: [
    { name: "Zbrush", icon: "/demo/icons/zbrush.png" },
    { name: "Maya", icon: "/demo/icons/maya.png" },
    { name: "Substance Painter", icon: "/demo/icons/sp.png" },
    { name: "Marvelous Designer", icon: "/demo/icons/md.png" }
  ],
  instructor: {
    name: "法常",
    avatar: "/demo/avatar1.png",
    title: "资深角色艺术家",
    company: "某知名游戏公司",
    description: "拥有10年以上的戏角色制作经验参与过多款3A游戏制作",
    students: 8000,
    courses: 12,
    achievements: [
      "参与《原神》、《崩坏：星穹铁道》等多款名游戏角色制作",
      "获得2023年度最佳游戏美术设计奖",
      "担任某知名游戏公司角色主美",
      "多次受邀参加游戏开发者大会分享经验"
    ]
  },
  highlights: [
    "完整的次世代角色制作工作流程",
    "业内顶尖艺术家的实战经验分享",
    "专业的作品集指导和点评",
    "详细的软件技术讲解和案例实战",
    "终身制课程，永久观看权限"
  ],
  requirements: [
    "具备基础的3D建模和贴图制作能力",
    "熟悉Maya、ZBrush等常用软件的基本操作",
    "了解基本的角色设计原理",
    "有一定的美术功���美能力",
    "保证每周至少10小时的学习时间"
  ],
  objectives: [
    "掌握次世代角色的完整制作流程",
    "精通角色的高模制作和拓扑技巧",
    "掌握PBR材质制作和贴图绘制",
    "学会角色的毛发制作和布料模拟",
    "能够独立完成高质量的角色作品"
  ],
  features: [
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "在线教学",
      description: "随时随地，想学就学"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "实战项目",
      description: "真实项目案例分析"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "作品点评",
      description: "行业导师一对一指导"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "就业指导",
      description: "入职推荐与简历指导"
    }
  ],
  chapters: [
    {
      title: "第一章：课程介绍与前期准备",
      lessons: [
        { title: "1-1 课程概述与学习方法", duration: "25:30", free: true },
        { title: "1-2 工具软件介绍与安装", duration: "40:15", free: true },
        { title: "1-3 制作流程概述", duration: "35:45", free: false }
      ]
    },
    {
      title: "第二章：角色设计����基础",
      lessons: [
        { title: "2-1 色概念设计要点", duration: "55:20", free: false },
        { title: "2-2 人体结构与比例", duration: "45:30", free: false },
        { title: "2-3 面部结构与表情", duration: "50:15", free: false }
      ]
    },
    {
      title: "第三章：高级建模技巧",
      lessons: [
        { title: "3-1 ZBrush 高级雕刻技巧", duration: "60:00", free: false },
        { title: "3-2 节处理优化", duration: "45:30", free: false },
        { title: "3-3 拓扑结构优化", duration: "40:20", free: false }
      ]
    }
  ],
  studentWorks: [
    {
      image: "/demo/work1.png",
      title: "科幻女战士",
      author: "学员小王",
      description: "课程第一个月作品，获得优秀作品奖"
    },
    {
      image: "/demo/work2.png",
      title: "东方武侠角色",
      author: "学员小李",
      description: "课程结业作品，已被游戏公司收录"
    },
    {
      image: "/demo/work3.png",
      title: "魔幻生物",
      author: "学员小张",
      description: "课程实战项目作品，广受好评"
    }
  ],
  recommendedCourses: [
    {
      id: 1,
      title: "ZBrush角色雕刻阶实战班 - 写实角色全流程制作",
      description: "从基础到进阶，掌握ZBrush色雕刻技巧，制作精美的写实角色模型。课程涵盖人体解析、面部表情、服装褶皱等专业知识。",
      image: "/demo/course1.png",
      instructor: "大鹏老师",
      price: 2998
    },
    {
      id: 2,
      title: "Maya高级动画师养成计划 - 次世代游戏动画制作",
      description: "系统学习Maya动画制作流程包括角色动画、表情动画、特效动画等，让你成为专业的游戏动画师。",
      image: "/demo/course2.png",
      instructor: "阿杰老师",
      price: 3298
    },
    {
      id: 3,
      title: "Substance Painter 材质贴图高级训练营",
      description: "深入学习Substance Painter的高级功能，制作各类写实材质，提升作品的视觉效果和细节表现。",
      image: "/demo/course3.png",
      instructor: "小林老师",
      price: 2498
    },
    {
      id: 4,
      title: "虚幻引擎5 - 开放世界场景制作进阶教程",
      description: "使用虚幻引擎5制作大型开放世界场景，学习地形制作、植被系统、天气系统等高级功能。",
      image: "/demo/course4.png",
      instructor: "天琪老师",
      price: 3998
    }
  ]
}

export default function CourseDetail({ params }: { params: { id: string } }) {
  return (
    <div className={styles.container}>
      {/* 面包屑导航 */}
      <div className={styles.breadcrumbWrapper}>
        <div className={styles.breadcrumb}>
          <Link href="/">首页</Link>
          <span> / </span>
          <Link href="/list">课程</Link>
          <span> / </span>
          <span>课程详情</span>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className={styles.mainContent}>

        <h1 className={styles.title}>{courseData.title}</h1>
        <p className={styles.description}>{courseData.description}</p>

        <div className={styles.imageAndMeta}>
          {/* 左侧图片 */}
          <div className={styles.leftContent}>
            <div className={styles.previewImage}>
              <Image
                src={courseData.coverImage}
                alt={courseData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 右侧内容 */}
          <div className={styles.rightContent}>
            <div className={styles.priceSection}>
              <div className={styles.priceRow}>
                <div className={styles.priceBox}>
                  <div className={styles.price}>
                    <span className={styles.currency}>¥</span>
                    <span className={styles.amount}>{courseData.price}</span>
                  </div>
                  {courseData.originalPrice && (
                    <span className={styles.originalPrice}>
                      ¥{courseData.originalPrice}
                    </span>
                  )}
                </div>
                <div className={styles.vipTag}>
                  <Crown className={`w-4 h-4 ${styles.vipIcon}`} />
                  VIP会员免费学习
                </div>
              </div>
              <div className={styles.priceDesc}>
                <span className={styles.priceDescItem}>
                  <Users className="w-4 h-4" />
                  {courseData.studentsCount} 人已购买
                </span>
                <span className={styles.priceDescItem}>
                  <Clock className="w-4 h-4" />
                  永久有效
                </span>
                <span className={styles.priceDescItem}>
                  <Calendar className="w-4 h-4" />
                  {courseData.updateDate} 更新
                </span>
              </div>

              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Star className="w-4 h-4" />
                  {courseData.rating} 分
                </span>
                <span className={styles.metaItem}>
                  <Clock className="w-4 h-4" />
                  {courseData.duration}
                </span>
                <span className={styles.metaItem}>
                  <Target className="w-4 h-4" />
                  {courseData.level}
                </span>
              </div>

              <div className={styles.software}>
                {courseData.software.map((sw, index) => (
                  <div key={index} className={styles.softwareIcon}>
                    <Image
                      src={sw.icon}
                      alt={sw.name}
                      width={16}
                      height={16}
                    />
                    <span>{sw.name}</span>
                  </div>
                ))}
              </div>

              <div className={styles.purchaseButtons}>
                <button className={styles.buyButton}>立即购买</button>
                <button className={styles.vipButton}>
                  <Crown className="w-4 h-4" />
                  开通VIP会员
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>

        {/* 课程详情内容 */}
        <div className={styles.courseContent}>
          {/* 课程详情卡片 */}
          <div className={styles.detailCard}>
            {/* 课程大纲 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <BookOpen className="w-5 h-5" />
                详情
              </h2>
              {/* 播放器区域 */}
              <div className={styles.playerSection}>
                <div className={styles.player}>
                  <div className={styles.playerPlaceholder}>
                    <Play className="w-12 h-12" />
                    <span>试看视频</span>
                  </div>
                </div>
              </div>
              <div className={styles.curriculum}>
                {courseData.chapters.map((chapter, index) => (
                  <div key={index} className={styles.chapter}>
                    <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                    <div className={styles.lessons}>
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className={styles.lesson}>
                          <div className={styles.lessonInfo}>
                            <Play className="w-4 h-4" />
                            <span className={styles.lessonTitle}>{lesson.title}</span>
                            {lesson.free && <span className={styles.freeTag}>免费</span>}
                          </div>
                          <span className={styles.duration}>{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            课程介绍
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <Book className="w-5 h-5" />
                课程介绍
              </h2>
              <div className={styles.overview}>
                {/* ... 课程特色部分保持不变 ... */}
              </div>
            </div>

            {/* 讲师介绍 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <User className="w-5 h-5" />
                讲师介绍
              </h2>
              <div className={styles.instructor}>
                {/* ... 讲师信息部分保持不变 ... */}
              </div>
            </div>

            {/* 评论区域 */}
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <MessageCircle className="w-5 h-5" />
                课程评论
              </h2>
              <Comments limit={5} />
              <div className={styles.pagination}>
                <button className={styles.pageButton}>上一页</button>
                <span className={styles.pageInfo}>1 / 10</span>
                <button className={styles.pageButton}>下一页</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 相关推荐 */}
      <div className={styles.container}>
        <div className={styles.recommendSection}>
          <div className={styles.recommendInner}>
            <h2 className={styles.recommendTitle}>相关推荐</h2>
            <div className={styles.recommendList}>
              {courseData.recommendedCourses.slice(0, 8).map((course) => (
                <Link href={`/detail/${course.id}`} key={course.id} className={styles.recommendCard}>
                  <div className={styles.recommendImage}>
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className={styles.recommendTitle}>{course.title}</h3>
                  <div className={styles.recommendMeta}>
                    <span className={styles.recommendInstructor}>{course.instructor}</span>
                    <span className={styles.recommendPrice}>¥{course.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 