'use client'

import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  queryKey: string[]
  queryFn: ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => Promise<{
    items: TData[]
    total: number
  }>
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void
  state?: {
    pagination?: {
      pageIndex: number
      pageSize: number
    }
  }
}

export function DataTable<TData, TValue>({
  columns,
  queryKey,
  queryFn,
  onPaginationChange,
  state = {},
}: DataTableProps<TData, TValue>) {
  const { pageIndex = 0, pageSize = 10 } = state.pagination || {}

  const { data, isLoading } = useQuery({
    queryKey: [...queryKey, pageIndex, pageSize],
    queryFn: () => queryFn({ pageIndex, pageSize }),
    keepPreviousData: true,
  })

  const table = useReactTable({
    data: data?.items || [],
    columns,
    pageCount: data ? Math.ceil(data.total / pageSize) : -1,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newPagination = updater({
          pageIndex,
          pageSize,
        })
        onPaginationChange?.(newPagination)
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  })

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  加载中...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  暂无数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data && data.total > pageSize && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    table.previousPage()
                  }}
                  disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>
              {Array.from({ length: table.getPageCount() }, (_, i) => {
                const isCurrentPage = i === pageIndex
                const isNearCurrentPage = Math.abs(i - pageIndex) <= 1
                const isFirstPage = i === 0
                const isLastPage = i === table.getPageCount() - 1

                if (isNearCurrentPage || isFirstPage || isLastPage) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          table.setPageIndex(i)
                        }}
                        isActive={isCurrentPage}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  )
                }

                if (i === 1 || i === table.getPageCount() - 2) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                }

                return null
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    table.nextPage()
                  }}
                  disabled={!table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
} 