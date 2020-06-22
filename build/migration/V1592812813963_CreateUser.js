"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
class CreateUser1592812813963 {
    async down(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'USERS',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isNullable: false,
                    isPrimary: true,
                    isUnique: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
            ],
        }));
    }
    async up(queryRunner) {
        await queryRunner.dropTable('USERS', true);
    }
}
exports.default = CreateUser1592812813963;
