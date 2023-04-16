import { injectable, inject } from 'tsyringe';
import { IUserRepository } from '../../infra/repository/IUserRepository';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
