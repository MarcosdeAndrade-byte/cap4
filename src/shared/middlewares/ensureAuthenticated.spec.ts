import 'reflect-metadata';
import { describe, expect, beforeAll, it, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { UserRepositoryInMemory } from '../../modules/modules/User/infra/repository/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../../modules/modules/User/UseCase/CreateUser/CreateUserUseCase';
import { LoginUserUseCase } from '../../modules/modules/User/UseCase/login/LoginUserUseCase';
import { AuthenticationMiddleware } from './ensureAuthenticated';

let createUserUseCase: CreateUserUseCase;
let loginUserUseCase: LoginUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let ensureAuthenticated: AuthenticationMiddleware;

describe('EnsureAuthenticated', () => {
  beforeAll(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    loginUserUseCase = new LoginUserUseCase(userRepositoryInMemory);
    ensureAuthenticated = new AuthenticationMiddleware(userRepositoryInMemory);
  });

  it('should be able to verify user token', async () => {
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

    const req = {
      headers: {
        authorization: `Bearer ${loginUserData.token}`,
      },
    } as Request;
    const res = {} as Response;
    const next = jest.fn();

    await ensureAuthenticated.authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
