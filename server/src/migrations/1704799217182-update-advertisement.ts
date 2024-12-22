import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateAdvertisement1704799217182 implements MigrationInterface {
    name = 'UpdateAdvertisement1704799217182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 添加新字段
        await queryRunner.query(`ALTER TABLE \`advertisements\` ADD \`type\` enum('single', 'multiple', 'carousel') NOT NULL DEFAULT 'single'`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` ADD \`images\` json NOT NULL`);
        
        // 将现有数据迁移到新结构
        await queryRunner.query(`
            UPDATE \`advertisements\` 
            SET \`type\` = 'single',
                \`images\` = JSON_ARRAY(
                    JSON_OBJECT(
                        'url', \`imageUrl\`,
                        'link', \`linkUrl\`
                    )
                )
        `);
        
        // 删除旧字段
        await queryRunner.query(`ALTER TABLE \`advertisements\` DROP COLUMN \`imageUrl\``);
        await queryRunner.query(`ALTER TABLE \`advertisements\` DROP COLUMN \`linkUrl\``);
        
        // 修改时间字段类型
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`startDate\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`endDate\` timestamp NULL`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 添加旧字段
        await queryRunner.query(`ALTER TABLE \`advertisements\` ADD \`imageUrl\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` ADD \`linkUrl\` varchar(255) NOT NULL`);
        
        // 将数据迁移回旧结构
        await queryRunner.query(`
            UPDATE \`advertisements\` 
            SET \`imageUrl\` = JSON_UNQUOTE(JSON_EXTRACT(\`images\`, '$[0].url')),
                \`linkUrl\` = IFNULL(JSON_UNQUOTE(JSON_EXTRACT(\`images\`, '$[0].link')), '')
        `);
        
        // 删除新字段
        await queryRunner.query(`ALTER TABLE \`advertisements\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`advertisements\` DROP COLUMN \`images\``);
        
        // 恢复时间字段类型
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`startDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`endDate\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`advertisements\` MODIFY \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
    }
} 