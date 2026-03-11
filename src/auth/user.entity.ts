import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: number;
  @Column()
  //   @IsNotEmpty()
  username: string;
  @Column()
  password: string;
}
