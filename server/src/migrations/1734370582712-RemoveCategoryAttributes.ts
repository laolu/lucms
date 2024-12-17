import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveCategoryAttributes1734370582712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. 删除 category_attribute_values 表的外键约束
    try {
      await queryRunner.query(`
        ALTER TABLE category_attribute_values
        DROP FOREIGN KEY FK_category_attribute_values_category_attribute;
      `);
    } catch (error) {
      // 忽略外键不存在的错误
    }

    try {
      await queryRunner.query(`
        ALTER TABLE category_attribute_values
        DROP FOREIGN KEY FK_category_attribute_values_attribute_value;
      `);
    } catch (error) {
      // 忽略外键不存在的错误
    }

    // 2. 删除 category_attributes 表的外键约束
    try {
      await queryRunner.query(`
        ALTER TABLE category_attributes
        DROP FOREIGN KEY FK_category_attributes_category;
      `);
    } catch (error) {
      // 忽略外键不存在的错误
    }

    try {
      await queryRunner.query(`
        ALTER TABLE category_attributes
        DROP FOREIGN KEY FK_category_attributes_attribute;
      `);
    } catch (error) {
      // 忽略外键不存在的错误
    }

    // 3. 删除 category_attribute_values 表
    await queryRunner.query(`DROP TABLE IF EXISTS category_attribute_values;`);

    // 4. 删除 category_attributes 表
    await queryRunner.query(`DROP TABLE IF EXISTS category_attributes;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. 重新创建 category_attributes 表
    await queryRunner.query(`
      CREATE TABLE category_attributes (
        id int NOT NULL AUTO_INCREMENT,
        categoryId int NOT NULL,
        attributeId int NOT NULL,
        isRequired boolean DEFAULT true,
        sort int DEFAULT 0,
        createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
        updatedAt timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT FK_category_attributes_category FOREIGN KEY (categoryId) REFERENCES content_categories (id) ON DELETE CASCADE,
        CONSTRAINT FK_category_attributes_attribute FOREIGN KEY (attributeId) REFERENCES content_attributes (id) ON DELETE CASCADE
      );
    `);

    // 2. 重新创建 category_attribute_values 表
    await queryRunner.query(`
      CREATE TABLE category_attribute_values (
        id int NOT NULL AUTO_INCREMENT,
        categoryAttributeId int NOT NULL,
        attributeValueId int NOT NULL,
        isEnabled boolean DEFAULT true,
        sort int DEFAULT 0,
        createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
        updatedAt timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT FK_category_attribute_values_category_attribute FOREIGN KEY (categoryAttributeId) REFERENCES category_attributes (id) ON DELETE CASCADE,
        CONSTRAINT FK_category_attribute_values_attribute_value FOREIGN KEY (attributeValueId) REFERENCES content_attribute_values (id) ON DELETE CASCADE
      );
    `);
  }
} 