import { Request, Response } from 'express';
import { validationResult, param } from 'express-validator';
import asyncHandler from 'express-async-handler'

import RouterConfig from '../config/RouterConfig';
import UserService from '../service/UserService';
import Validation from '../util/Validation';
import Converter from '../util/Converter';
import HttpStatus from '../model/HttpStatus';
import Assert from '../util/Assert';

const { ROUTER, PATH } = RouterConfig.build('users');

ROUTER.post(`${ PATH }`,
  Validation.withUser(),
  asyncHandler(
    async (req: Request, res: Response): Promise<Response> => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ errors: errors.array() })

      const msg = Validation.validateSecrets(req.body);
      Assert.isNullOrUndefined(msg, msg as string)

      const user = await UserService.createUser(Converter.toUser(req.body));
      return res.status(HttpStatus.CREATED).json(user)
    }
  ));

ROUTER.get(`${ PATH }/can-create/email/:email`,
  [Validation.withEmail(param)],
  async (req: Request<{email: string}>, res: Response): Promise<Response> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const exists = await UserService.canCreate(req.params.email)
    return res.status(200).json({ canCreate: exists })
  })

export default ROUTER;
