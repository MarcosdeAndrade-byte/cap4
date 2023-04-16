import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';
import { IUserRepository } from '../../infra/repository/IUserRepository';
import { IUserDTO } from '../../DTO/IUserDTO';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(
    name: string,
    age: number,
    cpf: string,
    email: string,
    password: string
  ): Promise<IUserDTO> {
    const userVerificationExist = await this.userRepository.findByEmail(email);

    if (userVerificationExist) {
      throw new Error('Esse email já foi cadastrado!');
    }

    const passwordHash = await hash(password, 8);
    const user = this.userRepository.createUser(
      age,
      name,
      cpf,
      email,
      passwordHash
    );

    return user;
  }
}

export { CreateUserUseCase };
