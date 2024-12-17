import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateContentModelsTable1734370582711 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 创建内容模型表
    await queryRunner.createTable(
      new Table({
        name: "content_models",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "50",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "sort",
            type: "int",
            default: 0,
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // 创建内容模型-属性关联表
    await queryRunner.createTable(
      new Table({
        name: "content_model_attributes",
        columns: [
          {
            name: "modelId",
            type: "int",
            isPrimary: true,
          },
          {
            name: "attributeId",
            type: "int",
            isPrimary: true,
          },
        ],
      }),
      true
    );

    // 添加外键约束
    await queryRunner.createForeignKey(
      "content_model_attributes",
      new TableForeignKey({
        columnNames: ["modelId"],
        referencedColumnNames: ["id"],
        referencedTableName: "content_models",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "content_model_attributes",
      new TableForeignKey({
        columnNames: ["attributeId"],
        referencedColumnNames: ["id"],
        referencedTableName: "content_attributes",
        onDelete: "CASCADE",
      })
    );

    // 在内容分类表���添加模型ID字段
    await queryRunner.query(`
      ALTER TABLE content_categories
      ADD COLUMN modelId int NULL,
      ADD CONSTRAINT FK_content_categories_model
      FOREIGN KEY (modelId) REFERENCES content_models(id)
      ON DELETE SET NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 删除外键约束
    await queryRunner.query(`
      ALTER TABLE content_categories
      DROP FOREIGN KEY FK_content_categories_model,
      DROP COLUMN modelId;
    `);

    // 删除内容模型-属性关联表
    await queryRunner.dropTable("content_model_attributes");

    // 删除内容模型表
    await queryRunner.dropTable("content_models");
  }
} 