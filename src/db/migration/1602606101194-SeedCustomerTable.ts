import { Customer } from 'src/customer/customer.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { CustomerSeeds } from '../seed/customer.seed';

export class SeedCustomerTable1602606101194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const repo = queryRunner.manager.getRepository(Customer);
    await repo.save(CustomerSeeds);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
