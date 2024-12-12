"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Download, Eye, Clock, Star, Shield, Gift, FileText, Coffee, Zap, MessageCircle, Crown, CheckCircle2, AlertCircle, Calendar, User, Book, Bookmark, Share2, ArrowRight } from "lucide-react"
import styles from './detail.module.css'

// 扩展详情数据
const detailData = {
  id: 1,
  title: "WordPress资源主题 RiPro V6.6.0 日主题破解版下载",
  cover: "/demo/cover1.jpg",
  stats: {
    views: 2341,
    downloads: 1280,
    rating: 4.8,
    ratingCount: 235,
    updateTime: "2024-01-10",
    likes: 856
  },
  author: {
    name: "设计师张三",
    avatar: "/demo/avatar.jpg",
    title: "高级UI设计师",
    description: "8年设计经验，专注于主题开发",
  },
  price: 29,
  originalPrice: 399,
  vipPrice: 0,
  tags: ["WordPress", "主题模板", "资源下载", "破解版", "响应式", "高级版本"],
  categories: ["主题模板", "建站资源", "精品推荐"],
  description: "RiPro是一个优秀的资源下载付费主题，后台功能强大，配置简单方便，适合各类资源下载站使用。本站提供RiPro主题v6.6.0破解版下载，完整无限制使用。主题采用响应式设计，完美支持PC端和移动端，界面清新简洁，功能强大实用。",
  highlights: [
    "完整商用授权，无需额外付费",
    "终身更新支持，及时修复问题",
    "详细安装文档，专业技术支持",
    "免费提供服务器环境配置指导"
  ],
  features: [
    {
      icon: <Gift className="w-5 h-5" />,
      title: "正版授权",
      description: "官方正版主题授权，可用于商业项目"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: "完整代码",
      description: "无加密无限制使用，支持二次开发"
    },
    {
      icon: <Coffee className="w-5 h-5" />,
      title: "免费更新",
      description: "永久更新无需续费，及时修复问题"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "技术支持",
      description: "一对一解答服务，专业技术指导"
    }
  ],
  screenshots: [
    {
      url: "/demo/shot1.jpg",
      title: "首页完整展示"
    },
    {
      url: "/demo/shot2.jpg", 
      title: "资源列表页面"
    },
    {
      url: "/demo/shot3.jpg",
      title: "会员中心界面"
    },
    {
      url: "/demo/shot4.jpg",
      title: "后台管理设置"
    }
  ],
  details: [
    {
      title: "资源信息",
      items: [
        { label: "资源版本", value: "V6.6.0" },
        { label: "更新时间", value: "2024-01-10" },
        { label: "资源大小", value: "28.5MB" },
        { label: "适用版本", value: "WordPress 5.0+" },
        { label: "浏览器支持", value: "主流浏览器" },
        { label: "资源语言", value: "中文简体" },
        { label: "资源类型", value: "破解版" },
        { label: "下载次数", value: "1280次" }
      ]
    },
    {
      title: "功能特点",
      content: [
        "✓ 完整的付费下载功能，支持多种支付接口",
        "✓ 会员系统功能，支持多等级会员制度",
        "✓ 响应式自适应设计，完美支持移动端",
        "✓ SEO优化及性能优化，提升网站速度",
        "✓ 强大的后台管理功能，操作简单直观",
        "✓ 自定义模板及样式，支持个性化定制",
        "✓ 集成多种广告位，提升网站收益",
        "✓ 数据统计分析，掌握运营情况"
      ]
    },
    {
      title: "更新日志",
      content: [
        "2024-01-10 V6.6.0",
        "- 全新会员系统，支持积分和等级",
        "- 优化支付接口，提升支付成功率",
        "- 新增自定义模板功能，支持个性化",
        "- 优化移动端显示效果，提升体验",
        "2023-12-15 V6.5.9",
        "- 修复已知安全问题，提升安全性",
        "- 优化后台管理界面，更加直观",
        "- 新增数据统计功能，支持导出"
      ]
    }
  ],
  requirements: [
    "PHP 7.0 或更高版本",
    "MySQL 5.6 或更高版本",
    "WordPress 5.0+ 最新版",
    "支持伪静态的服务器环境"
  ],
  installation: [
    "1. 上传主题文件到 wp-content/themes 目录",
    "2. 在后台启用主题并进行基本设置",
    "3. 配置支付接口和会员等级",
    "4. 添加资源内容并设置价格"
  ],
  downloads: {
    free: {
      name: "免费版本",
      links: [
        {
          name: "百度网盘",
          url: "https://pan.baidu.com/xxx",
          code: "ab1x"
        },
        {
          name: "天翼云盘",
          url: "https://cloud.189.cn/xxx",
          code: "cd2y"
        }
      ]
    },
    vip: {
      name: "VIP高速下载",
      links: [
        {
          name: "服务器直链",
          url: "https://download.xxx.com/xxx",
          speed: "不限速"
        },
        {
          name: "国外节点",
          url: "https://cdn.xxx.com/xxx",
          speed: "不限速"
        }
      ]
    }
  },
  relatedResources: [
    {
      id: 2,
      title: "RiPro子主题开发教程",
      cover: "/demo/related1.jpg",
      price: 19
    },
    {
      id: 3,
      title: "WordPress优化指南",
      cover: "/demo/related2.jpg",
      price: 29
    },
    {
      id: 4,
      title: "主题定制服务",
      cover: "/demo/related3.jpg",
      price: 99
    }
  ]
}

export default function DetailPage({ params }: { params: { id: string } }) {
  const [isLiked, setIsLiked] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState(0)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerPattern} />
      </div>
      
      <div className={styles.container}>
        {/* 面包屑导航 */}
        <nav className={styles.breadcrumb}>
          <Link href="/">首页</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/list">资源下载</Link>
          <ChevronRight className="w-4 h-4" />
          <span>{detailData.title}</span>
        </nav>

        <div className={styles.content}>
          {/* 左侧内容区 */}
          <div className={styles.mainContent}>
            {/* 主图预览 */}
            <div className={styles.previewSection}>
              <Image
                src={detailData.screenshots[selectedImage].url}
                alt={detailData.screenshots[selectedImage].title}
                fill
                className={styles.previewImage}
              />
              <div className={styles.previewTitle}>
                {detailData.screenshots[selectedImage].title}
              </div>
            </div>

            {/* 缩略图预览 */}
            <div className={styles.thumbnails}>
              {detailData.screenshots.map((shot, index) => (
                <div 
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={shot.url}
                    alt={shot.title}
                    fill
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
            </div>

            {/* 基本信息 */}
            <div className={styles.infoSection}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{detailData.title}</h1>
                <button 
                  className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`${styles.likeIcon} ${isLiked ? 'fill-current' : ''}`} />
                  <span>{detailData.stats.likes}</span>
                </button>
              </div>

              <div className={styles.categories}>
                {detailData.categories.map((category, index) => (
                  <Link key={index} href={`/category/${category}`} className={styles.category}>
                    {category}
                  </Link>
                ))}
              </div>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <Eye className={styles.metaIcon} />
                  <span>{detailData.stats.views} 浏览</span>
                </div>
                <div className={styles.metaItem}>
                  <Download className={styles.metaIcon} />
                  <span>{detailData.stats.downloads} 下载</span>
                </div>
                <div className={styles.metaItem}>
                  <Star className={`${styles.metaIcon} text-yellow-400`} />
                  <span>{detailData.stats.rating} ({detailData.stats.ratingCount}人评分)</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock className={styles.metaIcon} />
                  <span>更新于 {detailData.stats.updateTime}</span>
                </div>
              </div>

              <div className={styles.tags}>
                {detailData.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* 作者信息 */}
              <div className={styles.author}>
                <Image
                  src={detailData.author.avatar}
                  alt={detailData.author.name}
                  width={48}
                  height={48}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>
                    {detailData.author.name}
                    <span className={styles.authorTitle}>{detailData.author.title}</span>
                  </div>
                  <div className={styles.authorDescription}>
                    {detailData.author.description}
                  </div>
                </div>
              </div>

              {/* 亮点功能 */}
              <div className={styles.highlights}>
                {detailData.highlights.map((highlight, index) => (
                  <div key={index} className={styles.highlightItem}>
                    <CheckCircle2 className={styles.highlightIcon} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 详细内容 */}
            <div className={styles.tabSection}>
              <div className={styles.tabs}>
                <div className={`${styles.tab} ${styles.active}`}>
                  资源详情
                </div>
                <div className={styles.tab}>
                  评论反馈
                </div>
              </div>

              <div className={styles.tabContent}>
                {/* 资源描述 */}
                <div className={styles.description}>
                  <h2 className={styles.sectionTitle}>资源介绍</h2>
                  <p>{detailData.description}</p>
                </div>

                {/* 功能特点 */}
                <div className={styles.features}>
                  {detailData.features.map((feature, index) => (
                    <div key={index} className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        {feature.icon}
                      </div>
                      <div className={styles.featureInfo}>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 系统要求 */}
                <div className={styles.requirements}>
                  <h2 className={styles.sectionTitle}>
                    <AlertCircle className={styles.sectionIcon} />
                    系统要求
                  </h2>
                  <div className={styles.requirementsList}>
                    {detailData.requirements.map((req, index) => (
                      <div key={index} className={styles.requirementItem}>
                        <ArrowRight className={styles.requirementIcon} />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 安装说明 */}
                <div className={styles.installation}>
                  <h2 className={styles.sectionTitle}>
                    <Book className={styles.sectionIcon} />
                    安装说明
                  </h2>
                  <div className={styles.installSteps}>
                    {detailData.installation.map((step, index) => (
                      <div key={index} className={styles.installStep}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 资源信息 */}
                {detailData.details.map((section, index) => (
                  <div key={index} className={styles.detailSection}>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    {'items' in section && section.items ? (
                      <div className={styles.infoGrid}>
                        {section.items.map((item, idx) => (
                          <div key={idx} className={styles.infoItem}>
                            <span className={styles.infoLabel}>{item.label}</span>
                            <span className={styles.infoValue}>{item.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className={styles.contentList}>
                        {section.content?.map((item, idx) => (
                          <div key={idx} className={styles.contentItem}>
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* 相关推荐 */}
                <div className={styles.related}>
                  <h2 className={styles.sectionTitle}>
                    <Bookmark className={styles.sectionIcon} />
                    相关推荐
                  </h2>
                  <div className={styles.relatedGrid}>
                    {detailData.relatedResources.map((resource, index) => (
                      <Link key={index} href={`/detail/${resource.id}`} className={styles.relatedCard}>
                        <div className={styles.relatedImage}>
                          <Image
                            src={resource.cover}
                            alt={resource.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className={styles.relatedInfo}>
                          <h3 className={styles.relatedTitle}>{resource.title}</h3>
                          <div className={styles.relatedPrice}>¥{resource.price}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧下载区 */}
          <div className={styles.sidebar}>
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceInfo}>
                  <span className={styles.currentPrice}>¥{detailData.price}</span>
                  {detailData.originalPrice && (
                    <span className={styles.originalPrice}>
                      ¥{detailData.originalPrice}
                    </span>
                  )}
                </div>
                <div className={styles.vipPrice}>
                  <span className={styles.vipTag}>
                    <Crown className={styles.vipIcon} />
                    VIP会员
                  </span>
                  <span>免费下载</span>
                </div>
              </div>

              <button className={styles.buyButton}>
                立即购买
              </button>
              <button className={styles.vipButton}>
                开通VIP会员
              </button>

              <div className={styles.guarantee}>
                <Shield className={styles.guaranteeIcon} />
                <span>担保交易 · 7天内可退款</span>
              </div>

              <div className={styles.shareSection}>
                <Share2 className={styles.shareIcon} />
                <span>分享资源</span>
              </div>
            </div>

            <div className={styles.downloadSection}>
              <h3 className={styles.downloadTitle}>免费下载地址</h3>
              <div className={styles.downloadLinks}>
                {detailData.downloads.free.links.map((link, index) => (
                  <div key={index} className={styles.downloadLink}>
                    <div className={styles.linkInfo}>
                      <span className={styles.linkName}>{link.name}</span>
                      <button className={styles.copyButton}>复制链接</button>
                    </div>
                    <div className={styles.linkCode}>
                      提取码：<span className={styles.codeValue}>{link.code}</span>
                      <button className={styles.copyButton}>复制</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.downloadSection}>
              <h3 className={styles.downloadTitle}>
                <Crown className={styles.vipIcon} />
                VIP专属下载
              </h3>
              <div className={styles.downloadLinks}>
                {detailData.downloads.vip.links.map((link, index) => (
                  <div key={index} className={styles.downloadLink}>
                    <div className={styles.linkInfo}>
                      <span className={styles.linkName}>{link.name}</span>
                      <span className={styles.speedTag}>{link.speed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.notice}>
              <h3 className={styles.noticeTitle}>温馨提示</h3>
              <ul className={styles.noticeList}>
                <li>本站所有资源均经过测试可用</li>
                <li>下载后请尽快保存，链接可能会失效</li>
                <li>如遇问题可在下方评论区留言</li>
                <li>VIP会员可享受专属下载加速</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 