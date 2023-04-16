import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../../infra/repository/IUserRepository';
import { User } from '../../entities/User';

@injectable()
class ListUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<User> {
    const userVerificationExist = await this.usersRepository.findById(id);

    if (!userVerificationExist) {
      throw new Error('Usuário não encontrado no sistema!');
    }

    const user = await this.usersRepository.findById(id);

    return user;
  }
}

export { ListUserUseCase };
