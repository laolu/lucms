import { Separator } from "@/components/ui/separator"

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-6 md:py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">隐私政策</h1>
        <p className="text-muted-foreground">最后更新：{new Date().toLocaleDateString()}</p>
      </div>
      <Separator className="my-6" />
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          感谢您使用我们的服务。本隐私政策旨在帮助您了解我们如何收集、使用和保护您的个人信息。
        </p>

        <h2>信息收集</h2>
        <p>我们收集的信息包括但不限于：</p>
        <ul>
          <li>基本账户信息（如用户名、电子邮件地址）</li>
          <li>个人资料信息（如头像、简介）</li>
          <li>使用服务时产生的信息（如浏览记录、搜索历史）</li>
          <li>设备信息（如IP地址、浏览器类型）</li>
        </ul>

        <h2>信息使用</h2>
        <p>我们使用收集的信息用于：</p>
        <ul>
          <li>提供、维护和改进我们的服务</li>
          <li>处理您的请求和订单</li>
          <li>发送服务通知和更新</li>
          <li>防止欺诈和滥用</li>
        </ul>

        <h2>信息共享</h2>
        <p>我们不会出售您的个人信息。仅在以下情况下可能会共享您的信息：</p>
        <ul>
          <li>经您明确同意</li>
          <li>遵守法律要求</li>
          <li>保护我们的权利和财产</li>
        </ul>

        <h2>信息安全</h2>
        <p>
          我们采取适当的技术和组织措施来保护您的个人信息免受未经授权的访问、使用或披露。
          这些措施包括：
        </p>
        <ul>
          <li>使用加密技术保护数据传输</li>
          <li>限制员工访问个人信息</li>
          <li>定期安全评估和更新</li>
        </ul>

        <h2>您的权利</h2>
        <p>您对您的个人信息拥有以下权利：</p>
        <ul>
          <li>访问您的个人信息</li>
          <li>更正不准确的信息</li>
          <li>要求删除您的信息</li>
          <li>反对或限制信息处理</li>
        </ul>

        <h2>Cookie 使用</h2>
        <p>
          我们使用 Cookie 和类似技术来提供和改进我们的服务。您可以通过浏���器设置控制 Cookie 的使用。
        </p>

        <h2>隐私政策更新</h2>
        <p>
          我们可能会不时更新本隐私政策。当我们进行重大更改时，我们会通过适当方式通知您，
          例如在我们的网站上发布通知或向您发送电子邮件。
        </p>

        <h2>联系我们</h2>
        <p>
          如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：
        </p>
        <ul>
          <li>电子邮件：privacy@example.com</li>
          <li>电话：400-123-4567</li>
          <li>地址：某某市某某区某某街道123号</li>
        </ul>
      </div>
    </div>
  )
} 