import { body, ValidationChain } from 'express-validator';
import { RequestHandler } from 'express-serve-static-core';
import { isValid, parseISO } from 'date-fns';

import { Function } from '../model/Functions';
import UserType, { existsIn } from '../model/entity/UserType';
import Verify from './Verify';

type validatorFunc = Function<string | string[] | undefined, ValidationChain>;

export default abstract class Validation {
  public static withEmail(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('email')
      .exists()
      .withMessage('E-mail não informado')
      .trim()
      .isEmail()
      .withMessage('Email inválido');
  }

  public static withName(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('name')
      .exists()
      .withMessage('Nome não informado')
      .trim()
      .isLength({min: 3})
      .withMessage('Nome inválido');
  }

  public static withCellphone(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('cellphone')
      .exists()
      .withMessage('Número de celular não informado')
      .trim()
      .isLength({min: 11, max: 11})
      .withMessage('Número de celular inválido');
  }

  public static withBirthDate(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('birthDate')
      .exists()
      .withMessage('Data de aniversário não informada')
      .custom((value) => isValid(parseISO(value)))
      .withMessage('Data de aniversário inválida');
  }

  public static withType(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('type')
      .exists()
      .withMessage('Tipo não informado')
      .custom(existsIn)
      .withMessage('Tipo de usuário inválido')
  }

   public static withGoogleId(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('googleId')
      .exists()
      .withMessage('GoogleId não informado')
      .trim()
  }

  public static withPassword(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('password')
      .exists()
      .withMessage('Senha não informada')
      .trim()
      .isLength({min: 3})
      .withMessage('Senha com tamanho inválido, tamanho mínimo é 3');
  }

  public static withSecret(validatorFunc: validatorFunc = body): ValidationChain {
    return validatorFunc('secret')
      .exists()
      .withMessage('secret nao informado')
      .trim()
  }

  public static validateSecrets(user: any): string | null {
    function exists(): string | null {
      const password = Verify.isUndefinedOrNull(user.password);
      const googleId = Verify.isUndefinedOrNull(user.googleId);
      const facebookId = Verify.isUndefinedOrNull(user.facebookId);

      if (password && googleId && facebookId) {
        return 'Informe alguns dos campos: password, facebookId, googleId';
      } else {
        return null;
      }
    }

    function verifyPassword(): string | null {
      const contais = exists();
      if (contais) return contais;

      const password = Verify.isNotUndefinedOrNull(user.password);
      const googleId = Verify.isUndefinedOrNull(user.googleId);
      const facebookId = Verify.isUndefinedOrNull(user.facebookId);

      if (password && googleId && facebookId) {
        return null;
      } else {
        return 'Usuário com password não pode ter googleId ou facebookId';
      }
    }

    function verifyGoogleId(): string | null {
      const contais = exists();
      if (contais) return contais;

      const googleId = Verify.isNotUndefinedOrNull(user.googleId);
      const password = Verify.isUndefinedOrNull(user.password);
      const facebookId = Verify.isUndefinedOrNull(user.facebookId);

      if (password && googleId && facebookId) {
        return null;
      } else {
        return 'Usuário com googleId não pode ter password ou facebookId';
      }
    }

    function verifyFacebookId(): string | null {
      const contais = exists();
      if (contais) return contais;

      const facebookId = Verify.isNotUndefinedOrNull(user.facebookId);
      const googleId = Verify.isUndefinedOrNull(user.googleId);
      const password = Verify.isUndefinedOrNull(user.password);

      if (password && googleId && facebookId) {
        return null;
      } else {
        return 'Usuário com facebookId não pode ter password ou googleId';
      }
    }

    switch (user.type) {
      case UserType.PASSWORD_USER: return verifyPassword();
      case UserType.GOOGLE_USER: return verifyGoogleId();
      case UserType.FACEBOOK_USER: return verifyFacebookId();
      default: return 'Usuário sem googleId ou password'
    }
  }

  public static withUser(): Array<RequestHandler> {
    return [
      this.withEmail(),
      this.withName(),
      this.withCellphone(),
      this.withBirthDate(),
      this.withType(),
    ];
  }
}
