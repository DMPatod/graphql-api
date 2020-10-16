import { Args, Query, Resolver } from '@nestjs/graphql';
import { CitysDto, CustomerDto, PaginatedCustomersDto } from './customer.dto';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';

@Resolver(of => Customer)
export class CustomerResolver {
  constructor(private readonly service: CustomerService) {}

  @Query(() => CustomerDto)
  async getCustomer(@Args('id') id: number) {
    return this.service.findOne(id);
  }

  @Query(() => PaginatedCustomersDto)
  async getCustomers(
    @Args('page', { nullable: true }) page: number,
    @Args('size', { nullable: true }) size: number,
  ) {
    return this.service.findAll(page, size);
  }

  @Query(() => PaginatedCustomersDto)
  async getCustomersByCity(
    @Args('city') city: string,
    @Args('page', { nullable: true }) page: number,
    @Args('size', { nullable: true }) size: number,
  ) {
    return this.service.findByCity(city, page, size);
  }

  @Query(() => [CitysDto])
  async getCustomersCitys(): Promise<Customer[]> {
    return this.service.findCustomersCitys();
  }
}
