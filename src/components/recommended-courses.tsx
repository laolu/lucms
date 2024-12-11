import { Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import styles from "./recommended-courses.module.css"

const recommendedCourses = [
  {
    id: 1,
    mainCourse: {
      id: 101,
      title: "次次先生零基础虚幻引擎5三渲二技术专项特训班第一期【场景+角色】",
      description: "在本次课程中，我们将从零开始学习，带领大家学习和掌握虚幻引擎主流的三渲二渲染表现流程与技巧...",
      image: "/demo/course1.png",
      price: 2298.00,
      duration: "40hr",
      students: 4084,
      level: "高级课程",
      levelColor: "red",
      software: [
        {
          name: "Unreal Engine",
          icon: "/demo/icons/ue.png"
        },
        {
          name: "Blender",
          icon: "/demo/icons/blender.png"
        }
      ]
    },
    subCourses: [
      {
        id: 201,
        title: "虚幻引擎5 二次元角色高级动画系统ControlRig与渲染精讲",
        image: "/demo/course2.png",
        price: 304.64,
        originalPrice: 448.00,
        software: [
          {
            name: "Unreal Engine",
            icon: "/demo/icons/ue.png"
          }
        ]
      },
      {
        id: 202,
        title: "Substance Designer二次元风格化材质进阶专项训练第2季【18个案例】",
        image: "/demo/course3.png",
        price: 398.00,
        software: [
          {
            name: "Substance Designer",
            icon: "/demo/icons/sd.png"
          }
        ]
      },
      {
        id: 203,
        title: "从立绘到直播—零基础live2d虚拟主播实战案例教学",
        image: "/demo/course4.png",
        price: 358.00,
        software: [
          {
            name: "Live2D",
            icon: "/demo/icons/live2d.png"
          }
        ]
      }
    ]
  },
  // 可以添加更多轮播项...
]

export function RecommendedCourses() {
  return (
    <div className={styles.recommendedCourses}>
      {/* 标题部分 */}
      <div className={styles.titleSection}>
        <div className={styles.titleHr} />
        <h2 className={styles.title}>好课推荐</h2>
        <div className={styles.titleHr} />
        <div className={styles.titleBg}>RECOMMEND</div>
        <Link href="/courses" className={styles.moreBtn}>
          <span>查看更多</span>
          <span className="w-5 h-5 i-arrow-more" />
        </Link>
      </div>

      {/* 轮播部分 */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className={styles.carousel}
      >
        <CarouselContent>
          {recommendedCourses.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className={styles.courseContent}>
                {/* 主课程 */}
                <div className={styles.mainCourse}>
                  <Link href={`/course/${slide.mainCourse.id}`} className={styles.courseCard}>
                    <div className={styles.imageWrapper}>
                      <Image
                        src={slide.mainCourse.image}
                        alt={slide.mainCourse.title}
                        fill
                        className={styles.image}
                      />
                    </div>
                    <div className={styles.courseInfo}>
                      <h3 className={styles.courseTitle}>{slide.mainCourse.title}</h3>
                      <p className={styles.courseDesc}>{slide.mainCourse.description}</p>
                      <div className={styles.softwareList}>
                        {slide.mainCourse.software.map(sw => (
                          <div key={sw.name} className={styles.softwareIcon}>
                            <Image src={sw.icon} alt={sw.name} width={24} height={24} />
                          </div>
                        ))}
                        <span className={styles.levelTag} data-color={slide.mainCourse.levelColor}>
                          {slide.mainCourse.level}
                        </span>
                      </div>
                      <div className={styles.courseFooter}>
                        <div className={styles.price}>
                          <span className={styles.currency}>¥</span>
                          <span className={styles.amount}>{slide.mainCourse.price}</span>
                        </div>
                        <div className={styles.stats}>
                          <span className={styles.duration}>
                            <Clock className="w-4 h-4" />
                            {slide.mainCourse.duration}
                          </span>
                          <span className={styles.students}>
                            <Users className="w-4 h-4" />
                            {slide.mainCourse.students}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* 侧边课程列表 */}
                <div className={styles.courseSidebar}>
                  {slide.subCourses.map(course => (
                    <Link key={course.id} href={`/course/${course.id}`} className={styles.sidebarCourse}>
                      <div className={styles.sidebarImage}>
                        <Image src={course.image} alt={course.title} fill className={styles.image} />
                      </div>
                      <div className={styles.sidebarInfo}>
                        <h4 className={styles.sidebarTitle}>{course.title}</h4>
                        <div className={styles.sidebarFooter}>
                          <div className={styles.softwareList}>
                            {course.software.map(sw => (
                              <div key={sw.name} className={styles.softwareIcon}>
                                <Image src={sw.icon} alt={sw.name} width={20} height={20} />
                              </div>
                            ))}
                          </div>
                          <div className={styles.price}>
                            <span className={styles.currency}>¥</span>
                            <span className={styles.amount}>{course.price}</span>
                            {course.originalPrice && (
                              <span className={styles.originalPrice}>¥{course.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={styles.carouselPrev} />
        <CarouselNext className={styles.carouselNext} />
      </Carousel>
    </div>
  )
} 