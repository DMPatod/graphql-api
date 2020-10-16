import { Field, ObjectType } from '@nestjs/graphql';
import { Customer } from './customer.entity';

@ObjectType()
export class CustomerDto {
  @Field() readonly id?: number;
  @Field() readonly first_name: string;
  @Field() readonly last_name: string;
  @Field() readonly email: string;
  @Field() readonly gender: string;
  @Field() readonly company: string;
  @Field() readonly city: string;
  @Field() readonly title: string;
  @Field({ nullable: true }) readonly lat?: string;
  @Field({ nullable: true }) readonly long?: string;
}

@ObjectType()
export class PaginatedCustomersDto {
  @Field(type => [CustomerDto]) readonly data: CustomerDto[];
  @Field() readonly totalCount: number;
}

@ObjectType()
export class CitysDto {
  @Field() readonly city: string;
  @Field() readonly count: number;
}
