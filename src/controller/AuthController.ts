import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler'

import RouterConfig from '../config/RouterConfig';

import AuthService from '../service/AuthService';
import Validation from '../util/Validation';
import HttpStatus from '../model/HttpStatus';

const { ROUTER, PATH } = RouterConfig.build('auth');

ROUTER.post(
  `${PATH}/sign-in`,
  [Validation.withSecret(), Validation.withEmail()],
  asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ errors: errors.array() })

      const token = await AuthService.signIn(req.body);
      return res.status(200).json({token});
    }
  )
)

export default ROUTER;
