import Image from 'next/image'
import Link from 'next/link'
import styles from './sub-banner.module.css'

const items = [
  {
    id: 1,
    image: "/demo/sub-banner1.png",
    link: "/course/1",
    alt: "3D建模基础"
  },
  {
    id: 2,
    image: "/demo/sub-banner2.png",
    link: "/course/2",
    alt: "材质渲染"
  },
  {
    id: 3,
    image: "/demo/sub-banner3.png",
    link: "/course/3",
    alt: "动画制作"
  },
  {
    id: 4,
    image: "/demo/sub-banner4.png",
    link: "/course/4",
    alt: "场景设计"
  }
]

export function SubBanner() {
  return (
    <div className={styles.subBannerContainer}>
      {items.map(item => (
        <Link 
          key={item.id}
          href={item.link}
          className={styles.subBannerCell}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={item.image}
              alt={item.alt}
              fill
              priority
              quality={85}
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
        </Link>
      ))}
    </div>
  )
} 