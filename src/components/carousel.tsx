"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import styles from "./carousel.module.css"

const defaultSlides = [
  {
    id: 1,
    image: "/demo/banner1.png",
    title: "法常次世代与影视角色提高班第五期",
    description: "掌握次世代角色制作流程，打造高品质作品集",
    link: "/course/40644",
  },
  {
    id: 2,
    image: "/demo/banner2.png",
    title: "次次先生零基础虚幻引擎5三渲二技术专项特训班",
    description: "从零开始学习UE5引擎，掌握三渲二技术要点",
    link: "/course/12345",
  },
  {
    id: 3,
    image: "/demo/banner3.png",
    title: "黑鸟云端PCG程序化生成实战高级进阶班",
    description: "深入学习UE5程序化生成技术，提升场景制作效率",
    link: "/course/82481",
  },
]

export function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ 
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true
    })
  )

  return (
    <div className={styles.content}>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {defaultSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <Link href={slide.link} style={{ display: 'block', height: '100%' }}>
                <div className={styles.image}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={styles.prev} variant="outline" size="icon" />
        <CarouselNext className={styles.next} variant="outline" size="icon" />
      </Carousel>
    </div>
  )
} 