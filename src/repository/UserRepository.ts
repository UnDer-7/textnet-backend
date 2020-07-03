import AbstractRepository from './AbstractRepository';
import User from '../model/entity/User';
import Assert from '../util/Assert';

export default class UserRepository extends AbstractRepository<User> {
  public async save(user: User): Promise<User> {
    Assert.notNullOrUndefined(user);
    Assert.isNullOrUndefined(user.getId());

    return await this.getRepository(user.entityName).save(user);
  }

  public async existisEmail(email: string): Promise<boolean> {
    const res = await this.getRepository(User)
      .query(`SELECT case when count(users) <= 0 then true else false end
      FROM "USERS" "users" WHERE users.email = '${email}'`)
    return res[0].case;
  }

  public async existisCellphone(cellphone: string): Promise<boolean> {
    const res = await this.getRepository(User)
      .query(`SELECT case when count(users) = 0 then false else true end
      FROM "USERS" "users" WHERE users.cellphone = '${cellphone}'`)

    return res[0].case;
  }

  public async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.getRepository(User)
      .findOne({where: {email}})
  }
}
