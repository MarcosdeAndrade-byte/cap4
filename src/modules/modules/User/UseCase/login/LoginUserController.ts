import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginUserUseCase } from './LoginUserUseCase';

class LoginUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const createUserUseCase = container.resolve(LoginUserUseCase);
      const user = await createUserUseCase.execute(email, password);

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { LoginUserController };
