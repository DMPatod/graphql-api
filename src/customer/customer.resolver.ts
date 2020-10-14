import { Args, Query, Resolver } from '@nestjs/graphql';
import { CustomerDto } from './customer.dto';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Resolver(of => Customer)
export class CustomerResolver {
  constructor(private readonly service: CustomerService) {}

  @Query(() => CustomerDto)
  async getCustomer(@Args('id') id: number) {
    return this.service.findOne(id);
  }

  @Query(() => [CustomerDto])
  async getCustomers() {
    return this.service.findAll();
  }
}
