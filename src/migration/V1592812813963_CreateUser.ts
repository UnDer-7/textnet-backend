import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUser1592812813963 implements MigrationInterface {
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
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

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('USERS', true)
  }
}
