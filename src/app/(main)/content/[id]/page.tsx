'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { message } from 'antd';
import { CommentList } from '@/components/content/comment-list';
import { ShareButtons } from '@/components/content/share-buttons';

interface ContentDetailProps {
  params: {
    id: string;
  };
}

export default function ContentDetail({ params }: ContentDetailProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
    fetchComments();
  }, [params.id]);

  const fetchContent = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}`);
      if (!response.ok) throw new Error('Failed to fetch content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      message.error('获取内容失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/content/${params.id}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      message.error('获取评论失败');
    }
  };

  const handleReply = async (parentId: number | null, content: string) => {
    if (!session) {
      message.error('请先登录');
      return;
    }

    try {
      const response = await fetch(`/api/content/${params.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          parentId,
        }),
      });

      if (!response.ok) throw new Error('Failed to post comment');
      await fetchComments();
    } catch (error) {
      message.error('发表评论失败');
    }
  };

  const handleLike = async (commentId: number) => {
    if (!session) {
      message.error('请先登录');
      return;
    }

    try {
      const response = await fetch(`/api/content/comments/${commentId}/like`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to like comment');
      await fetchComments();
    } catch (error) {
      message.error('点赞失败');
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!session) {
      message.error('请先登录');
      return;
    }

    try {
      const response = await fetch(`/api/content/${params.id}/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete comment');
      await fetchComments();
      message.success('删除成功');
    } catch (error) {
      message.error('删除失败');
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!content) {
    return <div>内容不存在</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1>{content.title}</h1>
        <div className="mb-8">
          <ShareButtons
            title={content.title}
            url={window.location.href}
            summary={content.description}
          />
        </div>
        <div dangerouslySetInnerHTML={{ __html: content.content }} />
      </article>
      <div className="max-w-4xl mx-auto">
        <CommentList
          contentId={parseInt(params.id)}
          comments={comments}
          onReply={handleReply}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
} 