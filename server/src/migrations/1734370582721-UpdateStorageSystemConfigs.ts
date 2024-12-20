import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateStorageSystemConfigs1734370582721 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 删除所有旧的存储配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'storage.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'filesystem.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'oss_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'cos_%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'qiniu_%'`)

        // 添加新的存储配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            -- 本地存储配置
            ('storage.local.root', 'public/uploads', 'string', '上传根目录', 11, true),
            ('storage.local.url', '/uploads', 'string', '访问URL', 12, true),

            -- 阿里云OSS配置
            ('storage.aliyun.access_key_id', '', 'string', 'AccessKey ID', 21, true),
            ('storage.aliyun.access_key_secret', '', 'string', 'AccessKey Secret', 22, true),
            ('storage.aliyun.bucket', '', 'string', 'Bucket名称', 23, true),
            ('storage.aliyun.endpoint', '', 'string', '地域节点', 24, true),
            ('storage.aliyun.url', '', 'string', '访问域名', 25, true),

            -- 腾讯云COS配置
            ('storage.tencent.secret_id', '', 'string', 'SecretId', 31, true),
            ('storage.tencent.secret_key', '', 'string', 'SecretKey', 32, true),
            ('storage.tencent.bucket', '', 'string', '存储桶名称', 33, true),
            ('storage.tencent.region', '', 'string', '地域', 34, true),
            ('storage.tencent.url', '', 'string', '访问域名', 35, true),

            -- 七牛云存储配置
            ('storage.qiniu.access_key', '', 'string', 'AccessKey', 41, true),
            ('storage.qiniu.secret_key', '', 'string', 'SecretKey', 42, true),
            ('storage.qiniu.bucket', '', 'string', '存储空间名称', 43, true),
            ('storage.qiniu.domain', '', 'string', '访问域名', 44, true),
            ('storage.qiniu.zone', 'z0', 'string', '存储区域', 45, true)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除新的存储配置
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'storage.local.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'storage.aliyun.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'storage.tencent.%'`)
        await queryRunner.query(`DELETE FROM system_configs WHERE \`key\` LIKE 'storage.qiniu.%'`)

        // 恢复旧的存储配置
        await queryRunner.query(`
            INSERT INTO system_configs (\`key\`, \`value\`, \`type\`, \`description\`, \`sort\`, \`isActive\`) VALUES
            ('filesystem.driver', 'local', 'string', '存储驱动(local: 本地存储, oss: 阿里云OSS, cos: 腾讯云COS)', 11, true),
            ('filesystem.root', 'public/uploads', 'string', '上传根目录', 12, true),
            ('filesystem.url', '/uploads', 'string', '访问URL', 13, true)
        `)
    }
} 