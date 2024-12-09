import { Button, Tooltip, message } from 'antd';
import {
  WechatOutlined,
  QqOutlined,
  WeiboOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import QRCode from 'qrcode.react';

interface ShareButtonsProps {
  title: string;
  url: string;
  summary?: string;
}

export const ShareButtons = ({ title, url, summary = '' }: ShareButtonsProps) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      message.success('链接已复制到剪贴板');
    } catch (error) {
      message.error('复制失败，请手动复制');
    }
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(
      shareUrl,
      '_blank',
      'width=600,height=500,menubar=no,toolbar=no,status=no,scrollbars=yes'
    );
  };

  const getShareUrls = () => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedSummary = encodeURIComponent(summary);

    return {
      weibo: `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`,
      qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedSummary}`,
    };
  };

  const shareUrls = getShareUrls();

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-600">分享到：</span>
      <Tooltip title="分享到微信" placement="top">
        <Button
          type="text"
          icon={<WechatOutlined />}
          onClick={() => {
            const modal = Modal.info({
              title: '微信扫码分享',
              content: (
                <div className="flex justify-center p-4">
                  <QRCode value={url} size={200} />
                </div>
              ),
              okText: '关闭',
            });
          }}
        />
      </Tooltip>
      <Tooltip title="分享到QQ" placement="top">
        <Button
          type="text"
          icon={<QqOutlined />}
          onClick={() => openShareWindow(shareUrls.qq)}
        />
      </Tooltip>
      <Tooltip title="分享到微博" placement="top">
        <Button
          type="text"
          icon={<WeiboOutlined />}
          onClick={() => openShareWindow(shareUrls.weibo)}
        />
      </Tooltip>
      <Tooltip title="复制链接" placement="top">
        <Button
          type="text"
          icon={<LinkOutlined />}
          onClick={handleCopyLink}
        />
      </Tooltip>
    </div>
  );
} 