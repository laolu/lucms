import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, User } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./course-section.module.css"

interface SoftwareIcon {
  name: string
  icon: string
}

interface CourseCardProps {
  title: string
  image: string
  author: {
    name: string
    avatar: string
    link: string
  }
  price: {
    current: number
    original?: number
  }
  software: SoftwareIcon[]
  status: {
    text: string
    type: "red" | "green"
  }
  level: {
    text: string
    type: "red" | "green"
  }
  students: number
  link: string
}

function CourseCard({ 
  title, 
  image, 
  author, 
  price, 
  software,
  status,
  level,
  students,
  link 
}: CourseCardProps) {
  return (
    <div className={styles.courseCard}>
      <div className={styles.cardTop}>
        <Link href={link} className={styles.poster}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </Link>
        <button className={styles.purchaseBtn}>
          ¥{price.current}
        </button>
        <div className={styles.software}>
          {software.map((item, index) => (
            <span key={index} className={styles.softwareIcon}>
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
              />
            </span>
          ))}
        </div>
        <div className={styles.softwareBg} />
      </div>
      
      <div className={styles.content}>
        <Link href={link} className={styles.title}>
          {title}
        </Link>
        
        <div className={styles.meta}>
          <Link href={author.link} className={styles.author}>
            <span className={styles.authorAvatar}>
              <Image
                src={author.avatar}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            </span>
            <span className={styles.authorName}>{author.name}</span>
          </Link>
        </div>
        
        <div className={styles.divider} />
        
        <div className={styles.footer}>
          <div className="flex gap-6 items-center">
            <div className={cn(
              styles.status,
              status.type === "red" ? "text-red-500" : "text-green-500"
            )}>
              <span className={styles.statusDot} />
              <span>{status.text}</span>
            </div>
            
            <div className={cn(
              styles.level,
              level.type === "red" ? "text-red-500" : "text-green-500"
            )}>
              <span className={styles.levelDot} />
              <span>{level.text}</span>
            </div>
          </div>
          
          <div className={styles.students}>
            <User className="w-4 h-4" />
            <span>{students}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const coursesData = [
  {
    id: 1,
    title: "Unreal Engine 5 虚幻PCG程序化生成实战高级进阶班第三期",
    image: "/demo/course1-1.png",
    author: {
      name: "黑鸟云端-戴利勋",
      avatar: "/demo/avatar1.png",
      link: "/teacher/82481"
    },
    price: {
      current: 1200
    },
    software: [
      {
        name: "Unreal Engine",
        icon: "/demo/icons/ue.png"
      }
    ],
    status: {
      text: "火热报名中",
      type: "red" as const
    },
    level: {
      text: "中级课程",
      type: "green" as const
    },
    students: 509,
    link: "/course/1"
  },
  {
    id: 2,
    title: "法常次世代与影视角色提高班第五期",
    image: "/demo/course2-2.png",
    author: {
      name: "法常",
      avatar: "/demo/avatar1.png",
      link: "/teacher/40644"
    },
    price: {
      current: 3980,
      original: 4298
    },
    software: [
      {
        name: "Zbrush",
        icon: "/demo/icons/zbrush.png"
      },
      {
        name: "Unreal Engine",
        icon: "/demo/icons/ue.png"
      },
      {
        name: "Substance Painter",
        icon: "/demo/icons/sp.png"
      }
    ],
    status: {
      text: "火热报名中",
      type: "red" as const
    },
    level: {
      text: "高级课程",
      type: "red" as const
    },
    students: 2138,
    link: "/course/2"
  }
]

export function CourseSection() {
  return (
    <section className={styles.courseSection}>
      <div className={styles.sectionTitle}>
        <div className={styles.titleHr} />
        <h2>在线���堂</h2>
        <div className={styles.titleHr} />
        <div className={styles.titleBg}>CLASSROOM</div>
        <Link href="/courses">
          查看更多 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className={styles.courseGrid}>
        {coursesData.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  )
} 