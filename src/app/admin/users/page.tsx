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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, ArrowUpDown, Ban, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import { userService, type User, type UserListResponse } from '@/services/user'
import { formatDate } from '@/lib/utils'

export default function UsersPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [users, setUsers] = React.useState<UserListResponse>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0
  })
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedStatus, setSelectedStatus] = React.useState<string>('all')
  const [sortBy, setSortBy] = React.useState<string>('createdAt')
  const [sortOrder, setSortOrder] = React.useState<'ASC' | 'DESC'>('DESC')
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null)

  // 加载用户列表
  const loadUsers = React.useCallback(async () => {
    try {
      setLoading(true)
      const data = await userService.getAll({
        search: searchQuery,
        status: selectedStatus === 'all' ? undefined : selectedStatus,
        sortBy,
        sort: sortOrder,
        page: users.page,
        pageSize: users.pageSize
      })
      setUsers({
        items: data?.items || [],
        total: data?.total || 0,
        page: data?.page || 1,
        pageSize: data?.pageSize || 10,
        totalPages: data?.totalPages || 0
      })
    } catch (error) {
      toast.error('加载用户列表失败')
      setUsers({
        items: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      })
    } finally {
      setLoading(false)
    }
  }, [searchQuery, selectedStatus, sortBy, sortOrder, users.page, users.pageSize])

  React.useEffect(() => {
    loadUsers()
  }, [loadUsers])

  // 处理创建用户
  const handleCreate = () => {
    router.push('/admin/users/create')
  }

  // 处理编辑用户
  const handleEdit = (user: User) => {
    router.push(`/admin/users/${user.id}/edit`)
  }

  // 处理删除用户
  const handleDelete = (user: User) => {
    setSelectedUser(user)
    setDeleteDialogOpen(true)
  }

  // 确认删除用户
  const handleConfirmDelete = async () => {
    if (!selectedUser) return

    try {
      await userService.delete(selectedUser.id)
      toast.success('用户已删除')
      loadUsers()
    } catch (error) {
      toast.error('删除用户失败')
    } finally {
      setDeleteDialogOpen(false)
      setSelectedUser(null)
    }
  }

  // 处理禁用/启用用户
  const handleToggleStatus = async (user: User) => {
    try {
      await userService.updateStatus(user.id, !user.isActive)
      toast.success(user.isActive ? '用户已禁用' : '用户已启用')
      loadUsers()
    } catch (error) {
      toast.error('操作失败')
    }
  }

  // 处理排序变更
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setSortBy(field)
      setSortOrder('DESC')
    }
  }

  // 处理页码变更
  const handlePageChange = (page: number) => {
    setUsers(prev => ({ ...prev, page }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">用户管理</h1>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          创建用户
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索用户..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={selectedStatus}
          onValueChange={setSelectedStatus}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="选择状态" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态</SelectItem>
            <SelectItem value="active">已启用</SelectItem>
            <SelectItem value="inactive">已禁用</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('username')}>
                  用户名
                  <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('email')}>
                  邮箱
                  <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>角色</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('lastLoginAt')}>
                  最后登录
                  <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="h-8 p-0" onClick={() => handleSort('createdAt')}>
                  创建时间
                  <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  加载中...
                </TableCell>
              </TableRow>
            ) : !users?.items?.length ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  暂无数据
                </TableCell>
              </TableRow>
            ) : (
              users.items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {user.isAdmin ? '管理员' : '普通用户'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.isActive ? "success" : "destructive"}>
                      {user.isActive ? '已启用' : '已禁用'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.lastLoginAt)}</TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                          <span className="sr-only">打开菜单</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>操作</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(user)}>
                          {user.isActive ? (
                            <>
                              <Ban className="w-4 h-4 mr-2" />
                              禁用
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              启用
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(user)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(users.page - 1)}
                disabled={users.page === 1}
              />
            </PaginationItem>
            {Array.from({ length: users.totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={users.page === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(users.page + 1)}
                disabled={users.page === users.totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除用户 "{selectedUser?.username}" 吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              确认删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 