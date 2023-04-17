import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../infra/repository/IUserRepository';

interface IUserLoginResponse {
  user: {
    _id: string;
    email: string;
    password: string;
    refreshToken: { refToken: null };
  };
  token: string;
}

@injectable()
class LoginUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute(email: string, password: string): Promise<IUserLoginResponse> {
    const userByEmail = await this.userRepository.findByEmail(email);

    if (!userByEmail) {
      throw new Error('Senha ou email incorretos');
    }

    const passwordVerification = await compare(password, userByEmail.password);

    if (!passwordVerification) {
      throw new Error('Senha ou email incorretos');
    }

    const token = jwt.sign({ email }, 'SEGREDO', {
      subject: String(userByEmail._id),
      expiresIn: '2m',
    });

    const refreshToken = jwt.sign({ email }, 'RefreshToken', {
      subject: String(userByEmail._id),
      expiresIn: '30d',
    });

    await this.userRepository.updateRefreshToken(
      userByEmail._id,
      refreshToken,
      new Date()
    );

    const user = await this.userRepository.findByEmail(email);

    const userInformationAndToken = {
      user,
      token,
    } as IUserLoginResponse;

    return userInformationAndToken;
  }
}

export { LoginUserUseCase };
