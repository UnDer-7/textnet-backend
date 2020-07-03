import UserRepository from '../repository/UserRepository';
import Verify from '../util/Verify';
import Assert from '../util/Assert';
import User from '../model/entity/User';
import PasswordUser from '../model/entity/PasswordUser';
import GoogleUser from '../model/entity/GoogleUser';
import FacebookUser from '../model/entity/FacebookUser';
import { Exception } from '../util/Exceptions';
import HttpStatus from '../model/HttpStatus';
import JWTService from './JWTService';

export class AuthService {
  private readonly repository: UserRepository = new UserRepository();
  private readonly jwtService = JWTService;

  public async signIn({ email, secret }: { email: string, secret: string }): Promise<string> {
    const userFound = await this.repository.findUserByEmail(email);

    Assert.isFalse(Verify.isUndefinedOrNull(userFound), 'Usuário não encontrado')
    Assert.isTrue(await userFound!.compare(secret), this.getSecretInvalidMessage(userFound as User ))

    return this.jwtService.createToken(userFound as User);
  }

  private getSecretInvalidMessage(user: User): string {
    if (user instanceof PasswordUser) return 'Senha inválida';
    if (user instanceof GoogleUser) return 'GoogleId inválido';
    if (user instanceof FacebookUser) return 'FacebookId inválido';

    throw new Exception('Usuário inválido', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export default new AuthService();
