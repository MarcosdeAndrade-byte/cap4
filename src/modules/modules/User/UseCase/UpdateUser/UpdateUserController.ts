import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, age, cpf, email, id } = request.body;

      const createUserUseCase = container.resolve(UpdateUserUseCase);
      await createUserUseCase.execute(name, age, cpf, email, id);

      return response.status(200).send('OK');
    } catch (error) {
      return response.status(400).send(error.message);
    }
  }
}

export { UpdateUserController };
