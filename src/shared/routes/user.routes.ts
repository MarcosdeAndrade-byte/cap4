import { Router } from 'express';
import { CreateUserController } from '../../modules/modules/User/UseCase/CreateUser/CreateUserController';
import { UpdateUserController } from '../../modules/modules/User/UseCase/UpdateUser/UpdateUserController';
import { DeleteUserController } from '../../modules/modules/User/UseCase/DeleteUser/DeleteUserController';
import { ListUserController } from '../../modules/modules/User/UseCase/ListUser/ListUserController';
import { LoginUserController } from '../../modules/modules/User/UseCase/login/LoginUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();
const loginUserController = new LoginUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/', updateUserController.handle);
userRoutes.delete('/:id', deleteUserController.handle);
userRoutes.get('/:id', listUserController.handle);
userRoutes.post('/login', loginUserController.handle);

export { userRoutes };
