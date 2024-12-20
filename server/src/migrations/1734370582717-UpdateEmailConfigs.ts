import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateEmailConfigs1734370582717 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 删除所有旧的邮件配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'email.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'aws_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'mailgun_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'ses_%'`)

        // 添加新的邮件配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            -- SMTP 配置
            ('email.smtp.host', 'smtp.example.com', 'string', 'SMTP 服务器地址', 21, true),
            ('email.smtp.port', '465', 'number', 'SMTP 服务器端口', 22, true),
            ('email.smtp.username', 'no-reply@example.com', 'string', 'SMTP 用户名', 23, true),
            ('email.smtp.password', '', 'string', 'SMTP 密码', 24, true),
            ('email.smtp.encryption', 'ssl', 'string', '加密方式(ssl/tls)', 25, true),
            ('email.smtp.from_address', 'no-reply@example.com', 'string', '发件人地址', 26, true),
            ('email.smtp.from_name', 'LuCMS', 'string', '发件人名称', 27, true),

            -- 阿里云邮件配置
            ('email.aliyun.access_key_id', '', 'string', 'AccessKey ID', 31, true),
            ('email.aliyun.access_key_secret', '', 'string', 'AccessKey Secret', 32, true),
            ('email.aliyun.account_name', '', 'string', '发信地址', 33, true),
            ('email.aliyun.from_alias', 'LuCMS', 'string', '发信人昵称', 34, true),
            ('email.aliyun.region', 'cn-hangzhou', 'string', '地域', 35, true),

            -- 腾讯云邮件配置
            ('email.tencent.secret_id', '', 'string', 'SecretId', 41, true),
            ('email.tencent.secret_key', '', 'string', 'SecretKey', 42, true),
            ('email.tencent.from_email_address', '', 'string', '发信地址', 43, true),
            ('email.tencent.from_email_alias', 'LuCMS', 'string', '发信人昵称', 44, true),
            ('email.tencent.region', 'ap-guangzhou', 'string', '地域', 45, true)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除新的邮件配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'email.smtp.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'email.aliyun.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'email.tencent.%'`)

        // 恢复旧的邮件配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('email.driver', 'smtp', 'string', '邮件驱动(smtp: SMTP, ses: AWS SES, mailgun: Mailgun)', 21, true),
            ('email.host', 'smtp.example.com', 'string', 'SMTP 服务器地址', 22, true),
            ('email.port', '465', 'number', 'SMTP 服务器端口', 23, true),
            ('email.username', 'no-reply@example.com', 'string', 'SMTP 用户名', 24, true),
            ('email.password', '', 'string', 'SMTP 密码', 25, true),
            ('email.encryption', 'ssl', 'string', '加密方式(ssl/tls)', 26, true),
            ('email.from_address', 'no-reply@example.com', 'string', '发件人地址', 27, true),
            ('email.from_name', 'LuCMS', 'string', '发件人名称', 28, true)
        `)
    }
} 