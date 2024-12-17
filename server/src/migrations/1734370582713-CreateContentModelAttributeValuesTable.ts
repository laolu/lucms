import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateContentModelAttributeValuesTable1734370582713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 创建内容模型-属性值关联表
    await queryRunner.createTable(
      new Table({
        name: "content_model_attribute_values",
        columns: [
          {
            name: "modelId",
            type: "int",
            isPrimary: true,
          },
          {
            name: "attributeValueId",
            type: "int",
            isPrimary: true,
          },
          {
            name: "isEnabled",
            type: "boolean",
            default: true,
          },
          {
            name: "sort",
            type: "int",
            default: 0,
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

    // 添加外键约束
    await queryRunner.createForeignKey(
      "content_model_attribute_values",
      new TableForeignKey({
        columnNames: ["modelId"],
        referencedColumnNames: ["id"],
        referencedTableName: "content_models",
        onDelete: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "content_model_attribute_values",
      new TableForeignKey({
        columnNames: ["attributeValueId"],
        referencedColumnNames: ["id"],
        referencedTableName: "content_attribute_values",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 删除外键约束
    const table = await queryRunner.getTable("content_model_attribute_values");
    if (table) {
      const foreignKeys = table.foreignKeys;
      await Promise.all(
        foreignKeys.map((foreignKey) =>
          queryRunner.dropForeignKey("content_model_attribute_values", foreignKey)
        )
      );
    }

    // 删除表
    await queryRunner.dropTable("content_model_attribute_values");
  }
} 