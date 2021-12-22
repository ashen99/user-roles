import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRoleCreateDto } from './dto/create-user-role.input';
import { UserRoleUpdateDto } from './dto/update-user-role.input';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  // private permissions: number[] = [];

  async getAll(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }

  async create(userole: UserRoleCreateDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create(userole);
    return this.userRoleRepository.save(userRole);
  }

  async update(id: string, userrole: UserRoleUpdateDto): Promise<UserRole> {
    const { roleName } = userrole;
    const user = await this.findOne(id);

    if (roleName) {
      user.roleName = roleName;
    }

    return this.userRoleRepository.save(user);
  }

  findOne(id: string) {
    return this.userRoleRepository.findOne(id);
  }

  async remove(id: string) {
    let usr = this.findOne(id);
    if (usr) {
      let ret = await this.userRoleRepository.delete(id);
      if (ret.affected === 1) {
        return usr;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`);
  }
}
