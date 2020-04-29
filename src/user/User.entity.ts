import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
// this breaks if I use an index so I'm providing the full relative path
import { Listing } from '../listing/Listing.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ default: false })
  public admin: boolean;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToMany((type) => Listing, (listing) => listing.owner)
  public listings: Listing[];
}
