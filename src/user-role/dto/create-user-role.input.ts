import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRoleCreateDto {
  @Field()
  id: string;
  @Field()
  roleName: string;
}
