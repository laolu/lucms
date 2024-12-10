import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

const items = [
  {
    id: 1,
    image: "/sub-banner1.jpg",
    link: "/course/1",
    alt: "3D建模基础"
  },
  {
    id: 2,
    image: "/sub-banner2.jpg",
    link: "/course/2",
    alt: "材质渲染"
  },
  {
    id: 3,
    image: "/sub-banner3.jpg",
    link: "/course/3",
    alt: "动画制作"
  },
  {
    id: 4,
    image: "/sub-banner4.jpg",
    link: "/course/4",
    alt: "场景设计"
  }
]

export function SubBanner() {
  return (
    <div className="flex justify-between items-start mb-8">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className="sub-banner-cell hover:translate-y-[-4px] transition-transform duration-300"
        >
          <span className="block relative w-[285px] h-[160px] overflow-hidden rounded">
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="285px"
            />
          </span>
        </Link>
      ))}
    </div>
  )
} 