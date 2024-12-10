import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfig1733812687751 implements MigrationInterface {
    name = 'AddConfig1733812687751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`emailConfig\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`smsConfig\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`securityConfig\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`key\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD UNIQUE INDEX \`IDX_5aff9a6d272a5cedf54d7aaf61\` (\`key\`)`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`value\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`type\` varchar(255) NOT NULL DEFAULT 'string'`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`sort\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`sort\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`type\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`value\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP INDEX \`IDX_5aff9a6d272a5cedf54d7aaf61\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` DROP COLUMN \`key\``);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`securityConfig\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`smsConfig\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`system_configs\` ADD \`emailConfig\` json NOT NULL`);
    }

}
