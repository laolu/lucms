'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"
import { formatDate } from '@/lib/utils'
import { friendLinkService, type FriendLink } from '@/services/friend-link'

export default function FriendLinksPage() {
  const [links, setLinks] = React.useState<FriendLink[]>([])
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)
  const [selectedLink, setSelectedLink] = React.useState<FriendLink | null>(null)
  const [formData, setFormData] = React.useState<Partial<FriendLink>>({
    name: "",
    url: "",
    logo: "",
    description: "",
    sort: 0,
    visible: true
  })

  // 加载数据
  const loadData = async () => {
    try {
      const data = await friendLinkService.getAll()
      setLinks(data)
    } catch (error) {
      toast.error("加载数据失败")
    }
  }

  React.useEffect(() => {
    loadData()
  }, [])

  // 处理搜索
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 实现搜索逻辑
  }

  // 处理添加/编辑
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (selectedLink) {
        await friendLinkService.update(selectedLink.id, formData)
        toast.success("更新成功")
      } else {
        await friendLinkService.create(formData)
        toast.success("添加成功")
      }
      setIsEditDialogOpen(false)
      loadData()
    } catch (error) {
      toast.error(selectedLink ? "更新失败" : "添加失败")
    }
  }

  // 打开编辑对话框
  const handleEdit = (link: FriendLink) => {
    setSelectedLink(link)
    setFormData({
      name: link.name,
      url: link.url,
      logo: link.logo,
      description: link.description,
      sort: link.sort,
      visible: link.visible
    })
    setIsEditDialogOpen(true)
  }

  // 打开添加对话框
  const handleAdd = () => {
    setSelectedLink(null)
    setFormData({
      name: "",
      url: "",
      logo: "",
      description: "",
      sort: 0,
      visible: true
    })
    setIsEditDialogOpen(true)
  }

  // 处理删除
  const handleDelete = async () => {
    if (!selectedLink) return
    try {
      await friendLinkService.remove(selectedLink.id)
      toast.success("删除成功")
      setIsDeleteDialogOpen(false)
      loadData()
    } catch (error) {
      toast.error("删除失败")
    }
  }

  // 处理显示状态切换
  const handleToggleStatus = async (link: FriendLink) => {
    try {
      await friendLinkService.toggleVisible(link.id)
      toast.success("状态更��成功")
      loadData()
    } catch (error) {
      toast.error("状态更新失败")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">友情链接</h2>
        <div className="flex items-center space-x-4">
          <form className="flex space-x-2" onSubmit={handleSearch}>
            <Input
              placeholder="搜索链接..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            新增
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>名称</TableHead>
              <TableHead>链接</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>排序</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>创建时间</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    {link.logo && (
                      <img src={link.logo} alt={link.name} className="h-6 w-6 rounded" />
                    )}
                    <span>{link.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {link.url}
                  </a>
                </TableCell>
                <TableCell>{link.description}</TableCell>
                <TableCell>{link.sort}</TableCell>
                <TableCell>
                  <Badge variant={link.visible ? "default" : "secondary"}>
                    {link.visible ? "显示" : "隐藏"}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(link.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">打开菜单</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>操作</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEdit(link)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        编辑
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleStatus(link)}>
                        {link.visible ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            隐藏
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            显示
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedLink(link)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        删除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 编辑对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedLink ? "编辑友情链接" : "新增友情链接"}</DialogTitle>
            <DialogDescription>
              {selectedLink ? "修改友情链接信息" : "添加新的友情链接"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  名称
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="url" className="text-right">
                  链接
                </label>
                <Input
                  id="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="logo" className="text-right">
                  Logo
                </label>
                <Input
                  id="logo"
                  value={formData.logo}
                  onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                  className="col-span-3"
                  placeholder="可选"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="description" className="text-right">
                  描述
                </label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="col-span-3"
                  placeholder="可选"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="sort" className="text-right">
                  排序
                </label>
                <Input
                  id="sort"
                  type="number"
                  value={formData.sort}
                  onChange={(e) => setFormData({ ...formData, sort: parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="visible" className="text-right">
                  状态
                </label>
                <Select
                  value={formData.visible ? "true" : "false"}
                  onValueChange={(value) => setFormData({ ...formData, visible: value === "true" })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">显示</SelectItem>
                    <SelectItem value="false">隐藏</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{selectedLink ? "保存" : "添加"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这个友情链接吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 