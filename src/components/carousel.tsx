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

const slides = [
  {
    id: 1,
    image: "/banner1.jpg",
    title: "精品3D模型资源",
    description: "高质量的3D模型素材，助力您的创作",
    link: "/list",
  },
  {
    id: 2,
    image: "/banner2.jpg",
    title: "专业教程系列",
    description: "从入门到精通的完整学习路径",
    link: "/tutorials",
  },
  {
    id: 3,
    image: "/banner3.jpg",
    title: "活跃的创作社区",
    description: "分享创作，交流经验",
    link: "/community",
  },
]

export function HomeCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="carousel-content">
        {slides.map((slide) => (
          <CarouselItem key={slide.id} className="carousel-item">
            <div className="carousel-image">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="carousel-overlay">
              <div className="carousel-content-wrap">
                <div className="carousel-text">
                  <h2 className="carousel-title">
                    {slide.title}
                  </h2>
                  <p className="carousel-description">{slide.description}</p>
                  <Button asChild className="carousel-button">
                    <Link href={slide.link}>立即查看</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="carousel-nav carousel-prev" />
      <CarouselNext className="carousel-nav carousel-next" />
    </Carousel>
  )
} 