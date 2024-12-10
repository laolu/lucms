import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, User, ArrowLeft, ArrowRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

interface SoftwareIcon {
  name: string
  icon: string
}

interface CourseLevel {
  text: string
  type: "red" | "green" | "purple"
}

interface Course {
  id: number
  title: string
  image: string
  description?: string
  software: SoftwareIcon[]
  level: CourseLevel
  price: {
    current: number
    original?: number
  }
  duration?: string
  students: number
  link: string
}

interface BigCourseCardProps extends Course {}

function BigCourseCard({ 
  title, 
  image, 
  description, 
  software, 
  level, 
  price, 
  duration,
  students,
  link 
}: BigCourseCardProps) {
  return (
    <div className="recommended-course-big">
      <Link href={link} className="recommended-course-big-poster">
        <Image
          src={image}
          alt={title}
          width={800}
          height={400}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="recommended-course-big-content">
        <Link href={link} className="recommended-course-big-title">
          {title}
        </Link>
        {description && (
          <p className="recommended-course-big-desc">{description}</p>
        )}
        <div className="recommended-course-big-meta">
          <div className="flex items-center gap-2">
            {software.map((item, index) => (
              <span key={index} className="software-icon">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
              </span>
            ))}
          </div>
          <span className={cn(
            "course-level-tag",
            level.type === "red" ? "text-red-500" : 
            level.type === "green" ? "text-green-500" : "text-purple-500"
          )}>
            <span className="level-dot" />
            {level.text}
          </span>
        </div>
        <div className="recommended-course-big-footer">
          <div className="recommended-course-big-price">
            <span className="current">¥{price.current.toFixed(2)}</span>
            {price.original && (
              <span className="original">¥{price.original.toFixed(2)}</span>
            )}
          </div>
          <div className="recommended-course-big-stats">
            {duration && (
              <>
                <Clock className="w-4 h-4" />
                <span className="mr-5">{duration}</span>
              </>
            )}
            <User className="w-4 h-4" />
            <span>{students}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SmallCourseCardProps extends Course {}

function SmallCourseCard({
  title,
  image,
  software,
  price,
  link,
  level,
  students
}: SmallCourseCardProps) {
  return (
    <div className="recommended-course-small">
      <Link href={link} className="recommended-course-small-poster">
        <Image
          src={image}
          alt={title}
          width={144}
          height={72}
          className="w-full h-full object-cover"
        />
      </Link>
      <div className="recommended-course-small-content">
        <Link href={link} className="recommended-course-small-title">
          {title}
        </Link>
        <div className="recommended-course-small-meta">
          <div className="recommended-course-small-software">
            {software.map((item, index) => (
              <span key={index} className="software-icon small">
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </span>
            ))}
          </div>
          <div className="recommended-course-small-price">
            <span className="current">¥{price.current.toFixed(2)}</span>
            {price.original && (
              <span className="original">¥{price.original.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const recommendedData = [
  {
    id: 1,
    mainCourse: {
      id: 101,
      title: "次次先生零基础虚幻引擎5三渲二技术专项特训班第一期【场景+角色】",
      image: "/course1.jpg",
      description: "在本次课程中，我们将从零开始学习，带领大家学习和掌握虚幻引擎主流的三渲二渲染表现流程与技巧，课程主要包含场景表现和角色表现两大案例...",
      software: [
        { name: "Unreal Engine", icon: "/software/ue.png" }
      ],
      level: { text: "高级课程", type: "red" as const },
      price: { current: 2298 },
      duration: "40hr",
      students: 4084,
      link: "/course/1"
    },
    subCourses: [
      {
        id: 201,
        title: "虚幻引擎5 二次元角色高级动画系统ControlRig与渲染精讲",
        image: "/course2.jpg",
        software: [
          { name: "Unreal Engine", icon: "/software/ue.png" }
        ],
        level: { text: "中级课程", type: "green" as const },
        price: { current: 304.64, original: 448 },
        students: 2000,
        link: "/course/2"
      },
      {
        id: 202,
        title: "Substance Designer高级服装布料材质表现案例教学",
        image: "/course3.jpg",
        software: [
          { name: "Substance Designer", icon: "/software/sd.png" }
        ],
        level: { text: "高级课程", type: "red" as const },
        price: { current: 268 },
        students: 1500,
        link: "/course/3"
      },
      {
        id: 203,
        title: "Blender超写实高精度女仆装实战案例—极致纹理细节表现",
        image: "/course4.jpg",
        software: [
          { name: "Blender", icon: "/software/blender.png" }
        ],
        level: { text: "专家课程", type: "purple" as const },
        price: { current: 698 },
        students: 3000,
        link: "/course/4"
      }
    ]
  }
]

export function RecommendedCourses() {
  return (
    <section className="recommended-section">
      <div className="section-title">
        <h2>好课推荐</h2>
        <Link href="/recommended" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
          查看更多 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="recommended-carousel"
      >
        <CarouselContent>
          {recommendedData.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="recommended-slide">
                <BigCourseCard {...slide.mainCourse} />
                <div className="recommended-list">
                  {slide.subCourses.map((course) => (
                    <SmallCourseCard key={course.id} {...course} />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="carousel-nav left-4">
          <ArrowLeft className="w-6 h-6" />
        </CarouselPrevious>
        <CarouselNext className="carousel-nav right-4">
          <ArrowRight className="w-6 h-6" />
        </CarouselNext>
      </Carousel>
    </section>
  )
} 