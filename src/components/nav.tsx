"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, Crown, User } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import styles from "./nav.module.css"

const industries = [
  { id: 'game', name: '游戏美术', active: true },
  { id: 'animation', name: '电影动画' },
  { id: 'engine', name: '游戏引擎' },
  { id: 'concept', name: '概念设计' },
  { id: 'video', name: '影视后期' },
  { id: 'architecture', name: '环艺建筑' },
  { id: 'graphic', name: '平面设计' },
  { id: 'photo', name: '摄影摄像' },
]

const skills = [
  { id: 'modeling', name: '建模雕刻' },
  { id: 'texturing', name: '贴图绘制' },
  { id: 'material', name: '材质纹理' },
  { id: 'vfx', name: '游戏特效' },
  { id: 'animation', name: '游戏动画' },
  { id: 'scene', name: '游戏场景' },
  { id: 'character', name: '游戏角色' },
  { id: 'lighting', name: '布光设置' },
]

const software = [
  { id: 'ue', name: 'Unreal Engine', icon: '/demo/icons/ue.png' },
  { id: 'maya', name: 'Maya', icon: '/demo/icons/maya.png' },
  { id: 'zbrush', name: 'Zbrush', icon: '/demo/icons/zbrush.png' },
  { id: 'unity', name: 'Unity3D', icon: '/demo/icons/unity.png' },
  { id: 'sp', name: 'SP', icon: '/demo/icons/sp.png' },
  { id: 'sd', name: 'SD', icon: '/demo/icons/sd.png' },
  { id: 'marmoset', name: 'Marmoset', icon: '/demo/icons/marmoset.png' },
]

const learningPaths = [
  [
    '建模能力从入门到精通',
    '贴图能力从入门到精通',
    '虚幻引擎快速入门掌握',
    'zbrush雕刻能力提升',
  ],
  [
    '影视角色制作全流程',
    '动漫手办制作全流程',
    '游戏角色制作全流程',
    '技术美术能力专项学习',
  ],
  [
    '虚幻引擎进阶能力学习',
    '动画绑定技术专享学习',
    'Unity3d项目开发实践',
    '建筑景观专项学习',
  ],
]

const banners = {
  small: [
    '/demo/nav-banner-1.jpg',
    '/demo/nav-banner-2.jpg',
    '/demo/nav-banner-3.jpg',
  ],
  long: '/demo/nav-banner-long.jpg',
}

export function MainNav() {
  const pathname = usePathname()
  const menuLinkStyle = "inline-flex items-center justify-center h-[70px] px-6 text-base font-medium transition-colors hover:text-primary data-[active=true]:text-primary"

  // 模拟用户登录状态
  const isLoggedIn = true // 这里应该从实际的用户状态管理中获取

  return (
    <NavigationMenu className="mx-0">
      <NavigationMenuList className="gap-0">
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink 
              className={menuLinkStyle}
              data-active={pathname === "/"}
            >
              首页
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(menuLinkStyle, "bg-transparent hover:bg-transparent data-[state=open]:bg-transparent")}>
            资源
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className={styles.navContent}>
              <div className={styles.filterSection}>
                <div className={styles.filterColumn}>
                  <div className={styles.filterTitle}>行业</div>
                  <div className={styles.filterCells}>
                    {industries.map(industry => (
                      <div
                        key={industry.id}
                        className={cn(styles.filterCell, {
                          [styles.active]: industry.active
                        })}
                      >
                        <span>{industry.name}</span>
                        <ChevronRight className={cn("h-4 w-4", styles.filterCellArrow)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.filterColumn}>
                  <div className={styles.filterTitle}>技能</div>
                  <div className={styles.filterCells}>
                    {skills.map(skill => (
                      <div key={skill.id} className={styles.filterCell}>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.filterColumn}>
                  <div className={styles.filterTitle}>软件</div>
                  <div className={styles.filterCells}>
                    {software.map(sw => (
                      <div key={sw.id} className={styles.filterCell}>
                        <Image
                          src={sw.icon}
                          alt={sw.name}
                          width={20}
                          height={20}
                          className={styles.filterCellIcon}
                        />
                        <span>{sw.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.textColumns}>
                {learningPaths.map((column, i) => (
                  <div key={i} className={styles.textColumn}>
                    {column.map((text, j) => (
                      <div key={j} className={styles.textCell}>
                        {text}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className={styles.bannerSection}>
                <div className={styles.smallBanners}>
                  {banners.small.map((banner, i) => (
                    <div key={i} className={styles.smallBanner}>
                      <Image
                        src={banner}
                        alt="Banner"
                        width={160}
                        height={80}
                        className={styles.bannerImage}
                      />
                    </div>
                  ))}
                </div>
                <div className={styles.longBanner}>
                  <Image
                    src={banners.long}
                    alt="Banner"
                    width={459}
                    height={80}
                    className={styles.bannerImage}
                  />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/list" legacyBehavior passHref>
            <NavigationMenuLink 
              className={menuLinkStyle}
              data-active={pathname === "/list"}
            >
              列表
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/superVip" legacyBehavior passHref>
            <NavigationMenuLink 
              className={menuLinkStyle}
              data-active={pathname === "/superVip"}
            >
              <Crown className="mr-1 w-4 h-4" />
              超级会员
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
} 