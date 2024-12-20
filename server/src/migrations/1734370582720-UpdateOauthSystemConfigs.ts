import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateOauthSystemConfigs1734370582720 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 删除所有旧的OAuth配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'oauth.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'github_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'google_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'qq_%'`)

        // 添加新的OAuth配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            -- QQ登录配置
            ('oauth.qq.client_id', '', 'string', '应用ID', 11, true),
            ('oauth.qq.client_secret', '', 'string', '应用密钥', 12, true),
            ('oauth.qq.redirect_uri', '', 'string', '回调地址', 13, true)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除新的OAuth配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'oauth.qq.%'`)

        // 恢复旧的OAuth配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('oauth.github.client_id', '', 'string', 'GitHub Client ID', 11, true),
            ('oauth.github.client_secret', '', 'string', 'GitHub Client Secret', 12, true),
            ('oauth.github.redirect_uri', '', 'string', 'GitHub回调地址', 13, true),
            ('oauth.google.client_id', '', 'string', 'Google Client ID', 21, true),
            ('oauth.google.client_secret', '', 'string', 'Google Client Secret', 22, true),
            ('oauth.google.redirect_uri', '', 'string', 'Google回调地址', 23, true)
        `)
    }
} 