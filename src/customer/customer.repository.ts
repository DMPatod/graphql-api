import { EntityRepository, Repository } from 'typeorm';
import { Customer } from './customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  async findCustomersCitys(): Promise<Customer[]> {
    return await this.createQueryBuilder('customer')
      .select('city, Count(*)')
      .groupBy('city')
      .orderBy('city', 'ASC')
      .getRawMany();
  }
}
