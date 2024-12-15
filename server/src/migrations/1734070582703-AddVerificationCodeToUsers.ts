import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddVerificationCodeToUsers1734070582703 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({
                name: 'verificationCode',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new TableColumn({
                name: 'verificationCodeExpiredAt',
                type: 'datetime',
                isNullable: true,
            }),
            new TableColumn({
                name: 'resetPasswordToken',
                type: 'varchar',
                length: '255',
                isNullable: true,
            }),
            new TableColumn({
                name: 'resetPasswordTokenExpiredAt',
                type: 'datetime',
                isNullable: true,
            }),
            new TableColumn({
                name: 'loginAttempts',
                type: 'int',
                default: 0,
            }),
            new TableColumn({
                name: 'lockoutUntil',
                type: 'datetime',
                isNullable: true,
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users', [
            'verificationCode',
            'verificationCodeExpiredAt',
            'resetPasswordToken',
            'resetPasswordTokenExpiredAt',
            'loginAttempts',
            'lockoutUntil',
        ])
    }
} 