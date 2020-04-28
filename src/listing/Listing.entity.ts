import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { User } from '../user/User.entity';

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public active: boolean;

  @Column()
  public waterType: string;

  @Column()
  public waterAvailable: Date;

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

  @ManyToOne((type) => User, (owner) => owner.listings)
  public owner: User;
}
