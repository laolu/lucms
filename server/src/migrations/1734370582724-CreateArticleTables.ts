import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateArticleTables1734370582724 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 创建文章分类表
        await queryRunner.query(`
            CREATE TABLE article_categories (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                description VARCHAR(100),
                sort INT NOT NULL DEFAULT 0,
                is_system BOOLEAN NOT NULL DEFAULT FALSE,
                is_active BOOLEAN NOT NULL DEFAULT TRUE,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建文章表
        await queryRunner.query(`
            CREATE TABLE articles (
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(100) NOT NULL,
                content TEXT NOT NULL,
                category_id INT NOT NULL,
                is_visible BOOLEAN NOT NULL DEFAULT TRUE,
                view_count INT NOT NULL DEFAULT 0,
                sort INT NOT NULL DEFAULT 0,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (category_id) REFERENCES article_categories(id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 插入系统默认分类
        await queryRunner.query(`
            INSERT INTO article_categories (name, description, is_system, sort) VALUES
            ('关于我们', '关于我们相关的文章', TRUE, 1),
            ('帮助中心', '帮助相关的文章', TRUE, 2),
            ('用户协议', '用户协议相关的文章', TRUE, 3),
            ('隐私政策', '隐私政策相关的文章', TRUE, 4);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS articles`);
        await queryRunner.query(`DROP TABLE IF EXISTS article_categories`);
    }
} 