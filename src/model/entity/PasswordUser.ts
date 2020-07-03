import { ChildEntity, Column } from 'typeorm';
import User from './User';
import Optional from '../../util/Optional';
import UserType from './UserType';
import Assert from '../../util/Assert';

@ChildEntity(UserType.PASSWORD_USER)
export class PasswordUser extends User {

  @Column()
  public password!: string;

  public constructor(json: any) {
    super(json, UserType.PASSWORD_USER);
    Optional
      .from(json)
      .ifPresent((exists) => {
        Assert.equals(UserType.PASSWORD_USER, json.type);

        this.password = exists.password;
      })
  }

  public async encrypt(): Promise<PasswordUser> {
    Assert.notNullOrUndefined(this.password, 'Senha não informada');

    this.password = await this.hash(this.password);
    return this;
  }

  async compare(value: string): Promise<boolean> {
    return await this.compareEncryption(value, this.password);
  }

  public get entityName(): string {
    return 'PasswordUser';
  }
}

export default PasswordUser;
