import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAdContents1734370582726 implements MigrationInterface {
    name = 'CreateAdContents1734370582726'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 创建广告内容表
        await queryRunner.query(`
            CREATE TABLE \`advertisements_contents\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`imageUrl\` varchar(255) NOT NULL,
                \`title\` varchar(255) NULL,
                \`description\` text NULL,
                \`link\` varchar(255) NULL,
                \`order\` int NOT NULL DEFAULT '0',
                \`advertisementId\` int NULL,
                \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
                \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);

        // 添加外键
        await queryRunner.query(`
            ALTER TABLE \`advertisements_contents\` 
            ADD CONSTRAINT \`FK_advertisements_contents_advertisement\`
            FOREIGN KEY (\`advertisementId\`) 
            REFERENCES \`advertisements\`(\`id\`) 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        `);

        // 将现有广告数据迁移到新表
        await queryRunner.query(`
            INSERT INTO \`advertisements_contents\` (\`imageUrl\`, \`title\`, \`link\`, \`advertisementId\`, \`order\`)
            SELECT 
                JSON_UNQUOTE(JSON_EXTRACT(a.\`images\`, '$[*].url')),
                JSON_UNQUOTE(JSON_EXTRACT(a.\`images\`, '$[*].title')),
                JSON_UNQUOTE(JSON_EXTRACT(a.\`images\`, '$[*].link')),
                a.\`id\`,
                0
            FROM \`advertisements\` a
        `);

        // 删除旧的 images 字段
        await queryRunner.query(`ALTER TABLE \`advertisements\` DROP COLUMN \`images\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 添加回 images 字段
        await queryRunner.query(`ALTER TABLE \`advertisements\` ADD \`images\` json NOT NULL`);

        // 将数据迁移回 advertisements 表
        await queryRunner.query(`
            UPDATE \`advertisements\` a
            SET \`images\` = (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'url', c.\`imageUrl\`,
                        'title', c.\`title\`,
                        'link', c.\`link\`
                    )
                )
                FROM \`advertisements_contents\` c
                WHERE c.\`advertisementId\` = a.\`id\`
            )
        `);

        // 删除外键
        await queryRunner.query(`ALTER TABLE \`advertisements_contents\` DROP FOREIGN KEY \`FK_advertisements_contents_advertisement\``);

        // 删除广告内容表
        await queryRunner.query(`DROP TABLE \`advertisements_contents\``);
    }
} 