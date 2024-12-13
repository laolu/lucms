import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt'

export class AddAdminUser1734070582700 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await bcrypt.hash('admin123', 10)
        
        await queryRunner.query(`
            INSERT INTO users (
                username,
                email,
                password,
                isAdmin,
                isActive,
                createdAt,
                updatedAt
            ) VALUES (
                'admin',
                'admin@qq.com',
                '${hashedPassword}',
                1,
                1,
                NOW(),
                NOW()
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM users WHERE email = 'admin@lucms.com'
        `)
    }
}
