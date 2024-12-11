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
import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"
import styles from "./carousel.module.css"

interface HomeCarouselProps {
  images?: string[]
}

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

export function HomeCarousel({ images }: HomeCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  )

  const slides = images ? images.map((image, index) => ({
    id: index + 1,
    image,
    title: "",
    description: "",
    link: "#"
  })) : defaultSlides

  return (
    <div className={styles.carousel}>
      <Carousel
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className={styles.carouselContent}>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative">
              <div className={styles.carouselImage}>
                <Image
                  src={slide.image}
                  alt={slide.title || "Banner"}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className={styles.carouselOverlay} />
              {slide.title && (
                <div className={styles.carouselContentWrap}>
                  <div className={styles.carouselText}>
                    <h2 className={styles.carouselTitle}>{slide.title}</h2>
                    <p className={styles.carouselDescription}>{slide.description}</p>
                    <Button asChild className={styles.carouselButton}>
                      <Link href={slide.link}>立即查看</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className={styles.carouselPrev}
          variant="outline"
          size="icon"
        />
        <CarouselNext 
          className={styles.carouselNext}
          variant="outline"
          size="icon"
        />
      </Carousel>
    </div>
  )
} 