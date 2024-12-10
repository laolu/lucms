import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, User } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <div className="course-card">
      <div className="course-card-top">
        <Link href={link} className="course-card-poster">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </Link>
        <div className="course-card-software">
          {software.map((item, index) => (
            <span key={index} className="software-icon">
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </span>
          ))}
        </div>
        <div className="course-card-software-bg" />
      </div>
      
      <div className="course-card-content">
        <Link href={link} className="course-card-title">
          {title}
        </Link>
        
        <div className="course-card-meta">
          <Link href={author.link} className="course-card-author">
            <span className="author-avatar">
              <Image
                src={author.avatar}
                alt={author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            </span>
            <span className="author-name">{author.name}</span>
          </Link>
          
          <div className="course-card-price">
            <span className="current">¥{price.current}</span>
            {price.original && (
              <span className="original">¥{price.original}</span>
            )}
          </div>
        </div>
        
        <div className="course-card-divider" />
        
        <div className="course-card-footer">
          <div className="flex items-center gap-6">
            <div className={cn(
              "course-card-status",
              status.type === "red" ? "text-red-500" : "text-green-500"
            )}>
              <span className="status-dot" />
              <span>{status.text}</span>
            </div>
            
            <div className={cn(
              "course-card-level",
              level.type === "red" ? "text-red-500" : "text-green-500"
            )}>
              <span className="level-dot" />
              <span>{level.text}</span>
            </div>
          </div>
          
          <div className="course-card-students">
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
    image: "/course1.jpg",
    author: {
      name: "黑鸟云端-戴利勋",
      avatar: "/avatar1.jpg",
      link: "/teacher/82481"
    },
    price: {
      current: 1200
    },
    software: [
      {
        name: "Unreal Engine",
        icon: "/software/ue.png"
      }
    ],
    status: {
      text: "火热报名中",
      type: "red"
    },
    level: {
      text: "中级课程",
      type: "green"
    },
    students: 509,
    link: "/course/1"
  },
  {
    id: 2,
    title: "法常次世代与影视角色提高班第五期",
    image: "/course2.jpg",
    author: {
      name: "法常",
      avatar: "/avatar2.jpg",
      link: "/teacher/40644"
    },
    price: {
      current: 3980,
      original: 4298
    },
    software: [
      {
        name: "Zbrush",
        icon: "/software/zbrush.png"
      },
      {
        name: "Unreal Engine",
        icon: "/software/ue.png"
      },
      {
        name: "Substance Painter",
        icon: "/software/sp.png"
      }
    ],
    status: {
      text: "火热报名中",
      type: "red"
    },
    level: {
      text: "高级课程",
      type: "red"
    },
    students: 2138,
    link: "/course/2"
  }
]

export function CourseSection() {
  return (
    <section className="course-section">
      <div className="section-title">
        <h2>在线课堂</h2>
        <Link href="/courses">
          查看更多 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coursesData.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  )
} 