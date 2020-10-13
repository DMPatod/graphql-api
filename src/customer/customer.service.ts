import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Axios from 'axios';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private repository: Repository<Customer>,
  ) {}

  async findOne(id: number): Promise<Customer> {
    let customer = await this.repository.findOne(id);
    if (customer.lat === null && customer.long === null) {
      var respApi = await Axios.get(
        'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
        {
          params: {
            input: customer.city.split(',')[0],
            inputtype: 'textquery',
            fields: 'geometry',
            key: 'AIzaSyDlXWMyc9cMh95MXAsshxco2OYO7O1sPRA',
          },
        },
      );
      var location = { lat: null, lng: null };
      try {
        location = respApi.data.candidates[0].geometry.location;
      } catch (err) {
        Logger.log('error on item -> ' + customer.id);
      }
      customer = { ...customer, lat: location.lat, long: location.lng };
      await this.repository.update(id, customer);
    }
    return customer;
  }

  findAll(): Promise<Customer[]> {
    return this.repository.find();
  }
}
