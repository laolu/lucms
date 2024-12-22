'use client'

import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

// 菜单结构配置
const menuStructure = {
  'admin': {
    label: '控制台',
    children: {
      'dashboard': {
        label: '仪表盘',
        parent: 'admin'
      },
      'advertisements': {
        label: '广告管理',
        parent: 'admin',
        group: '运营管理'
      },
      'orders': {
        label: '订单管理',
        parent: 'admin',
        group: '运营管理'
      },
      'menus': {
        label: '菜单管理',
        parent: 'admin',
        group: '运营管理'
      },
      'articles': {
        label: '文章管理',
        parent: 'admin',
        group: '运营管理'
      },
      'friend-links': {
        label: '友情链接',
        parent: 'admin',
        group: '运营管理'
      },
      'content-categories': {
        label: '内容分类',
        parent: 'admin',
        group: '内容管理'
      },
      'contents': {
        label: '内容列表',
        parent: 'admin',
        group: '内容管理'
      },
      'users': {
        label: '会员列表',
        parent: 'admin',
        group: '会员管理'
      },
      'vip-levels': {
        label: '会员等级',
        parent: 'admin',
        group: '会员管理'
      },
      'content-models': {
        label: '模型列表',
        parent: 'admin',
        group: '模型管理'
      },
      'content-attributes': {
        label: '属性管理',
        parent: 'admin',
        group: '模型管理'
      },
      'settings': {
        label: '系统设置',
        parent: 'admin',
        children: {
          'basic': {
            label: '基础设置',
            parent: 'settings'
          },
          'email': {
            label: '邮件设置',
            parent: 'settings'
          },
          'storage': {
            label: '存储设置',
            parent: 'settings'
          },
          'sms': {
            label: '短信设置',
            parent: 'settings'
          },
          'payment': {
            label: '支付设置',
            parent: 'settings'
          },
          'oauth': {
            label: '第三方登录',
            parent: 'settings'
          }
        }
      }
    }
  }
}

// 操作类型配置
const actionMap: { [key: string]: string } = {
  'create': '创建',
  'edit': '编辑',
  'new': '新建',
  'view': '查看',
  'delete': '删除',
  'list': '列表',
  'detail': '详情'
}

export function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  // 生成面包屑项
  const breadcrumbs = paths.reduce<Array<{ label: string, group?: string }>>((items, path, index) => {
    // 跳过 admin 路径
    if (path === 'admin') {
      return items
    }
    
    // 检查是否是动态路由参数
    if (path.startsWith('[') && path.endsWith(']')) {
      return items
    }
    
    // 检查是否是操作类型
    if (actionMap[path]) {
      items.push({ label: actionMap[path] })
      return items
    }
    
    // 递归查找菜单项
    const findMenuItem = (structure: any, searchPath: string): any => {
      if (structure[searchPath]) {
        return structure[searchPath]
      }
      
      for (const key in structure) {
        const item = structure[key]
        if (item.children) {
          const found = findMenuItem(item.children, searchPath)
          if (found) return found
        }
      }
      
      return null
    }
    
    const menuItem = findMenuItem(menuStructure, path)
    if (menuItem) {
      // 如果有分组，先添加分组
      if (menuItem.group && !items.find(item => item.label === menuItem.group)) {
        items.push({ label: menuItem.group })
      }
      items.push({ label: menuItem.label })
    }
    
    return items
  }, [])

  return (
    <div className="flex items-center text-sm">
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="mx-2 w-4 h-4 text-gray-500" />
          )}
          <span className={`${index === breadcrumbs.length - 1 ? 'text-gray-900' : 'text-gray-500'}`}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
} 