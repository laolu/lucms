import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { User, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./course-list.module.css"

interface CourseListProps {
  title: string
  titleBg: string
  courses: {
    id: number
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
    software: {
      name: string
      icon: string
    }[]
    status: {
      text: string
      type: "red" | "green"
    }
    students: number
    link: string
  }[]
}

export function CourseList({ title, titleBg, courses }: CourseListProps) {
  return (
    <section className={styles.courseList}>
      <div className={styles.sectionTitle}>
        <div className={styles.titleHr} />
        <h2>{title}</h2>
        <div className={styles.titleHr} />
        <div className={styles.titleBg}>{titleBg}</div>
        <Link href="/list" className={styles.moreBtn}>
          <span>查看更多</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className={styles.grid}>
        {courses.map(course => (
          <div key={course.id} className={styles.courseCard}>
            <Link href={course.link} className={styles.poster}>
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />
            </Link>
            
            <div className={styles.content}>
              <Link href={course.link} className={styles.title}>
                {course.title}
              </Link>
              
              <div className={styles.meta}>
                <Link href={course.author.link} className={styles.author}>
                  <span className={styles.authorAvatar}>
                    <Image
                      src={course.author.avatar}
                      alt={course.author.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </span>
                  <span className={styles.authorName}>{course.author.name}</span>
                </Link>
                
                <div className={styles.software}>
                  {course.software.map((sw, index) => (
                    <span key={index} className={styles.softwareIcon}>
                      <Image
                        src={sw.icon}
                        alt={sw.name}
                        width={20}
                        height={20}
                      />
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.footer}>
                <div className={styles.price}>
                  <span className={styles.currentPrice}>¥{course.price.current}</span>
                  {course.price.original && (
                    <span className={styles.originalPrice}>¥{course.price.original}</span>
                  )}
                </div>
                
                <div className={styles.students}>
                  <User className="w-4 h-4" />
                  <span>{course.students}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 