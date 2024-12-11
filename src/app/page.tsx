import Link from "next/link"
import Image from "next/image"
import { HomeCarousel } from "@/components/carousel"
import { SubBanner } from "@/components/sub-banner"
import { KeywordCard } from "@/components/keyword-card"
import { CourseSection } from "@/components/course-section"
import { RecommendedCourses } from "@/components/recommended-courses"
import { CourseList } from "@/components/course-list"

const hotCourses = [
  {
    id: 1,
    title: "Unreal Engine 5 虚幻PCG程序化生成实战高级进阶班第三期",
    image: "/demo/course1-1.png",
    author: {
      name: "黑鸟云端-戴利勋",
      avatar: "/demo/avatar1.png",
      link: "/teacher/82481"
    },
    price: { current: 1200 },
    software: [{ name: "Unreal Engine", icon: "/demo/icons/ue.png" }],
    status: { text: "火热报名中", type: "red" as const },
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
    price: { current: 3980, original: 4298 },
    software: [
      { name: "Zbrush", icon: "/demo/icons/zbrush.png" },
      { name: "Unreal Engine", icon: "/demo/icons/ue.png" },
      { name: "Substance Painter", icon: "/demo/icons/sp.png" }
    ],
    status: { text: "火热报名中", type: "red" as const },
    students: 2138,
    link: "/course/2"
  },
  {
    id: 3,
    title: "Maya高级动画师进阶课程【技术篇】",
    image: "/demo/course3.png",
    author: {
      name: "动画师小王",
      avatar: "/demo/avatar1.png",
      link: "/teacher/10086"
    },
    price: { current: 2680 },
    software: [{ name: "Maya", icon: "/demo/icons/maya.png" }],
    status: { text: "报名进行中", type: "green" as const },
    students: 1256,
    link: "/course/3"
  },
  {
    id: 4,
    title: "Houdini特效全流程实战教学",
    image: "/demo/course4.png",
    author: {
      name: "特效大师",
      avatar: "/demo/avatar1.png",
      link: "/teacher/10087"
    },
    price: { current: 3999, original: 4500 },
    software: [{ name: "Houdini", icon: "/demo/icons/houdini.png" }],
    status: { text: "火热报名中", type: "red" as const },
    students: 892,
    link: "/course/4"
  },
  {
    id: 5,
    title: "Blender角色建模与材质渲染高级教程",
    image: "/demo/course5.png",
    author: {
      name: "建模达人",
      avatar: "/demo/avatar1.png",
      link: "/teacher/10088"
    },
    price: { current: 1999 },
    software: [
      { name: "Blender", icon: "/demo/icons/blender.png" },
      { name: "Substance Painter", icon: "/demo/icons/sp.png" }
    ],
    status: { text: "即将开课", type: "green" as const },
    students: 1567,
    link: "/course/5"
  },
  {
    id: 6,
    title: "ZBrush数字雕刻进阶课程",
    image: "/demo/course6.png",
    author: {
      name: "雕刻大师",
      avatar: "/demo/avatar1.png",
      link: "/teacher/10089"
    },
    price: { current: 2499, original: 2999 },
    software: [{ name: "Zbrush", icon: "/demo/icons/zbrush.png" }],
    status: { text: "火热报名中", type: "red" as const },
    students: 734,
    link: "/course/6"
  },
  {
    id: 7,
    title: "C4D影视特效制作全案例教学",
    image: "/demo/course7.png",
    author: {
      name: "C4D专家",
      avatar: "/demo/avatar1.png",
      link: "/teacher/10090"
    },
    price: { current: 1799 },
    software: [{ name: "Cinema 4D", icon: "/demo/icons/c4d.png" }],
    status: { text: "报名进行中", type: "green" as const },
    students: 2045,
    link: "/course/7"
  },
  {
    id: 8,
    title: "Substance Designer材质制作高级教程",
    image: "/demo/course8.png",
    author: {
      name: "材质大师",
      avatar: "/demo/avatar1.png",
      link: "/teacher/10091"
    },
    price: { current: 1599, original: 1999 },
    software: [{ name: "Substance Designer", icon: "/demo/icons/sd.png" }],
    status: { text: "火热报名中", type: "red" as const },
    students: 1123,
    link: "/course/8"
  }
]

// 复制 hotCourses 数组并修改 id 和 link 来创建 newCourses
const newCourses = hotCourses.map(course => ({
  ...course,
  id: course.id + 100,
  link: `/course/${course.id + 100}`
}))

// 复制 hotCourses 数组并修改 id 和 link 来创建 recommendedCourses
const recommendedCourses = hotCourses.map(course => ({
  ...course,
  id: course.id + 200,
  link: `/course/${course.id + 200}`
}))

const subBannerItems = [
  {
    id: 1,
    href: '/course/2493',
    imgSrc: '/banner1.jpg',
    alt: '课程1'
  },
  // ... 其他项目
]

export default function Home() {
  return (
    <main>
      <HomeCarousel />
      
      <div className="container py-8">
        <SubBanner />
        <div className="mt-8" />
        <KeywordCard />
      </div>

      <section className="container">
        <RecommendedCourses />
      </section>
      
      <section className="container">
        <CourseSection />
      </section>

      <section className="container">
        <CourseList
          title="热门资源"
          titleBg="HOT"
          courses={hotCourses}
        />
      </section>

      {/* 最新资源 */}
      <section className="container">
        <CourseList
          title="最新资源"
          titleBg="NEW"
          courses={newCourses}
        />
      </section>

      {/* 推荐教程 */}
      <section className="container">
        <CourseList
          title="推荐教程"
          titleBg="RECOMMEND"
          courses={recommendedCourses}
        />
      </section>
    </main>
  )
} 