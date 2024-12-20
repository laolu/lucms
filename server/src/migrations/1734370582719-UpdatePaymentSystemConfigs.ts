import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdatePaymentSystemConfigs1734370582719 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 删除所有旧的支付配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'payment.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'alipay_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'wechat_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'stripe_%'`)

        // 添加新的支付配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            -- 支付宝配置
            ('payment.alipay.app_id', '', 'string', '应用ID', 11, true),
            ('payment.alipay.private_key', '', 'string', '应用私钥', 12, true),
            ('payment.alipay.public_key', '', 'string', '支付宝公钥', 13, true),
            ('payment.alipay.notify_url', '', 'string', '异步通知地址', 14, true),
            ('payment.alipay.return_url', '', 'string', '同步跳转地址', 15, true),

            -- 微信支付配置
            ('payment.wechat.app_id', '', 'string', '应用ID', 21, true),
            ('payment.wechat.mch_id', '', 'string', '商户号', 22, true),
            ('payment.wechat.key', '', 'string', 'API密钥', 23, true),
            ('payment.wechat.cert_path', '', 'string', '证书路径', 24, true),
            ('payment.wechat.key_path', '', 'string', '证书密钥路径', 25, true),
            ('payment.wechat.notify_url', '', 'string', '回调通知地址', 26, true)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除新的支付配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'payment.alipay.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'payment.wechat.%'`)

        // 恢复旧的支付配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('payment.driver', 'alipay', 'string', '支付驱动(alipay: 支付宝, wechat: 微信支付)', 11, true),
            ('payment.app_id', '', 'string', '应用ID', 12, true),
            ('payment.private_key', '', 'string', '应用私钥', 13, true),
            ('payment.public_key', '', 'string', '支付宝公钥', 14, true),
            ('payment.notify_url', '', 'string', '异步通知地址', 15, true),
            ('payment.return_url', '', 'string', '同步跳转地址', 16, true)
        `)
    }
} 