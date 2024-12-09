import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1702169400000 implements MigrationInterface {
    name = 'InitialMigration1702169400000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 创建用户表
        await queryRunner.query(`
            CREATE TABLE users (
                id INT NOT NULL AUTO_INCREMENT,
                phone VARCHAR(20) UNIQUE,
                email VARCHAR(255) UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('user', 'member', 'admin') NOT NULL DEFAULT 'user',
                membershipExpiry DATETIME NULL,
                resetPasswordToken VARCHAR(255),
                resetPasswordExpires DATETIME,
                verificationCode VARCHAR(255),
                verificationCodeExpires DATETIME,
                isEmailVerified BOOLEAN NOT NULL DEFAULT false,
                isPhoneVerified BOOLEAN NOT NULL DEFAULT false,
                loginAttempts INT NOT NULL DEFAULT 0,
                lastLoginAttempt DATETIME,
                lockedUntil DATETIME,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建内容分类表
        await queryRunner.query(`
            CREATE TABLE content_categories (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                slug VARCHAR(255) NOT NULL UNIQUE,
                description TEXT,
                parent_id INT,
                isActive BOOLEAN NOT NULL DEFAULT true,
                sort INT NOT NULL DEFAULT 0,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (parent_id) REFERENCES content_categories(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建内容表
        await queryRunner.query(`
            CREATE TABLE contents (
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                type ENUM('free', 'paid', 'member') NOT NULL DEFAULT 'free',
                format ENUM('document', 'video') NOT NULL DEFAULT 'document',
                price DECIMAL(10,2),
                discountPrice DECIMAL(10,2),
                filePath VARCHAR(255) NOT NULL,
                downloads INT NOT NULL DEFAULT 0,
                views INT NOT NULL DEFAULT 0,
                author_id INT,
                category_id INT,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
                FOREIGN KEY (category_id) REFERENCES content_categories(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建内容属性表
        await queryRunner.query(`
            CREATE TABLE content_attributes (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                code VARCHAR(255) NOT NULL,
                description TEXT,
                isActive BOOLEAN NOT NULL DEFAULT true,
                sort INT NOT NULL DEFAULT 0,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建内容-属性关联表
        await queryRunner.query(`
            CREATE TABLE content_attribute_relations (
                content_id INT NOT NULL,
                attribute_id INT NOT NULL,
                value TEXT,
                PRIMARY KEY (content_id, attribute_id),
                FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE,
                FOREIGN KEY (attribute_id) REFERENCES content_attributes(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建分类-属性关联表
        await queryRunner.query(`
            CREATE TABLE content_category_attributes (
                category_id INT NOT NULL,
                attribute_id INT NOT NULL,
                PRIMARY KEY (category_id, attribute_id),
                FOREIGN KEY (category_id) REFERENCES content_categories(id) ON DELETE CASCADE,
                FOREIGN KEY (attribute_id) REFERENCES content_attributes(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建内容评论表
        await queryRunner.query(`
            CREATE TABLE content_comments (
                id INT NOT NULL AUTO_INCREMENT,
                commentContent TEXT NOT NULL,
                content_id INT NOT NULL,
                user_id INT NOT NULL,
                parentId INT,
                likes INT NOT NULL DEFAULT 0,
                isActive BOOLEAN NOT NULL DEFAULT true,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (parentId) REFERENCES content_comments(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建SEO表
        await queryRunner.query(`
            CREATE TABLE seo (
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                keywords VARCHAR(255),
                ogTitle VARCHAR(255),
                ogDescription TEXT,
                ogImage VARCHAR(255),
                canonicalUrl VARCHAR(255),
                robotsTxt TEXT,
                customMetaTags JSON,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建网站SEO表
        await queryRunner.query(`
            CREATE TABLE website_seo (
                id INT NOT NULL AUTO_INCREMENT,
                siteName VARCHAR(255) NOT NULL,
                defaultDescription TEXT,
                defaultKeywords VARCHAR(255),
                defaultOgImage VARCHAR(255),
                googleAnalyticsId VARCHAR(255),
                robotsTxt TEXT,
                sitemapXml TEXT,
                customScripts JSON,
                customMetaTags JSON,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建菜单表
        await queryRunner.query(`
            CREATE TABLE menus (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                icon VARCHAR(255),
                path VARCHAR(255),
                visible BOOLEAN NOT NULL DEFAULT true,
                sort INT NOT NULL DEFAULT 0,
                parentId INT,
                roles JSON,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (parentId) REFERENCES menus(id) ON DELETE SET NULL
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建VIP等级表
        await queryRunner.query(`
            CREATE TABLE vip_levels (
                id INT NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                duration INT NOT NULL,
                benefits JSON NOT NULL,
                isActive BOOLEAN NOT NULL DEFAULT true,
                sort INT NOT NULL DEFAULT 0,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建VIP订单表
        await queryRunner.query(`
            CREATE TABLE vip_orders (
                id INT NOT NULL AUTO_INCREMENT,
                orderNo VARCHAR(255) NOT NULL,
                user_id INT NOT NULL,
                vip_level_id INT NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                status ENUM('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending',
                paymentMethod VARCHAR(255),
                paymentTime DATETIME,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (vip_level_id) REFERENCES vip_levels(id) ON DELETE RESTRICT
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 创建系统配置表
        await queryRunner.query(`
            CREATE TABLE system_configs (
                id INT NOT NULL AUTO_INCREMENT,
                emailConfig JSON NOT NULL,
                smsConfig JSON NOT NULL,
                securityConfig JSON NOT NULL,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 按照相反的顺序删除表
        await queryRunner.query(`DROP TABLE IF EXISTS system_configs`);
        await queryRunner.query(`DROP TABLE IF EXISTS vip_orders`);
        await queryRunner.query(`DROP TABLE IF EXISTS vip_levels`);
        await queryRunner.query(`DROP TABLE IF EXISTS menus`);
        await queryRunner.query(`DROP TABLE IF EXISTS website_seo`);
        await queryRunner.query(`DROP TABLE IF EXISTS seo`);
        await queryRunner.query(`DROP TABLE IF EXISTS content_comments`);
        await queryRunner.query(`DROP TABLE IF EXISTS content_category_attributes`);
        await queryRunner.query(`DROP TABLE IF EXISTS content_attribute_relations`);
        await queryRunner.query(`DROP TABLE IF EXISTS content_attributes`);
        await queryRunner.query(`DROP TABLE IF EXISTS contents`);
        await queryRunner.query(`DROP TABLE IF EXISTS content_categories`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
} 