"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface VipLevel {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  benefits: string[];
  isActive: boolean;
}

interface VipOrder {
  id: number;
  orderNo: string;
  amount: number;
  status: string;
  vipLevel: VipLevel;
  createdAt: string;
  paymentTime?: string;
}

export default function MemberPage() {
  const router = useRouter();
  const [vipLevels, setVipLevels] = useState<VipLevel[]>([]);
  const [orders, setOrders] = useState<VipOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [levelsRes, ordersRes] = await Promise.all([
        fetch('/api/vip/levels'),
        fetch('/api/vip/orders')
      ]);

      if (!levelsRes.ok || !ordersRes.ok) {
        throw new Error('获取数据失败');
      }

      const [levels, orders] = await Promise.all([
        levelsRes.json(),
        ordersRes.json()
      ]);

      setVipLevels(levels);
      setOrders(orders);
    } catch (error) {
      toast.error('获取数据失败');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePurchase(levelId: number) {
    try {
      const response = await fetch('/api/vip/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vipLevelId: levelId }),
      });

      if (!response.ok) {
        throw new Error('创建订单失败');
      }

      const order = await response.json();
      toast.success('订单创建成功');
      
      // 这里应该跳转到支付页面
      // router.push(`/payment/${order.id}`);
      
      // 临时模拟支付
      await handlePayment(order.id);
      
    } catch (error) {
      toast.error('购买失败');
      console.error(error);
    }
  }

  async function handlePayment(orderId: number) {
    try {
      const response = await fetch(`/api/vip/orders/${orderId}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethod: 'wechat' }),
      });

      if (!response.ok) {
        throw new Error('支付失败');
      }

      toast.success('支付成功');
      fetchData();
    } catch (error) {
      toast.error('支付失败');
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">加载中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">会员中心</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {vipLevels.map((level) => (
          <div
            key={level.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{level.name}</h2>
            <p className="text-gray-600 mb-4">{level.description}</p>
            <div className="text-3xl font-bold mb-4">
              ¥{level.price.toFixed(2)}
              <span className="text-sm text-gray-500 font-normal">
                /{level.duration}天
              </span>
            </div>
            <ul className="space-y-2 mb-6 flex-grow">
              {level.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePurchase(level.id)}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              立即购买
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">购买记录</h2>
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 py-4">暂无购买记录</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">订单号</th>
                  <th className="text-left py-3">会员等级</th>
                  <th className="text-left py-3">金额</th>
                  <th className="text-left py-3">状态</th>
                  <th className="text-left py-3">购买时间</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3">{order.orderNo}</td>
                    <td className="py-3">{order.vipLevel.name}</td>
                    <td className="py-3">¥{order.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status === 'paid'
                          ? '已支付'
                          : order.status === 'pending'
                          ? '待支付'
                          : '已取消'}
                      </span>
                    </td>
                    <td className="py-3">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 