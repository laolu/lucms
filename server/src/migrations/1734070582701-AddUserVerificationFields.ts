import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserVerificationFields1734070582701 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 添加验证相关字段
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN verificationCode varchar(255) NULL,
            ADD COLUMN verificationCodeExpiredAt datetime NULL,
            ADD COLUMN resetPasswordToken varchar(255) NULL,
            ADD COLUMN resetPasswordTokenExpiredAt datetime NULL,
            ADD COLUMN loginAttempts int NOT NULL DEFAULT 0,
            ADD COLUMN lockoutUntil datetime NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除添加的字段
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN verificationCode,
            DROP COLUMN verificationCodeExpiredAt,
            DROP COLUMN resetPasswordToken,
            DROP COLUMN resetPasswordTokenExpiredAt,
            DROP COLUMN loginAttempts,
            DROP COLUMN lockoutUntil;
        `);
    }
} 