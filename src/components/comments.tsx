"use client"

import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, MessageCircle } from "lucide-react"

export function Comments() {
  const [content, setContent] = React.useState("")
  const maxLength = 200 // 设置最大字数限制

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    if (text.length <= maxLength) {
      setContent(text)
    }
  }

  return (
    <div className="space-y-8">
      {/* 评论输入区域 */}
      <div className="space-y-4">
        <Textarea
          placeholder="写下你的评论..."
          value={content}
          onChange={handleContentChange}
          className="min-h-[100px]"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {content.length}/{maxLength} 字
          </span>
          <Button>发布评论</Button>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="py-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-muted-foreground">
                        {comment.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {comment.createdAt}
                      </span>
                      <div className="flex gap-3">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`h-8 px-2 ${comment.isLiked ? "text-primary" : ""}`}
                        >
                          <ThumbsUp className="mr-1 h-4 w-4" />
                          <span>{comment.likes}</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-8 px-2"
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          <span>{comment.replies}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {comment.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 模拟评论数据
const comments = [
  {
    id: 1,
    author: "张三",
    role: "学员",
    avatar: "/demo/avatar1.png",
    content: "课程内容非常详细，讲解也很清晰，学到了很多实用的技巧。特别是在角色建模方面的讲解，对我帮助很大。",
    createdAt: "2024-01-20",
    likes: 12,
    replies: 2,
    isLiked: true
  },
  {
    id: 2,
    author: "李四",
    role: "高级学员",
    avatar: "/demo/avatar2.png",
    content: "老师的经验分享很有价值，课程中的实战案例也很实用。期待后续的更新！",
    createdAt: "2024-01-19",
    likes: 8,
    replies: 1,
    isLiked: false
  },
  {
    id: 3,
    author: "王五",
    role: "学员",
    avatar: "/demo/avatar3.png",
    content: "作为一个初学者，这门课程对我来说难度适中，循序渐进，很容易跟上节奏。",
    createdAt: "2024-01-18",
    likes: 15,
    replies: 3,
    isLiked: false
  }
] 