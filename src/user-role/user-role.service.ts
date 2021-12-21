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

  private permissions: number[] = [];

  async getAll(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }

  async create(userole: UserRoleCreateDto): Promise<UserRole> {
    const userRole = this.userRoleRepository.create(userole);
    return this.userRoleRepository.save(userRole);
  }

  async update(id: string, userrole: UserRoleUpdateDto): Promise<UserRole> {
    try {
      const user = await this.userRoleRepository.findOne(id);
      user.id = userrole.id;
      user.roleName = userrole.roleName;
      return await this.userRoleRepository.update(user);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Record cannot find by id ${id}`);
    }
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
