/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../modules/modules/User/infra/repository/UserRepository/UserRepository';

interface ITokenProperties {
  email: string;
  sub: string;
}

@injectable()
class AuthenticationMiddleware {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const authHeader = request.headers.authorization;

      if (!authHeader) {
        throw new Error('Token missing');
      }

      const [, token] = authHeader.split(' ');

      const { email, sub } = verify(token, 'SEGREDO') as ITokenProperties;

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error('Token inválido');
      }
    } catch (error) {
      return response.status(400).json(error);
    }

    next();
  }
}

export { AuthenticationMiddleware };
