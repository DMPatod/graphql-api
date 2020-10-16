import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Axios from 'axios';
import { Like } from 'typeorm';
import { Customer, PaginatedCustomer } from './customer.entity';
import { CustomerRepository } from './customer.repository';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repository: CustomerRepository,
  ) {}

  async findOne(id: number): Promise<Customer> {
    let customer = await this.repository.findOne(id);
    if (customer.lat === null && customer.long === null) {
      var respApi = await Axios.get(
        'https://maps.googleapis.com/maps/api/geocode/json',
        {
          params: {
            address: customer.city,
            key: 'AIzaSyDlXWMyc9cMh95MXAsshxco2OYO7O1sPRA',
          },
        },
      );
      var location = { lat: null, lng: null };
      try {
        location = respApi.data.results[0].geometry.location;
      } catch (err) {
        Logger.log('error on item -> ' + customer.id);
      }
      customer = { ...customer, lat: location.lat, long: location.lng };
      await this.repository.update(id, customer);
    }
    return customer;
  }

  async findAll(page?: number, size?: number): Promise<PaginatedCustomer> {
    const [result, total] = await this.repository.findAndCount({
      order: { id: 'ASC' },
      take: size || 10,
      skip: page * size || 0,
    });

    return {
      data: result,
      totalCount: total,
    };
  }

  async findByCity(
    city: string,
    page?: number,
    size?: number,
  ): Promise<PaginatedCustomer> {
    const [result, total] = await this.repository.findAndCount({
      where: {
        city: Like(`%${city}%`),
      },
      take: size || 10,
      skip: page * size || 0,
    });

    return {
      data: result,
      totalCount: total,
    };
  }

  async findCustomersCitys(): Promise<Customer[]> {
    return this.repository.findCustomersCitys();
  }
}
