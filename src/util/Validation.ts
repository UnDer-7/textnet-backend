import { body, ValidationChain } from 'express-validator';

export default abstract class Validation {
  public static withEmail(): ValidationChain {
    return body('email')
      .trim()
      .isEmail()
      .withMessage('Email inválido')
  }

  public static withPassword(): ValidationChain {
    return body('password')
      .trim()
      .isLength({min: 3})
      .withMessage('Senha com tamanho inválido, tamanho mínimo é 3')
  }
}
