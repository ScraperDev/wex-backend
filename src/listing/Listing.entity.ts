import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../user';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public active: boolean;

  @Column()
  public price: number;

  @Column()
  public volume: number;

  // if partial purchases are ok, be true.
  @Column()
  public partialOk: boolean;

  // if partialOK === false, this should === volume
  @Column()
  public minVolume: number;

  @ManyToOne((type) => User, (user) => user.listings)
  public owner: User;
}
