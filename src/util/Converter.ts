import UserType from '../model/entity/UserType';
import GoogleUser from '../model/entity/GoogleUser';
import { Exception } from './Exceptions';
import HttpStatus from '../model/HttpStatus';
import User from '../model/entity/User';
import PasswordUser from '../model/entity/PasswordUser';
import FacebookUser from '../model/entity/FacebookUser';

export default abstract class Converter {
  public static toUser(user: User): User {
    switch (user.type) {
      case UserType.GOOGLE_USER: return new GoogleUser(user);
      case UserType.PASSWORD_USER: return new PasswordUser(user);
      case UserType.FACEBOOK_USER: return new FacebookUser(user);
      default: throw new Exception(`Nao foi possivel converter User com o tipo ${user.type}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
