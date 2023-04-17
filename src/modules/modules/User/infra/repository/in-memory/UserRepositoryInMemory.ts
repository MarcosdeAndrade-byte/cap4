import { v4 as uuidv4 } from 'uuid';
import { IUserDTO } from '../../../DTO/IUserDTO';
import { IUserRepository } from '../IUserRepository';

class UserRepositoryInMemory implements IUserRepository {
  private users: IUserDTO[];

  constructor() {
    this.users = [];
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
    date: Date
  ): Promise<void> {
    const user = this.users.find((u) => u._id === userId);
    if (user) {
      user.refreshToken = { refToken: refreshToken, createdAt: date };
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((u) => u._id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async updateUser(
    id: string,
    age: number,
    name: string,
    cpf: string
  ): Promise<void> {
    const user = this.users.find((u) => u._id === id);
    if (user) {
      user.age = age;
      user.name = name;
      user.cpf = cpf;
    }
  }

  async findByEmail(email: string): Promise<IUserDTO> {
    const user = this.users.find((u) => u.email === email);
    return user;
  }

  async createUser(
    age: number,
    name: string,
    cpf: string,
    email: string,
    password: string
  ): Promise<IUserDTO> {
    const user: IUserDTO = {
      _id: uuidv4(),
      age,
      name,
      cpf,
      email,
      password,
      refreshToken: { refToken: null, createdAt: null },
    };

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<IUserDTO> {
    const user = this.users.find((u) => u._id === id);
    return user || null;
  }
}

export { UserRepositoryInMemory };
