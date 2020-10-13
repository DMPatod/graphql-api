import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomerTable1602591964914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'id',
            type: 'int8',
            isGenerated: true,
            isPrimary: true,
          },
          { name: 'first_name', type: 'varchar' },
          { name: 'last_name', type: 'varchar' },
          { name: 'email', type: 'varchar' },
          { name: 'gender', type: 'varchar' },
          { name: 'company', type: 'varchar' },
          { name: 'city', type: 'varchar' },
          { name: 'title', type: 'varchar' },
          { name: 'lat', type: 'varchar', isNullable: true },
          { name: 'long', type: 'varchar', isNullable: true },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase('customer');
  }
}
