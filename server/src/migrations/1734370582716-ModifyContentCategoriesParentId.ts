import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyContentCategoriesParentId1734370582716 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 先检查外键约束是否存在
        const [{ constraint_name }] = await queryRunner.query(`
            SELECT CONSTRAINT_NAME as constraint_name
            FROM information_schema.KEY_COLUMN_USAGE
            WHERE TABLE_SCHEMA = DATABASE()
            AND TABLE_NAME = 'content_categories'
            AND COLUMN_NAME = 'parentId'
            AND REFERENCED_TABLE_NAME = 'content_categories';
        `) || [{ constraint_name: null }];

        // 如果存在外键约束，则删除它
        if (constraint_name) {
            await queryRunner.query(`
                ALTER TABLE content_categories
                DROP FOREIGN KEY ${constraint_name};
            `);
        }

        // 修改 parentId 列定义，允许为 null 和 0
        await queryRunner.query(`
            ALTER TABLE content_categories
            MODIFY COLUMN parentId int NULL DEFAULT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 恢复外键约束
        await queryRunner.query(`
            ALTER TABLE content_categories
            ADD CONSTRAINT FK_content_categories_parent
            FOREIGN KEY (parentId) REFERENCES content_categories(id)
            ON DELETE SET NULL;
        `);
    }
} 