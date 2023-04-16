import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUserUseCase } from './ListUserUseCase';

class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listUserUseCase = container.resolve(ListUserUseCase);
    const user = await listUserUseCase.execute(id);

    return response.status(200).json(user);
  }
}

export { ListUserController };
