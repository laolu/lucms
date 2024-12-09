import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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

    const commentId = parseInt(params.id);
    const response = await fetch(`${process.env.API_URL}/content-comments/${commentId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to like comment');
    }

    const comment = await response.json();
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { message: '点赞失败' },
      { status: 500 }
    );
  }
} 