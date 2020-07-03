import UserRepository from '../repository/UserRepository';
import User from '../model/entity/User';
import Assert from '../util/Assert';

class UserService {
  private readonly repository: UserRepository = new UserRepository();

  public async createUser(user: User): Promise<User> {
    const existsCellphone = await this.repository.existisCellphone(user.cellphone);
    console.log('1: ', existsCellphone);
    Assert.isFalse(existsCellphone, 'já existi um usuário com esse celular');

    await user.updateVersion().encrypt();

    return await this.repository.save(user);
  }

  public async canCreate(email: string): Promise<boolean> {
    Assert.notNullOrUndefined(email);

    return await this.repository.existisEmail(email)
  }
}

export default new UserService();
