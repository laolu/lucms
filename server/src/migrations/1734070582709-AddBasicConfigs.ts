import { MigrationInterface, QueryRunner } from "typeorm"

export class AddBasicConfigs1734070582709 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 基础配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('basic.site_name', 'LuCMS', 'string', '网站名称', 1, true),
            ('basic.site_description', '一个现代化的内容管理系统', 'string', '网站描述', 2, true),
            ('basic.site_keywords', 'CMS,内容管理,Next.js,NestJS', 'string', '网站关键词', 3, true),
            ('basic.site_logo', '/images/logo.png', 'string', '网站 Logo', 4, true),
            ('basic.site_favicon', '/favicon.ico', 'string', '网站图标', 5, true),
            ('basic.site_icp', '京ICP备XXXXXXXX号', 'string', 'ICP备案号', 6, true),
            ('basic.site_police', '京公网安备XXXXXXXX号', 'string', '公安备案号', 7, true),
            ('basic.site_copyright', '© 2024 LuCMS. All rights reserved.', 'string', '版权信息', 8, true),
            ('basic.site_analytics', '', 'string', '统计代码', 9, true),
            ('basic.site_status', 'open', 'string', '网站状态(open: 开启, close: 关闭)', 10, true),
            ('basic.site_close_reason', '网站维护中，请稍后再试...', 'string', '网站关闭原因', 11, true);
        `)

        // 邮件配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('email.driver', 'smtp', 'string', '邮件驱动(smtp: SMTP, ses: AWS SES, mailgun: Mailgun)', 21, true),
            ('email.host', 'smtp.example.com', 'string', 'SMTP 服务器地址', 22, true),
            ('email.port', '465', 'number', 'SMTP 服务器端口', 23, true),
            ('email.username', 'no-reply@example.com', 'string', 'SMTP 用户名', 24, true),
            ('email.password', '', 'string', 'SMTP 密码', 25, true),
            ('email.encryption', 'ssl', 'string', '加密方式(ssl/tls)', 26, true),
            ('email.from_address', 'no-reply@example.com', 'string', '发件人地址', 27, true),
            ('email.from_name', 'LuCMS', 'string', '发件人名称', 28, true),
            ('email.aws_access_key_id', '', 'string', 'AWS Access Key ID', 29, true),
            ('email.aws_secret_access_key', '', 'string', 'AWS Secret Access Key', 30, true),
            ('email.aws_default_region', '', 'string', 'AWS Region', 31, true),
            ('email.mailgun_domain', '', 'string', 'Mailgun Domain', 32, true),
            ('email.mailgun_secret', '', 'string', 'Mailgun Secret', 33, true),
            ('email.mailgun_endpoint', '', 'string', 'Mailgun Endpoint', 34, true);
        `)

        // 存储配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('storage.driver', 'local', 'string', '存储驱动(local: 本地存储, oss: 阿里云OSS, cos: 腾讯云COS, s3: AWS S3)', 41, true),
            ('storage.local_path', 'public/uploads', 'string', '本地存储路径', 42, true),
            ('storage.local_url', '/uploads', 'string', '本地访问URL', 43, true),
            ('storage.oss_key_id', '', 'string', '阿里云 OSS AccessKeyId', 44, true),
            ('storage.oss_key_secret', '', 'string', '阿里云 OSS AccessKeySecret', 45, true),
            ('storage.oss_bucket', '', 'string', '阿里云 OSS Bucket', 46, true),
            ('storage.oss_endpoint', '', 'string', '阿里云 OSS Endpoint', 47, true),
            ('storage.oss_url', '', 'string', '阿里云 OSS 访问URL', 48, true),
            ('storage.cos_secret_id', '', 'string', '腾讯云 COS SecretId', 49, true),
            ('storage.cos_secret_key', '', 'string', '腾讯云 COS SecretKey', 50, true),
            ('storage.cos_bucket', '', 'string', '腾讯云 COS Bucket', 51, true),
            ('storage.cos_region', '', 'string', '腾讯云 COS Region', 52, true),
            ('storage.cos_url', '', 'string', '腾讯云 COS 访问URL', 53, true),
            ('storage.s3_key', '', 'string', 'AWS S3 Access Key ID', 54, true),
            ('storage.s3_secret', '', 'string', 'AWS S3 Secret Access Key', 55, true),
            ('storage.s3_region', '', 'string', 'AWS S3 Region', 56, true),
            ('storage.s3_bucket', '', 'string', 'AWS S3 Bucket', 57, true),
            ('storage.s3_url', '', 'string', 'AWS S3 访问URL', 58, true);
        `)

        // 短信配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('sms.driver', 'aliyun', 'string', '短信驱动(aliyun: 阿里云, tencent: 腾讯云)', 61, true),
            ('sms.aliyun_access_key_id', '', 'string', '阿里云 AccessKeyId', 62, true),
            ('sms.aliyun_access_key_secret', '', 'string', '阿里云 AccessKeySecret', 63, true),
            ('sms.aliyun_sign_name', '', 'string', '阿里云短信签名', 64, true),
            ('sms.aliyun_template_code', '', 'string', '阿里云短信模板ID', 65, true),
            ('sms.tencent_secret_id', '', 'string', '腾讯云 SecretId', 66, true),
            ('sms.tencent_secret_key', '', 'string', '腾讯云 SecretKey', 67, true),
            ('sms.tencent_app_id', '', 'string', '腾讯云短信 AppID', 68, true),
            ('sms.tencent_sign_name', '', 'string', '腾讯云短信签名', 69, true),
            ('sms.tencent_template_id', '', 'string', '腾讯云短信模板ID', 70, true);
        `)

        // 支付配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('payment.alipay_app_id', '', 'string', '支付宝应用ID', 81, true),
            ('payment.alipay_private_key', '', 'string', '支付宝应用私钥', 82, true),
            ('payment.alipay_public_key', '', 'string', '支付宝公钥', 83, true),
            ('payment.alipay_notify_url', '', 'string', '支付宝异步通知地址', 84, true),
            ('payment.alipay_return_url', '', 'string', '支付宝同步跳转地址', 85, true),
            ('payment.alipay_sandbox', 'false', 'boolean', '是否使用支付宝沙箱环境', 86, true),
            ('payment.wechat_app_id', '', 'string', '微信支付应用ID', 87, true),
            ('payment.wechat_mch_id', '', 'string', '微信支付商户号', 88, true),
            ('payment.wechat_key', '', 'string', '微信支付API密钥', 89, true),
            ('payment.wechat_notify_url', '', 'string', '微信支付异步通知地址', 90, true),
            ('payment.wechat_cert_path', '', 'string', '微信支付证书路径', 91, true),
            ('payment.wechat_key_path', '', 'string', '微信支付证书密钥路径', 92, true),
            ('payment.wechat_sandbox', 'false', 'boolean', '是否使用微信支付沙箱环境', 93, true),
            ('payment.stripe_public_key', '', 'string', 'Stripe 公钥', 94, true),
            ('payment.stripe_secret_key', '', 'string', 'Stripe 密钥', 95, true),
            ('payment.stripe_webhook_secret', '', 'string', 'Stripe Webhook密钥', 96, true),
            ('payment.paypal_client_id', '', 'string', 'PayPal 客户端ID', 97, true),
            ('payment.paypal_secret', '', 'string', 'PayPal 密钥', 98, true),
            ('payment.paypal_sandbox', 'false', 'boolean', '是否使用PayPal沙箱环境', 99, true);
        `)

        // 第三方登录配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('oauth.github_client_id', '', 'string', 'GitHub Client ID', 101, true),
            ('oauth.github_client_secret', '', 'string', 'GitHub Client Secret', 102, true),
            ('oauth.google_client_id', '', 'string', 'Google Client ID', 103, true),
            ('oauth.google_client_secret', '', 'string', 'Google Client Secret', 104, true),
            ('oauth.facebook_client_id', '', 'string', 'Facebook Client ID', 105, true),
            ('oauth.facebook_client_secret', '', 'string', 'Facebook Client Secret', 106, true),
            ('oauth.twitter_client_id', '', 'string', 'Twitter Client ID', 107, true),
            ('oauth.twitter_client_secret', '', 'string', 'Twitter Client Secret', 108, true),
            ('oauth.weixin_app_id', '', 'string', '微信 AppID', 109, true),
            ('oauth.weixin_app_secret', '', 'string', '微信 AppSecret', 110, true),
            ('oauth.weibo_client_id', '', 'string', '微博 Client ID', 111, true),
            ('oauth.weibo_client_secret', '', 'string', '微博 Client Secret', 112, true);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'basic.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'email.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'storage.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'sms.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'payment.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'oauth.%'`)
    }
} 