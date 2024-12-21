import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateBasicSystemConfigs1734370582722 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 获取现有的基础配置
        const existingConfigs = await queryRunner.query(`SELECT * FROM system_configs WHERE \`key\` LIKE 'basic.%'`)
        const existingKeys = existingConfigs.map((config: any) => config.key)

        // 需要添加的新配置
        const newConfigs = [
            // 邮件服务配置
            ['basic.email.enabled', 'false', 'boolean', '启用邮件服务', 11],
            ['basic.email.provider', 'smtp', 'string', '邮件服务商', 12],

            // 短信服务配置
            ['basic.sms.enabled', 'false', 'boolean', '启用短信服务', 21],
            ['basic.sms.provider', 'aliyun', 'string', '短信服务商', 22],

            // 存储服务配置
            ['basic.storage.provider', 'local', 'string', '存储服务商', 31],

            // 支付服务配置
            ['basic.payment.providers', '[]', 'json', '支付服务商', 41],

            // 第三方登录配置
            ['basic.oauth.providers', '[]', 'json', '第三方登录服务商', 51]
        ]

        // 只添加不存在的配置
        for (const [key, value, type, description, sort] of newConfigs) {
            if (!existingKeys.includes(key)) {
                await queryRunner.query(`
                    INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`)
                    VALUES (?, ?, ?, ?, ?, true)
                `, [key, value, type, description, sort])
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 只删除新添加的配置
        await queryRunner.query(`
            DELETE FROM system_configs 
            WHERE \`key\` IN (
                'basic.email.enabled',
                'basic.email.provider',
                'basic.sms.enabled',
                'basic.sms.provider',
                'basic.storage.provider',
                'basic.payment.providers',
                'basic.oauth.providers'
            )
        `)
    }
} 