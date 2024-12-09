import { useState } from 'react';
import { Avatar, Button, Input, message } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { formatDistance } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface Comment {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  likes: number;
  createdAt: string;
  children?: Comment[];
}

interface CommentListProps {
  contentId: number;
  comments: Comment[];
  onReply: (parentId: number | null, content: string) => Promise<void>;
  onLike: (commentId: number) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
}

const { TextArea } = Input;

export const CommentList = ({ contentId, comments, onReply, onLike, onDelete }: CommentListProps) => {
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleSubmitReply = async (parentId: number | null) => {
    try {
      await onReply(parentId, parentId === null ? newComment : replyContent);
      setReplyContent('');
      setNewComment('');
      setReplyTo(null);
      message.success('评论成功');
    } catch (error) {
      message.error('评论失败，请重试');
    }
  };

  const renderComment = (comment: Comment, isChild = false) => (
    <div key={comment.id} className={`flex gap-4 ${isChild ? 'ml-12 mt-4' : 'mt-6'}`}>
      <Avatar src={comment.user.avatar} size={40}>
        {comment.user.username[0]}
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.user.username}</span>
          <span className="text-gray-500 text-sm">
            {formatDistance(new Date(comment.createdAt), new Date(), {
              addSuffix: true,
              locale: zhCN,
            })}
          </span>
        </div>
        <p className="mt-2 text-gray-700">{comment.content}</p>
        <div className="mt-2 flex items-center gap-4">
          <Button
            type="text"
            icon={<LikeOutlined />}
            onClick={() => onLike(comment.id)}
          >
            {comment.likes} 赞
          </Button>
          {!isChild && (
            <Button
              type="text"
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
            >
              回复
            </Button>
          )}
          <Button
            type="text"
            danger
            onClick={() => onDelete(comment.id)}
          >
            删除
          </Button>
        </div>
        {replyTo === comment.id && (
          <div className="mt-4">
            <TextArea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="写下你的回复..."
              rows={2}
            />
            <div className="mt-2 flex justify-end gap-2">
              <Button onClick={() => setReplyTo(null)}>取消</Button>
              <Button
                type="primary"
                onClick={() => handleSubmitReply(comment.id)}
                disabled={!replyContent.trim()}
              >
                回复
              </Button>
            </div>
          </div>
        )}
        {comment.children?.map((child) => renderComment(child, true))}
      </div>
    </div>
  );

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-6">评论</h3>
      <div className="mb-6">
        <TextArea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="写下你的评论..."
          rows={3}
        />
        <div className="mt-2 flex justify-end">
          <Button
            type="primary"
            onClick={() => handleSubmitReply(null)}
            disabled={!newComment.trim()}
          >
            发表评论
          </Button>
        </div>
      </div>
      <div>
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
}; 