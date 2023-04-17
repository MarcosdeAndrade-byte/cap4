import 'reflect-metadata';
import { describe, test, expect, beforeAll } from '@jest/globals';
import { UserRepositoryInMemory } from '../../infra/repository/in-memory/UserRepositoryInMemory';
import { LoginUserUseCase } from './LoginUserUseCase';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let loginUserUseCase: LoginUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Login', () => {
  beforeAll(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    loginUserUseCase = new LoginUserUseCase(userRepositoryInMemory);
  });

  test('should be able to login', async () => {
    await createUserUseCase.execute(
      'teste',
      20,
      '12345678910',
      'teste@com.teste.jest',
      '123456'
    );

    const loginUserData = await loginUserUseCase.execute(
      'teste@com.teste.jest',
      '123456'
    );

    expect(loginUserData.user).toHaveProperty('refreshToken');
    expect(loginUserData.user).toHaveProperty('password');
    expect(loginUserData.user.email).toBe('teste@com.teste.jest');
  });
});
