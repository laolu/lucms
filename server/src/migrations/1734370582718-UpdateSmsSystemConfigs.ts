import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateSmsSystemConfigs1734370582718 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 删除所有旧的短信配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'sms.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'aliyun_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'tencent_%'`)

        // 添加新的短信配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            -- 阿里云短信配置
            ('sms.aliyun.access_key_id', '', 'string', 'AccessKey ID', 11, true),
            ('sms.aliyun.access_key_secret', '', 'string', 'AccessKey Secret', 12, true),
            ('sms.aliyun.sign_name', '', 'string', '短信签名', 13, true),
            ('sms.aliyun.template_code', '', 'string', '验证码模板ID', 14, true),

            -- 腾讯云短信配置
            ('sms.tencent.secret_id', '', 'string', 'SecretId', 21, true),
            ('sms.tencent.secret_key', '', 'string', 'SecretKey', 22, true),
            ('sms.tencent.app_id', '', 'string', '应用ID', 23, true),
            ('sms.tencent.sign_name', '', 'string', '短信签名', 24, true),
            ('sms.tencent.template_id', '', 'string', '验证码模板ID', 25, true)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除新的短信配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'sms.aliyun.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'sms.tencent.%'`)

        // 恢复旧的短信配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('sms.driver', 'aliyun', 'string', '短信驱动(aliyun: 阿里云短信, tencent: 腾讯云短信)', 11, true),
            ('sms.sign_name', '', 'string', '短信签名', 12, true),
            ('sms.template_code', '', 'string', '验证码模板ID', 13, true)
        `)
    }
} 