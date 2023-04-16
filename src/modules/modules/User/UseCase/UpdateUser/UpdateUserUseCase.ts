/* eslint-disable comma-dangle */
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../infra/repository/IUserRepository';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(
    name: string,
    age: number,
    cpf: string,
    email: string,
    id: string
  ): Promise<void> {
    const userVerificationExist = await this.userRepository.findByEmail(email);

    if (userVerificationExist) {
      throw new Error('Esse email já foi cadastrado!');
    }

    this.userRepository.updateUser(id, age, name, cpf);
  }
}

export { UpdateUserUseCase };
