import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserRole {
  @Field()
  @PrimaryGeneratedColumn()
  id: string;
  @Field()
  @Column()
  roleName: string;
}
