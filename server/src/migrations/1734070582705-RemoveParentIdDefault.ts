import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveParentIdDefault1734070582705 implements MigrationInterface {
    name = 'RemoveParentIdDefault1734070582705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content_categories\` ALTER COLUMN \`parentId\` DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content_categories\` ALTER COLUMN \`parentId\` SET DEFAULT 0`);
    }
} 