import { Request, Response, NextFunction } from 'express';
import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { ensureAuthenticated } from '../../../../../shared/middlewares/testAuthenticated';

let req: Request;

describe('middleware', () => {
  beforeEach(() => {
    req = {} as Request;
  });

  test('should call the next middleware function', () => {
    req.body = {
      name: 'teste',
    };

    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    ensureAuthenticated(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
