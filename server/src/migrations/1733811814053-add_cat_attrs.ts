import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCatAttrs1733811814053 implements MigrationInterface {
    name = 'AddCatAttrs1733811814053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`category_attribute_values\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryAttributeId\` int NOT NULL, \`attributeValueId\` int NOT NULL, \`isEnabled\` tinyint NOT NULL DEFAULT 1, \`sort\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_attributes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`categoryId\` int NOT NULL, \`attributeId\` int NOT NULL, \`isRequired\` tinyint NOT NULL DEFAULT 1, \`sort\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category_attribute_values\` ADD CONSTRAINT \`FK_c9350e575235092c087012c7afd\` FOREIGN KEY (\`categoryAttributeId\`) REFERENCES \`category_attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_attribute_values\` ADD CONSTRAINT \`FK_c1ab5224ee3ac2d6336d332122f\` FOREIGN KEY (\`attributeValueId\`) REFERENCES \`content_attribute_values\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_attributes\` ADD CONSTRAINT \`FK_38209e8493459f8b98aa107be2b\` FOREIGN KEY (\`categoryId\`) REFERENCES \`content_categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_attributes\` ADD CONSTRAINT \`FK_4eeba7ff3f73d77a0884341456e\` FOREIGN KEY (\`attributeId\`) REFERENCES \`content_attributes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_attributes\` DROP FOREIGN KEY \`FK_4eeba7ff3f73d77a0884341456e\``);
        await queryRunner.query(`ALTER TABLE \`category_attributes\` DROP FOREIGN KEY \`FK_38209e8493459f8b98aa107be2b\``);
        await queryRunner.query(`ALTER TABLE \`category_attribute_values\` DROP FOREIGN KEY \`FK_c1ab5224ee3ac2d6336d332122f\``);
        await queryRunner.query(`ALTER TABLE \`category_attribute_values\` DROP FOREIGN KEY \`FK_c9350e575235092c087012c7afd\``);
        await queryRunner.query(`DROP TABLE \`category_attributes\``);
        await queryRunner.query(`DROP TABLE \`category_attribute_values\``);
    }

}
