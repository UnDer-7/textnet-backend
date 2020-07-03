import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class User1592829009249 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
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
            generationStrategy: 'increment',
          },
          {
            name: 'version',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'cellphone',
            type: 'varchar',
            length: '11',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'birthDate',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'googleId',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'facebookId',
            type: 'varchar',
            length: '255',
            isNullable: true
          }
          ],
      }));
      await queryRunner.query(`CREATE TYPE UserType as ENUM ('PASSWORD_USER', 'GOOGLE_USER', 'FACEBOOK_USER');`);
      await queryRunner.addColumn('USERS', new TableColumn({
        name: 'type',
        type: 'UserType',
        isNullable: false,
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('USERS', true)
      await queryRunner.query('DROP TYPE UserType')
    }
}
