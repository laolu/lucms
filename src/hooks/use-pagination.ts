import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function usePagination(initialPage = 0, initialPageSize = 10) {
  const [pageIndex, setPageIndex] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const router = useRouter()

  const setPagination = ({ pageIndex: newPageIndex, pageSize: newPageSize }: { pageIndex: number; pageSize: number }) => {
    setPageIndex(newPageIndex)
    setPageSize(newPageSize)
  }

  const refresh = () => {
    router.refresh()
  }

  return {
    pageIndex,
    pageSize,
    setPagination,
    refresh
  }
} 