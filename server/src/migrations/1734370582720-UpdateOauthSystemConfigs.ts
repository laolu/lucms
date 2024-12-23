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
            -- 基础配置
            ('basic.oauth.providers', '[]', 'json', '第三方登录服务商', 1, true),
            
            -- QQ登录配置
            ('oauth.qq.client_id', '', 'string', 'QQ应用ID', 11, true),
            ('oauth.qq.client_secret', '', 'string', 'QQ应用密钥', 12, true),
            ('oauth.qq.redirect_uri', '', 'string', 'QQ回调地址', 13, true),
            
            -- 微信登录配置
            ('oauth.wechat.client_id', '', 'string', '微信AppID', 21, true),
            ('oauth.wechat.client_secret', '', 'string', '微信AppSecret', 22, true),
            ('oauth.wechat.redirect_uri', '', 'string', '微信回调地址', 23, true),
            
            -- 微博登录配置
            ('oauth.weibo.client_id', '', 'string', '微博应用ID', 31, true),
            ('oauth.weibo.client_secret', '', 'string', '微博应用密钥', 32, true),
            ('oauth.weibo.redirect_uri', '', 'string', '微博回调地址', 33, true)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除新的OAuth配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'oauth.qq.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'oauth.wechat.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'oauth.weibo.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` = 'basic.oauth.providers'`)
    }
} 