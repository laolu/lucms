import { Separator } from "@/components/ui/separator"

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-6 md:py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">服务条款</h1>
        <p className="text-muted-foreground">最后更新：{new Date().toLocaleDateString()}</p>
      </div>
      <Separator className="my-6" />
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p>
          欢迎使用我们的服务。请仔细阅读以下条款和条件，它们规定了您使用我们服务的规则和限制。
        </p>

        <h2>接受条款</h2>
        <p>
          通过访问或使用我们的服务，您同意受这些条款的约束。如果您不同意这些条款的任何部分，
          请不要使用我们的服务。
        </p>

        <h2>服务说明</h2>
        <p>我们提供的服务包括：</p>
        <ul>
          <li>在线内容浏览和下载</li>
          <li>用户账户管理</li>
          <li>社区互动功能</li>
          <li>其他相关服务</li>
        </ul>

        <h2>用户账户</h2>
        <p>关于用户账户，您同意：</p>
        <ul>
          <li>提供准确、完整的注册信息</li>
          <li>维护账户安全，对账户活动负责</li>
          <li>不与他人共享账户</li>
          <li>及时更新账户信息</li>
        </ul>

        <h2>用户行为规范</h2>
        <p>使用我们的服务时，您不得：</p>
        <ul>
          <li>违反任何法律法规</li>
          <li>侵犯他人知识产权</li>
          <li>发布垃圾信息或恶意内容</li>
          <li>干扰服务的正常运行</li>
          <li>未经授权访问他人账户</li>
        </ul>

        <h2>知识产权</h2>
        <p>
          服务中的所有内容，包括但不限于文本、图片、视频、软件、商标等，
          均为我们或我们的许可方所有。未经授权，您不得：
        </p>
        <ul>
          <li>复制或分发网站内容</li>
          <li>修改或创建衍生作品</li>
          <li>用于商业目的</li>
        </ul>

        <h2>服务变更和终止</h2>
        <p>我们保留以下权利：</p>
        <ul>
          <li>随时修改或终止服务</li>
          <li>更改服务费用（如适用）</li>
          <li>限制或终止用户访问</li>
        </ul>

        <h2>免责声明</h2>
        <p>
          我们的服务按"现状"提供，不提供任何明示或暗示的保证。
          我们不对服务的中断或错误负责，也不对用户因使用服务而造成的损失承担责任。
        </p>

        <h2>责任限制</h2>
        <p>
          在法律允许的最大范围内，我们对任何直接、间接、附带、特殊、惩罚性或后果性损害不承担责任。
        </p>

        <h2>条款修改</h2>
        <p>
          我们可能会不时修改这些条款。修改后的条款将在网站上公布，
          继续使用我们的服务即表示您接受修改后的条款。
        </p>

        <h2>适用法律</h2>
        <p>
          这些条款受中华人民共和国法律管辖。任何争议应通过友好协商解决，
          如协商不成，应提交至有管辖权的人民法院。
        </p>

        <h2>联系我们</h2>
        <p>
          如果您对这些条款有任何疑问，请联系我们：
        </p>
        <ul>
          <li>电子邮件：terms@example.com</li>
          <li>电话：400-123-4567</li>
          <li>地址：某某市某某区某某街道123号</li>
        </ul>
      </div>
    </div>
  )
} 