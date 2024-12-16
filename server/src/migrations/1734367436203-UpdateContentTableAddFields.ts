import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateContentTableAddFields1734367436203 implements MigrationInterface {
    name = 'UpdateContentTableAddFields1734367436203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menus\` DROP FOREIGN KEY \`FK_8523e13f1ba719e16eb474657ec\``);
        await queryRunner.query(`ALTER TABLE \`menus\` DROP COLUMN \`roles\``);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`thumbnail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`images\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`coverImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`bannerImage\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`price\` decimal(10,2) NOT NULL DEFAULT '0.00'`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`originalPrice\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`isFree\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`isVipFree\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`vipPrice\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`downloadUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`downloadPassword\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`extractPassword\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`likeCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`favoriteCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`shareCount\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`tags\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`meta\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`source\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`author\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` ADD \`publishedAt\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`publishedAt\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`author\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`source\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`meta\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`tags\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`shareCount\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`favoriteCount\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`likeCount\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`extractPassword\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`downloadPassword\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`downloadUrl\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`vipPrice\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`isVipFree\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`isFree\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`originalPrice\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`bannerImage\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`coverImage\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`images\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`thumbnail\``);
        await queryRunner.query(`ALTER TABLE \`contents\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD \`roles\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`menus\` ADD CONSTRAINT \`FK_8523e13f1ba719e16eb474657ec\` FOREIGN KEY (\`parentId\`) REFERENCES \`menus\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
