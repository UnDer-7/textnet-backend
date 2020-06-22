import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import RouterConfig from '../config/RouterConfig';
import UserService from '../service/UserService';
import Validation from '../util/Validation';

const ROUTER = RouterConfig.getRouter();
const PATH = RouterConfig.buildURL('users');

ROUTER.post(`${ PATH }/email`,
  [Validation.withEmail(), Validation.withPassword()],
  async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    UserService.createUserWithEmail(req.body);
    return res.json({ status: 'user created' })
  }
);

export default ROUTER;
