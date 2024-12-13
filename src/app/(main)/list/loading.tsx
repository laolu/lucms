import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ListLoading() {
  return (
    <>
      {/* 顶部轮播骨架屏 */}
      <div className="w-full bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="py-4">
            <Skeleton className="w-full aspect-[21/9] rounded-xl" />
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* 筛选条件骨架屏 */}
        <div className="p-5 mb-8 space-y-4 rounded-xl border bg-background">
          {/* 行业 */}
          <div className="flex gap-6">
            <Skeleton className="w-16 h-7" />
            <div className="flex flex-wrap flex-1 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <Skeleton key={i} className="w-20 h-7" />
              ))}
            </div>
          </div>

          {/* 技能 */}
          <div className="flex gap-6">
            <Skeleton className="w-16 h-7" />
            <div className="flex flex-wrap flex-1 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <Skeleton key={i} className="w-20 h-7" />
              ))}
            </div>
          </div>

          {/* 软件 */}
          <div className="flex gap-6">
            <Skeleton className="w-16 h-7" />
            <div className="flex flex-wrap flex-1 gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="w-32 h-7" />
              ))}
            </div>
          </div>

          {/* 级别 */}
          <div className="flex gap-6">
            <Skeleton className="w-16 h-7" />
            <div className="flex flex-wrap flex-1 gap-2">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="w-16 h-7" />
              ))}
            </div>
          </div>
        </div>

        {/* 筛选和排序骨架屏 */}
        <div className="flex flex-col gap-4 justify-between p-4 mb-8 rounded-xl border" style={{ background: '#eff2f6' }}>
          <div className="flex overflow-x-auto gap-2 items-center pb-2 md:pb-0">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="w-16 h-7" />
            ))}
          </div>
          <div className="flex gap-4 items-center">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="w-12 h-7" />
            ))}
          </div>
        </div>

        {/* 课程列表骨架屏 */}
        <div className="p-6 rounded-xl" style={{ background: '#eff2f6' }}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="p-3 space-y-3 rounded-xl border bg-background">
                <Skeleton className="rounded-lg aspect-video" />
                <Skeleton className="w-full h-5" />
                <Skeleton className="w-2/3 h-5" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-12 h-6 rounded-full" />
                  <Skeleton className="w-12 h-6 rounded-full" />
                  <Skeleton className="w-12 h-6 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 分页骨架屏 */}
        <div className="flex gap-2 justify-center items-center mt-12">
          {[1, 2, 3, 4, 5].map(i => (
            <Skeleton key={i} className="w-8 h-8" />
          ))}
        </div>
      </div>
    </>
  )
} 