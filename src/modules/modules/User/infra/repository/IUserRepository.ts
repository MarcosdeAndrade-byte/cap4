import { IUserDTO } from '../../DTO/IUserDTO';

interface IUserRepository {
  createUser(
    age: number,
    name: string,
    cpf: string,
    email: string,
    password: string
  ): Promise<IUserDTO>;
  findByEmail(email: string): Promise<IUserDTO>;
  updateUser(id: string, age: number, name: string, cpf: string): Promise<void>;
  findById(id: string): Promise<IUserDTO>;
  delete(id: string): Promise<void>;
}

export { IUserRepository };
