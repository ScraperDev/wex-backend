import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Listing } from '../listing';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToMany((type) => Listing, (listing) => listing.owner)
  public listings: Listing[];
}
