import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrdersTable1734370582710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 删除旧的 vip_orders 表
    await queryRunner.dropTable('vip_orders', true);

    // 创建新的 orders 表
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'orderNo',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['content', 'vip'],
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'paid', 'cancelled', 'refunded', 'expired'],
            default: "'pending'",
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'originalAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'discountAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0,
          },
          {
            name: 'paymentMethod',
            type: 'enum',
            enum: ['alipay', 'wechat', 'balance'],
            isNullable: true,
          },
          {
            name: 'paymentTime',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'paymentNo',
            type: 'varchar',
            length: '100',
            isNullable: true,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'contentId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'vipLevelId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'expireTime',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'meta',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'remark',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'cancelTime',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'cancelReason',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'refundTime',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'refundAmount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'refundReason',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // 添加外键约束
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['contentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'contents',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['vipLevelId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vip_levels',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 删除外键约束
    const table = await queryRunner.getTable('orders');
    const foreignKeys = table?.foreignKeys || [];
    for (const foreignKey of foreignKeys) {
      await queryRunner.dropForeignKey('orders', foreignKey);
    }

    // 删除 orders 表
    await queryRunner.dropTable('orders');

    // 重新创建 vip_orders 表
    await queryRunner.createTable(
      new Table({
        name: 'vip_orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'orderNo',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'vipLevelId',
            type: 'int',
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'paid', 'cancelled'],
            default: "'pending'",
          },
          {
            name: 'paymentMethod',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'paymentTime',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // 添加外键约束
    await queryRunner.createForeignKey(
      'vip_orders',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vip_orders',
      new TableForeignKey({
        columnNames: ['vipLevelId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vip_levels',
        onDelete: 'CASCADE',
      }),
    );
  }
} 