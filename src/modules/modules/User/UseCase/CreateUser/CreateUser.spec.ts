import 'reflect-metadata';
import { describe, expect, beforeAll, it } from '@jest/globals';
import { CreateUserUseCase } from './CreateUserUseCase';
import { UserRepositoryInMemory } from '../../infra/repository/in-memory/UserRepositoryInMemory';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create user', () => {
  beforeAll(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const userId = await createUserUseCase.execute(
      'teste',
      20,
      '12345678910',
      'teste@com.teste.jest',
      '123456'
    );

    expect(userId).toHaveProperty('_id');
  });
});
