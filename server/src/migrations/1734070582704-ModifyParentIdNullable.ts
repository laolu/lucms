import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyParentIdNullable1734070582704 implements MigrationInterface {
    name = 'ModifyParentIdNullable1734070582704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content_categories\` MODIFY \`parentId\` int NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`content_categories\` MODIFY \`parentId\` int NOT NULL DEFAULT 0`);
    }
} 