import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserRoleCreateDto } from './dto/create-user-role.input';
import { UserRoleUpdateDto } from './dto/update-user-role.input';
import { UserRole } from './entities/user-role.entity';
import { UserRoleService } from './user-role.service';

@Resolver(() => UserRole)
export class UserRoleResolver {
  constructor(private userRoleService: UserRoleService) {}
  @Query(() => [UserRole], { name: 'getAllUserRoles' })
  getAll() {
    return this.userRoleService.getAll();
  }

  @Mutation(() => UserRole, { name: 'createUserRole' })
  create(@Args('userroleInput') userrole: UserRoleCreateDto) {
    return this.userRoleService.create(userrole);
  }

  @Mutation(() => UserRole, { name: 'updateUserRole' })
  updateUserRole(@Args('updateUserRole') UserRoleUpdateDto: UserRoleUpdateDto) {
    return this.userRoleService.update(UserRoleUpdateDto.id, UserRoleUpdateDto);
  }

  @Mutation(() => UserRole, { name: 'deleteUserRole' })
  removeStudent(@Args('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
