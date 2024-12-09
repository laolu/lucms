import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contentId = parseInt(params.id);
    const response = await fetch(`${process.env.API_URL}/content-comments/content/${contentId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }

    const comments = await response.json();
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { message: '获取评论失败' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: '请先登录' },
        { status: 401 }
      );
    }

    const contentId = parseInt(params.id);
    const body = await request.json();

    const response = await fetch(`${process.env.API_URL}/content-comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        ...body,
        contentId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create comment');
    }

    const comment = await response.json();
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { message: '发表评论失败' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: '请先登录' },
        { status: 401 }
      );
    }

    const commentId = parseInt(params.id);
    const response = await fetch(`${process.env.API_URL}/content-comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete comment');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: '删除评论失败' },
      { status: 500 }
    );
  }
} 