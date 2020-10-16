import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  company: string;

  @Column()
  city: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  lat: string;

  @Column({ nullable: true })
  long: string;
}

export class PaginatedCustomer {
  data: Customer[];
  totalCount: number;
}
