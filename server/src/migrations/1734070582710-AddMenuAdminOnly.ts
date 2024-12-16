import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddMenuAdminOnly1734070582710 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'menus',
      new TableColumn({
        name: 'adminOnly',
        type: 'boolean',
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('menus', 'adminOnly');
  }
} 