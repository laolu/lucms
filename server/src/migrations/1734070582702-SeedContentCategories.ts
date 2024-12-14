import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedContentCategories1734070582702 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 禁用外键检查
        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0;');

        try {
            // 设置自增ID的起始值
            await queryRunner.query(`
                ALTER TABLE content_categories AUTO_INCREMENT = 1;
            `);

            // 插入顶级分类
            await queryRunner.query(`
                INSERT INTO content_categories (name, description, parentId, sort, isActive, createdAt, updatedAt)
                VALUES 
                ('游戏美术', '游戏美术相关资源', 0, 0, true, NOW(), NOW()),
                ('动画制作', '动画制作相关资源', 0, 1, true, NOW(), NOW()),
                ('特效制作', '游戏特效制作资源', 0, 2, true, NOW(), NOW()),
                ('游戏音频', '游戏音频相关资源', 0, 3, true, NOW(), NOW());
            `);

            // 插入游戏美术的子分类 (parentId = 1)
            await queryRunner.query(`
                INSERT INTO content_categories (name, description, parentId, sort, isActive, createdAt, updatedAt)
                VALUES 
                ('角色设计', '游戏角色设计资源', 1, 0, true, NOW(), NOW()),
                ('场景设计', '游戏场景设计资源', 1, 1, true, NOW(), NOW()),
                ('道具设计', '游戏道具设计资源', 1, 2, true, NOW(), NOW()),
                ('UI设计', '游戏UI设计资源', 1, 3, true, NOW(), NOW());
            `);

            // 插入角色设计的子分类 (parentId = 5)
            await queryRunner.query(`
                INSERT INTO content_categories (name, description, parentId, sort, isActive, createdAt, updatedAt)
                VALUES 
                ('人物角色', '人物角色设计资源', 5, 0, true, NOW(), NOW()),
                ('怪物角色', '怪物角色设计资源', 5, 1, false, NOW(), NOW()),
                ('动物角色', '动物角色设计资源', 5, 2, true, NOW(), NOW()),
                ('机械角色', '机械角色设计资源', 5, 3, true, NOW(), NOW());
            `);

            // 插入场景设计的子分类 (parentId = 6)
            await queryRunner.query(`
                INSERT INTO content_categories (name, description, parentId, sort, isActive, createdAt, updatedAt)
                VALUES 
                ('自然场景', '自然环境场景资源', 6, 0, true, NOW(), NOW()),
                ('建筑场景', '建筑物场景资源', 6, 1, true, NOW(), NOW()),
                ('科幻场景', '科幻风格场景资源', 6, 2, true, NOW(), NOW());
            `);

            // 插入动画制作的子分类 (parentId = 2)
            await queryRunner.query(`
                INSERT INTO content_categories (name, description, parentId, sort, isActive, createdAt, updatedAt)
                VALUES 
                ('角色动画', '角色动画制作资源', 2, 0, true, NOW(), NOW()),
                ('场景动画', '场景动画制作资源', 2, 1, true, NOW(), NOW()),
                ('特效动画', '特效动画制作资源', 2, 2, true, NOW(), NOW());
            `);

            // 插入特效制作的子分类 (parentId = 3)
            await queryRunner.query(`
                INSERT INTO content_categories (name, description, parentId, sort, isActive, createdAt, updatedAt)
                VALUES 
                ('战斗特效', '战斗系统特效资源', 3, 0, true, NOW(), NOW()),
                ('环境特效', '环境氛围特效资源', 3, 1, true, NOW(), NOW()),
                ('技能特效', '技能施放特效资源', 3, 2, true, NOW(), NOW());
            `);

            // 插入游戏音频的子分类 (parentId = 4)
            await queryRunner.query(`
                INSERT INTO content_categories (name, description, parentId, sort, isActive, createdAt, updatedAt)
                VALUES 
                ('背景音乐', '游戏背景音乐资源', 4, 0, true, NOW(), NOW()),
                ('音效设计', '游戏音效设计资源', 4, 1, true, NOW(), NOW()),
                ('配音素材', '游戏配音素材资源', 4, 2, true, NOW(), NOW());
            `);

        } finally {
            // 恢复外键检查
            await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1;');
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 禁用外键检查
        await queryRunner.query('SET FOREIGN_KEY_CHECKS = 0;');

        try {
            await queryRunner.query(`
                DELETE FROM content_categories;
            `);
            await queryRunner.query(`
                ALTER TABLE content_categories AUTO_INCREMENT = 1;
            `);
        } finally {
            // 恢复外键检查
            await queryRunner.query('SET FOREIGN_KEY_CHECKS = 1;');
        }
    }
} 