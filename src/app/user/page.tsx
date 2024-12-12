import { Crown, Clock, Star, Book, Settings, CreditCard } from "lucide-react"
import styles from "./user.module.css"

export default function UserPage() {
  // 模拟用户数据
  const userData = {
    name: "张三",
    avatar: "/demo/avatar1.png",
    vipLevel: "超级会员",
    vipExpiry: "2024-12-31",
    learningTime: "120小时",
    coursesCount: 24,
    collectionCount: 36
  }

  const menuItems = [
    {
      icon: <Book className="w-5 h-5" />,
      title: "我的课程",
      count: userData.coursesCount,
      link: "/user/courses"
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "我的收藏",
      count: userData.collectionCount,
      link: "/user/collections"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "学习记录",
      desc: userData.learningTime,
      link: "/user/learning"
    },
    {
      icon: <Crown className="w-5 h-5" />,
      title: "会员信息",
      desc: userData.vipLevel,
      link: "/user/vip"
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "订单记录",
      link: "/user/orders"
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: "账号设置",
      link: "/user/settings"
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img src={userData.avatar} alt={userData.name} className={styles.avatar} />
          <div className={styles.userMeta}>
            <h1 className={styles.userName}>{userData.name}</h1>
            <div className={styles.vipInfo}>
              <Crown className="w-4 h-4" />
              <span>{userData.vipLevel}</span>
              <span className={styles.vipExpiry}>有效期至 {userData.vipExpiry}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <a key={index} href={item.link} className={styles.menuCard}>
              <div className={styles.menuIcon}>{item.icon}</div>
              <div className={styles.menuInfo}>
                <div className={styles.menuTitle}>{item.title}</div>
                {item.count && <div className={styles.menuCount}>{item.count}</div>}
                {item.desc && <div className={styles.menuDesc}>{item.desc}</div>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
} 