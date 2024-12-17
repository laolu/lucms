import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ModifyContentModelAttributesTables1734370582715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. 备份现有数据
    await queryRunner.query(`
      CREATE TEMPORARY TABLE content_model_attributes_backup AS
      SELECT modelId, attributeId FROM content_model_attributes;
    `);

    await queryRunner.query(`
      CREATE TEMPORARY TABLE content_model_attribute_values_backup AS
      SELECT modelId, attributeValueId, isEnabled, sort FROM content_model_attribute_values;
    `);

    // 2. 删除旧表
    await queryRunner.query(`DROP TABLE content_model_attributes;`);
    await queryRunner.query(`DROP TABLE content_model_attribute_values;`);

    // 3. 创建新表 content_model_attributes
    await queryRunner.query(`
      CREATE TABLE content_model_attributes (
        modelId int NOT NULL,
        attributeId int NOT NULL,
        createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (modelId, attributeId),
        FOREIGN KEY (modelId) REFERENCES content_models(id) ON DELETE CASCADE,
        FOREIGN KEY (attributeId) REFERENCES content_attributes(id) ON DELETE CASCADE
      );
    `);

    // 4. 创建新表 content_model_attribute_values
    await queryRunner.query(`
      CREATE TABLE content_model_attribute_values (
        modelId int NOT NULL,
        attributeId int NOT NULL,
        attributeValueId int NOT NULL,
        isEnabled boolean NOT NULL DEFAULT true,
        sort int NOT NULL DEFAULT 0,
        createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (modelId, attributeId, attributeValueId),
        FOREIGN KEY (modelId) REFERENCES content_models(id) ON DELETE CASCADE,
        FOREIGN KEY (attributeId) REFERENCES content_attributes(id) ON DELETE CASCADE,
        FOREIGN KEY (attributeValueId) REFERENCES content_attribute_values(id) ON DELETE CASCADE
      );
    `);

    // 5. 恢复数据到新表
    await queryRunner.query(`
      INSERT INTO content_model_attributes (modelId, attributeId)
      SELECT modelId, attributeId FROM content_model_attributes_backup;
    `);

    await queryRunner.query(`
      INSERT INTO content_model_attribute_values (modelId, attributeValueId, isEnabled, sort, attributeId)
      SELECT b.modelId, b.attributeValueId, b.isEnabled, b.sort, av.attributeId
      FROM content_model_attribute_values_backup b
      JOIN content_attribute_values av ON av.id = b.attributeValueId;
    `);

    // 6. 删除临时表
    await queryRunner.query(`DROP TABLE content_model_attributes_backup;`);
    await queryRunner.query(`DROP TABLE content_model_attribute_values_backup;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. 备份现有数据
    await queryRunner.query(`
      CREATE TEMPORARY TABLE content_model_attributes_backup AS
      SELECT modelId, attributeId FROM content_model_attributes;
    `);

    await queryRunner.query(`
      CREATE TEMPORARY TABLE content_model_attribute_values_backup AS
      SELECT modelId, attributeValueId, isEnabled, sort FROM content_model_attribute_values;
    `);

    // 2. 删除新表
    await queryRunner.query(`DROP TABLE content_model_attributes;`);
    await queryRunner.query(`DROP TABLE content_model_attribute_values;`);

    // 3. 创建旧表 content_model_attributes
    await queryRunner.query(`
      CREATE TABLE content_model_attributes (
        modelId int NOT NULL,
        attributeId int NOT NULL,
        PRIMARY KEY (modelId, attributeId),
        FOREIGN KEY (modelId) REFERENCES content_models(id) ON DELETE CASCADE,
        FOREIGN KEY (attributeId) REFERENCES content_attributes(id) ON DELETE CASCADE
      );
    `);

    // 4. 创建旧表 content_model_attribute_values
    await queryRunner.query(`
      CREATE TABLE content_model_attribute_values (
        modelId int NOT NULL,
        attributeValueId int NOT NULL,
        isEnabled boolean NOT NULL DEFAULT true,
        sort int NOT NULL DEFAULT 0,
        PRIMARY KEY (modelId, attributeValueId),
        FOREIGN KEY (modelId) REFERENCES content_models(id) ON DELETE CASCADE,
        FOREIGN KEY (attributeValueId) REFERENCES content_attribute_values(id) ON DELETE CASCADE
      );
    `);

    // 5. 恢复数据到旧表
    await queryRunner.query(`
      INSERT INTO content_model_attributes (modelId, attributeId)
      SELECT modelId, attributeId FROM content_model_attributes_backup;
    `);

    await queryRunner.query(`
      INSERT INTO content_model_attribute_values (modelId, attributeValueId, isEnabled, sort)
      SELECT modelId, attributeValueId, isEnabled, sort FROM content_model_attribute_values_backup;
    `);

    // 6. 删除临时表
    await queryRunner.query(`DROP TABLE content_model_attributes_backup;`);
    await queryRunner.query(`DROP TABLE content_model_attribute_values_backup;`);
  }
} 