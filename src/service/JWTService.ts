import * as jwt from 'jsonwebtoken';

import User from '../model/entity/User';
import EnvironmentVariable from '../util/EnvironmentVariable';

class JWTService {
  public createToken(user: User): string {
    const payload = Object.assign({}, {
      email: user.email,
      name: user.name,
      cellphone: user.cellphone,
      birthDate: user.birthDate,
      type: user.type
    });

    return jwt.sign(payload, EnvironmentVariable.JWT_SECRET, {
      expiresIn: EnvironmentVariable.JWT_DURATION, algorithm: 'HS512',
    })
  }
}

export default new JWTService();
