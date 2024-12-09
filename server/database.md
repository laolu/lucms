# CMS系统数据库设计文档

## 用户相关表

### users (用户表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| id | int | 用户ID | 主键, 自增 |
| username | varchar(255) | 用户名 | 唯一 |
| email | varchar(255) | 电子邮箱 | 唯一 |
| phone | varchar(20) | 手机号码 | 唯一, 可空 |
| password | varchar(255) | 加密后的密码 | 非空 |
| role | enum | 用户角色(admin/user) | 默认'user' |
| status | enum | 账号状态(active/inactive) | 默认'active' |
| email_verified | boolean | 邮箱是否验证 | 默认false |
| phone_verified | boolean | 手机是否验证 | 默认false |
| verification_token | varchar(255) | 验证令牌 | 可空 |
| reset_token | varchar(255) | 重置密码令牌 | 可空 |
| reset_token_expires | datetime | 重置令牌过期时间 | 可空 |
| created_at | datetime | 创建时间 | 自动生成 |
| updated_at | datetime | 更新时间 | 自动更新 |

## 内容相关表

### content_categories (内容分类表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| id | int | 分类ID | 主键, 自增 |
| name | varchar(255) | 分类名称 | 非空 |
| slug | varchar(255) | URL友好的名称 | 唯一 |
| description | text | 分类描述 | 可空 |
| parent_id | int | 父分类ID | 外键, 可空 |
| is_active | boolean | 是否激活 | 默认true |
| sort | int | 排序值 | 默认0 |
| created_at | datetime | 创建时间 | 自动生成 |
| updated_at | datetime | 更新时间 | 自动更新 |

### contents (内容表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| id | int | 内容ID | 主键, 自增 |
| title | varchar(255) | 内容标题 | 非空 |
| description | text | 内容描述 | 非空 |
| type | enum | 内容类型(free/paid/member) | 默认'free' |
| format | enum | 内容格式(document/video) | 默认'document' |
| price | decimal(10,2) | 价格 | 可空 |
| discount_price | decimal(10,2) | 折扣价 | 可空 |
| file_path | varchar(255) | 文件路径 | 非空 |
| downloads | int | 下载次数 | 默认0 |
| views | int | 查看次数 | 默认0 |
| author_id | int | 作者ID | 外键(users) |
| category_id | int | 分类ID | 外键(content_categories) |
| created_at | datetime | 创建时间 | 自动生成 |
| updated_at | datetime | 更新时间 | 自动更新 |

### content_attributes (内容属性表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| id | int | 属性ID | 主键, 自增 |
| name | varchar(255) | 属性名称 | 非空 |
| type | varchar(50) | 属性类型 | 非空 |
| options | json | 属性选项 | 可空 |
| is_required | boolean | 是否必填 | 默认false |
| is_filterable | boolean | 是否可筛选 | 默认false |
| created_at | datetime | 创建时间 | 自动生成 |
| updated_at | datetime | 更新时间 | 自动更新 |

### content_attribute_relations (内容-属性关联表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| content_id | int | 内容ID | 外键(contents) |
| attribute_id | int | 属性ID | 外键(content_attributes) |
| value | text | 属性值 | 可空 |

### content_category_attributes (分类-属性关联表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| category_id | int | 分类ID | 外键(content_categories) |
| attribute_id | int | 属性ID | 外键(content_attributes) |

### content_comments (内容评论表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| id | int | 评论ID | 主键, 自增 |
| comment_content | text | 评论内容 | 非空 |
| content_id | int | 内容ID | 外键(contents) |
| user_id | int | 用户ID | 外键(users) |
| parent_id | int | 父评论ID | 外键(self), 可空 |
| likes | int | 点赞数 | 默认0 |
| is_active | boolean | 是否激活 | 默认true |
| created_at | datetime | 创建时间 | 自动生成 |
| updated_at | datetime | 更新时间 | 自动更新 |

## SEO相关表

### seo (SEO信息表)
| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| id | int | SEO ID | 主键, 自增 |
| title | varchar(255) | SEO标题 | 可空 |
| description | text | SEO描述 | 可空 |
| keywords | varchar(255) | SEO关键词 | 可空 |
| og_title | varchar(255) | Open Graph标题 | 可空 |
| og_description | text | Open Graph描述 | 可空 |
| og_image | varchar(255) | Open Graph图片 | 可空 |
| created_at | datetime | 创建时间 | 自动生成 |
| updated_at | datetime | 更新时间 | 自动更新 |

## 关系说明

1. `content_categories` 表通过 `parent_id` 实现自引用的树形结构
2. `contents` 表与 `users` 表通过 `author_id` 建立多对一关系
3. `contents` 表与 `content_categories` 表通过 `category_id` 建立多对一关系
4. `contents` 表与 `content_attributes` 表通过 `content_attribute_relations` 建立多对多关系
5. `content_categories` 表与 `content_attributes` 表通过 `content_category_attributes` 建立多对多关系
6. `content_comments` 表通过 `parent_id` 实现自引用的树形结构，支持多级评论
7. 所有实体表都包含 `created_at` 和 `updated_at` 用于记录创建和更新时间
8. SEO信息可以关联到内容和分类等多个实体

## 索引说明

1. 所有主键字段自动创建主键索引
2. 所有外键字段自动创建索引
3. 用户表的 `username`, `email`, `phone` 字段创建唯一索引
4. 分类表的 `slug` 字段创建唯一索引
5. 内容表的 `title` 字段创建普通索引用于搜索
6. 评论表的 `content_id` 和 `user_id` 字段创建组合索引

## 注意事项

1. 所有时间字段使用 UTC 时间存储
2. 密码字段存储前需要进行加密
3. 金额字段使用 decimal 类型确保精确计算
4. 文本字段使用 utf8mb4 字符集支持完整的 Unicode 字符
5. 所有可能用于搜索的字段建议创建适当的索引
6. 树形结构的深度应该有合理限制
7. 评论内容建议进行XSS过滤 