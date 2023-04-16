import { container } from 'tsyringe';
import { IUserRepository } from '../../modules/modules/User/infra/repository/IUserRepository';
import { UserRepository } from '../../modules/modules/User/infra/repository/UserRepository/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
