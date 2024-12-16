import { MigrationInterface, QueryRunner } from "typeorm";
import { AttributeType } from "../modules/content/entities/content-attribute.entity";

export class AddContentAttributeTestData1734070582706 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. 软件类型（单选）
        const softwareAttribute = await queryRunner.manager.query(`
            INSERT INTO content_attributes (name, type, sort, isActive, createdAt, updatedAt)
            VALUES ('软件类型', '${AttributeType.SINGLE}', 1, 1, NOW(), NOW())
        `);
        const softwareAttributeId = softwareAttribute.insertId;

        const softwareValues = [
            'Maya', '3ds Max', 'ZBrush', 'Blender', 'Cinema 4D',
            'Houdini', 'Substance Painter', 'Substance Designer', 'Marmoset Toolbag',
            'Unreal Engine', 'Unity'
        ];
        for (let i = 0; i < softwareValues.length; i++) {
            await queryRunner.query(`
                INSERT INTO content_attribute_values (value, sort, isActive, attributeId)
                VALUES (?, ?, 1, ?)
            `, [softwareValues[i], i + 1, softwareAttributeId]);
        }

        // 2. 难度等级（单选）
        const levelAttribute = await queryRunner.manager.query(`
            INSERT INTO content_attributes (name, type, sort, isActive, createdAt, updatedAt)
            VALUES ('难度等级', '${AttributeType.SINGLE}', 2, 1, NOW(), NOW())
        `);
        const levelAttributeId = levelAttribute.insertId;

        const levelValues = ['入门', '进阶', '高级', '专家'];
        for (let i = 0; i < levelValues.length; i++) {
            await queryRunner.query(`
                INSERT INTO content_attribute_values (value, sort, isActive, attributeId)
                VALUES (?, ?, 1, ?)
            `, [levelValues[i], i + 1, levelAttributeId]);
        }

        // 3. 适用领域（多选）
        const fieldAttribute = await queryRunner.manager.query(`
            INSERT INTO content_attributes (name, type, sort, isActive, createdAt, updatedAt)
            VALUES ('适用领域', '${AttributeType.MULTIPLE}', 3, 1, NOW(), NOW())
        `);
        const fieldAttributeId = fieldAttribute.insertId;

        const fieldValues = [
            '游戏', '动画', '建筑', '产品', '影视',
            '室内设计', '角色设计', '场景设计', '特效设计'
        ];
        for (let i = 0; i < fieldValues.length; i++) {
            await queryRunner.query(`
                INSERT INTO content_attribute_values (value, sort, isActive, attributeId)
                VALUES (?, ?, 1, ?)
            `, [fieldValues[i], i + 1, fieldAttributeId]);
        }

        // 4. 文件格式（多选）
        const formatAttribute = await queryRunner.manager.query(`
            INSERT INTO content_attributes (name, type, sort, isActive, createdAt, updatedAt)
            VALUES ('文件格式', '${AttributeType.MULTIPLE}', 4, 1, NOW(), NOW())
        `);
        const formatAttributeId = formatAttribute.insertId;

        const formatValues = [
            'FBX', 'OBJ', 'MAX', 'MB/MA', 'ZTL',
            'BLEND', 'C4D', 'HIP', 'UASSET', 'UNITY'
        ];
        for (let i = 0; i < formatValues.length; i++) {
            await queryRunner.query(`
                INSERT INTO content_attribute_values (value, sort, isActive, attributeId)
                VALUES (?, ?, 1, ?)
            `, [formatValues[i], i + 1, formatAttributeId]);
        }

        // 5. 渲染器（单选）
        const rendererAttribute = await queryRunner.manager.query(`
            INSERT INTO content_attributes (name, type, sort, isActive, createdAt, updatedAt)
            VALUES ('渲染器', '${AttributeType.SINGLE}', 5, 1, NOW(), NOW())
        `);
        const rendererAttributeId = rendererAttribute.insertId;

        const rendererValues = [
            'V-Ray', 'Arnold', 'Redshift', 'Octane',
            'Cycles', 'Eevee', 'Corona', 'RenderMan'
        ];
        for (let i = 0; i < rendererValues.length; i++) {
            await queryRunner.query(`
                INSERT INTO content_attribute_values (value, sort, isActive, attributeId)
                VALUES (?, ?, 1, ?)
            `, [rendererValues[i], i + 1, rendererAttributeId]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除所有测试数据
        await queryRunner.query(`DELETE FROM content_attribute_values`);
        await queryRunner.query(`DELETE FROM content_attributes`);
    }
} 