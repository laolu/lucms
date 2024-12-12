import { Crown, Check, Star, Users, Clock, Calendar } from "lucide-react"
import styles from "./superVip.module.css"

export default function SuperVipPage() {
  const benefits = [
    {
      icon: <Crown className="w-6 h-6" />,
      title: "全站课程免费学习",
      description: "所有付费课程全部免费观看，包含新上架课程"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "独家会员专属课程",
      description: "独家定制高端课程，VIP会员专享内容"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "大师在线指导",
      description: "行业大师一对一在线指导，答疑解惑"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "终身学习权益",
      description: "一次开通，终身受益，永久观看权限"
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <Crown className="w-8 h-8 inline-block mr-2" />
            超级会员
          </h1>
          <p className={styles.subtitle}>解锁全站资源，加速你的学习进程</p>
          <div className={styles.price}>
            <div className={styles.priceBox}>
              <span className={styles.currency}>¥</span>
              <span className={styles.amount}>1999</span>
              <span className={styles.unit}>/年</span>
            </div>
            <div className={styles.originalPrice}>原价: ¥3999</div>
          </div>
          <button className={styles.joinButton}>立即开通</button>
        </div>
      </div>

      <div className={styles.benefits}>
        <h2 className={styles.sectionTitle}>会员权益</h2>
        <div className={styles.benefitsList}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitCard}>
              <div className={styles.benefitIcon}>{benefit.icon}</div>
              <h3 className={styles.benefitTitle}>{benefit.title}</h3>
              <p className={styles.benefitDesc}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.features}>
        <h2 className={styles.sectionTitle}>为什么选择我们</h2>
        <div className={styles.featuresList}>
          <div className={styles.feature}>
            <Check className="w-5 h-5" />
            <span>3000+ 精品课程</span>
          </div>
          <div className={styles.feature}>
            <Check className="w-5 h-5" />
            <span>100+ 行业大师</span>
          </div>
          <div className={styles.feature}>
            <Check className="w-5 h-5" />
            <span>24小时技术支持</span>
          </div>
          <div className={styles.feature}>
            <Check className="w-5 h-5" />
            <span>终身学习权益</span>
          </div>
        </div>
      </div>
    </div>
  )
} 