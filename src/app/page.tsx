import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, MessageSquare, ThumbsUp } from "lucide-react"
import { HomeCarousel } from "@/components/carousel"
import { SubBanner } from "@/components/sub-banner"
import { KeywordCard } from "@/components/keyword-card"
import { CourseSection } from "@/components/course-section"
import { RecommendedCourses } from "@/components/recommended-courses"

export default function Home() {
  return (
    <main>
      <section className="mb-8">
        <HomeCarousel />
      </section>
      
      <section className="container">
        <SubBanner />
      </section>

      <section className="container">
        <KeywordCard />
      </section>

      <section className="container">
        <CourseSection />
      </section>

      <section className="container">
        <RecommendedCourses />
      </section>
      
      {/* 热门资源 */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">热门资源</h2>
          <Button variant="ghost" asChild>
            <Link href="/list">查看更多</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="group overflow-hidden">
              <Link href={`/resource/${item}`}>
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={`/placeholder${item}.jpg`}
                    alt="资源预览图"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary">查看详情</Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-base">
                    3D模型资源标题 {item}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    这是一段资源描述，介绍这个3D模型的主要特点和用途...
                  </p>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      1.2k
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      368
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      46
                    </span>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 最新资源 */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">最新资源</h2>
          <Button variant="ghost" asChild>
            <Link href="/list">查看更多</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[5, 6, 7, 8].map((item) => (
            <Card key={item} className="group overflow-hidden">
              <Link href={`/resource/${item}`}>
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image
                    src={`/placeholder${item}.jpg`}
                    alt="资源预览图"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary">查看详情</Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 text-base">
                    3D模型资源标题 {item}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    这是一段资源描述，介绍这个3D模型的主要特点和用途...
                  </p>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      892
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      245
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      32
                    </span>
                  </div>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 推荐教程 */}
      <section className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">推荐教程</h2>
          <Button variant="ghost" asChild>
            <Link href="/tutorials">查看更多</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="group">
              <Link href={`/tutorial/${item}`}>
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={`/tutorial${item}.jpg`}
                    alt="教程封面"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold mb-2">
                        Blender 基础教程 {item}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2">
                        学习 Blender 的基础操作和建模技巧，适合初学者...
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* 社区动态 */}
      <section className="container pb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">社区动态</h2>
          <Button variant="ghost" asChild>
            <Link href="/community">查看更多</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <Card key={item}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Image
                    src={`/avatar${item}.jpg`}
                    alt="用户头像"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">用户名称 {item}</p>
                    <p className="text-sm text-muted-foreground">2小时前</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">
                  这是一段社区动态内容，分享了一些创作经验和心得...
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Image
                    src={`/community${item}-1.jpg`}
                    alt="社区图片"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                  <Image
                    src={`/community${item}-2.jpg`}
                    alt="社区图片"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    128
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    36
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
} 