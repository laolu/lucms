import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1733810213202 implements MigrationInterface {
    name = 'Init1733810213202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`nickname\` varchar(255) NULL, \`bio\` text NULL, \`isAdmin\` tinyint NOT NULL DEFAULT 0, \`isActive\` tinyint NOT NULL DEFAULT 1, \`phone\` varchar(255) NULL, \`lastLoginAt\` datetime NULL, \`lastLoginIp\` varchar(255) NULL, \`emailVerifiedAt\` datetime NULL, \`phoneVerifiedAt\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_attributes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` enum ('single', 'multiple') NOT NULL DEFAULT 'single', \`sort\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_attribute_values\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`sort\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, \`attributeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_attribute_relations\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`contentId\` int NULL, \`attributeValueId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`parentId\` int NOT NULL DEFAULT '0', \`sort\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`content_comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`commentContent\` text NOT NULL, \`contentId\` int NOT NULL, \`userId\` int NOT NULL, \`parentId\` int NOT NULL DEFAULT '0', \`likeCount\` int NOT NULL DEFAULT '0', \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contents\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`categoryId\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`sort\` int NOT NULL DEFAULT '0', \`viewCount\` int NOT NULL DEFAULT '0', \`commentCount\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`menus\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`icon\` varchar(255) NULL, \`path\` varchar(255) NULL, \`visible\` tinyint NOT NULL DEFAULT 1, \`sort\` int NOT NULL DEFAULT '0', \`parentId\` int NULL, \`roles\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vip_levels\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`duration\` int NOT NULL, \`benefits\` text NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`sort\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vip_orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`orderNo\` varchar(255) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`status\` enum ('pending', 'paid', 'cancelled') NOT NULL DEFAULT 'pending', \`paymentMethod\` varchar(255) NULL, \`paymentTime\` datetime NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`vipLevelId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`system_configs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`emailConfig\` json NOT NULL, \`smsConfig\` json NOT NULL, \`securityConfig\` json NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`advertisements\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`linkUrl\` varchar(255) NOT NULL, \`position\` enum ('HOME_BANNER', 'HOME_SIDEBAR', 'ARTICLE_TOP', 'ARTICLE_BOTTOM', 'ARTICLE_SIDEBAR', 'CATEGORY_TOP', 'CATEGORY_BOTTOM', 'POPUP', 'FLOAT') NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`startDate\` datetime NULL, \`endDate\` datetime NULL, \`order\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sms_logs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`content\` text NULL, \`isUsed\` tinyint NOT NULL DEFAULT 0, \`usedAt\` datetime NULL, \`retryCount\` int NOT NULL DEFAULT '0', \`lastRetryAt\` datetime NULL, \`isSuccess\` tinyint NOT NULL DEFAULT 1, \`response\` text NULL, \`error\` text NULL, \`type\` varchar(50) NOT NULL DEFAULT 'VERIFICATION', \`expiredAt\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`content_attribute_values\` ADD CONSTRAINT \`FK_1c2ddca267225a072ce47310492\` FOREIGN KEY (\`attributeId\`) REFERENCES \`content_attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_attribute_relations\` ADD CONSTRAINT \`FK_a78154f5e82df8d14605ee81b1c\` FOREIGN KEY (\`contentId\`) REFERENCES \`contents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_attribute_relations\` ADD CONSTRAINT \`FK_b6b1fc5cbb183e08f5f4273f593\` FOREIGN KEY (\`attributeValueId\`) REFERENCES \`content_attribute_values\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_categories\` ADD CONSTRAINT \`FK_a03aea27707893300382b6f18ae\` FOREIGN KEY (\`parentId\`) REFERENCES \`content_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_comments\` ADD CONSTRAINT \`FK_3b7a59f47df0b7facdf400c5a2a\` FOREIGN KEY (\`contentId\`) REFERENCES \`contents\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_comments\` ADD CONSTRAINT \`FK_3ec3e32832bd75f0fe472f2cc03\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`content_comments\` ADD CONSTRAINT \`FK_982a849f676860e5d6beb607f20\` FOREIGN KEY (\`parentId\`) REFERENCES \`content_comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD CONSTRAINT \`FK_c59e928ccd0290a644b90d5bf60\` FOREIGN KEY (\`categoryId\`) REFERENCES \`content_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_8523e13f1ba719e16eb474657ec\` FOREIGN KEY (\`parentId\`) REFERENCES \`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vip_orders\` ADD CONSTRAINT \`FK_c5630e241d83672e4f028b1baaf\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vip_orders\` ADD CONSTRAINT \`FK_7a4673c84bd3a6d0cf1f8876d74\` FOREIGN KEY (\`vipLevelId\`) REFERENCES \`vip_levels\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vip_orders\` DROP FOREIGN KEY \`FK_7a4673c84bd3a6d0cf1f8876d74\``);
        await queryRunner.query(`ALTER TABLE \`vip_orders\` DROP FOREIGN KEY \`FK_c5630e241d83672e4f028b1baaf\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_8523e13f1ba719e16eb474657ec\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP FOREIGN KEY \`FK_c59e928ccd0290a644b90d5bf60\``);
        await queryRunner.query(`ALTER TABLE \`content_comments\` DROP FOREIGN KEY \`FK_982a849f676860e5d6beb607f20\``);
        await queryRunner.query(`ALTER TABLE \`content_comments\` DROP FOREIGN KEY \`FK_3ec3e32832bd75f0fe472f2cc03\``);
        await queryRunner.query(`ALTER TABLE \`content_comments\` DROP FOREIGN KEY \`FK_3b7a59f47df0b7facdf400c5a2a\``);
        await queryRunner.query(`ALTER TABLE \`content_categories\` DROP FOREIGN KEY \`FK_a03aea27707893300382b6f18ae\``);
        await queryRunner.query(`ALTER TABLE \`content_attribute_relations\` DROP FOREIGN KEY \`FK_b6b1fc5cbb183e08f5f4273f593\``);
        await queryRunner.query(`ALTER TABLE \`content_attribute_relations\` DROP FOREIGN KEY \`FK_a78154f5e82df8d14605ee81b1c\``);
        await queryRunner.query(`ALTER TABLE \`content_attribute_values\` DROP FOREIGN KEY \`FK_1c2ddca267225a072ce47310492\``);
        await queryRunner.query(`DROP TABLE \`sms_logs\``);
        await queryRunner.query(`DROP TABLE \`advertisements\``);
        await queryRunner.query(`DROP TABLE \`system_configs\``);
        await queryRunner.query(`DROP TABLE \`vip_orders\``);
        await queryRunner.query(`DROP TABLE \`vip_levels\``);
        await queryRunner.query(`DROP TABLE \`menus\``);
        await queryRunner.query(`DROP TABLE \`contents\``);
        await queryRunner.query(`DROP TABLE \`content_comments\``);
        await queryRunner.query(`DROP TABLE \`content_categories\``);
        await queryRunner.query(`DROP TABLE \`content_attribute_relations\``);
        await queryRunner.query(`DROP TABLE \`content_attribute_values\``);
        await queryRunner.query(`DROP TABLE \`content_attributes\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
