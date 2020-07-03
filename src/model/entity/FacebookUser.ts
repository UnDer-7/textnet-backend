import User from './User';
import { ChildEntity, Column } from 'typeorm';
import Assert from '../../util/Assert';
import UserType from './UserType';
import Optional from '../../util/Optional';

@ChildEntity(UserType.FACEBOOK_USER)
export default class FacebookUser extends User {

  @Column()
  public facebookId!: string;

  public constructor(json: any) {
    super(json, UserType.FACEBOOK_USER);

    Optional
        .from(json)
        .ifPresent((exists) => {
          this.facebookId = exists.facebookId;
        });
  }

  public async encrypt(): Promise<User> {
    Assert.notNullOrUndefined(this.facebookId, 'Facebook não informada');

    this.facebookId = await this.hash(this.facebookId);
    return this;
  }

  public async compare(value: string): Promise<boolean> {
    return await this.compareEncryption(value, this.facebookId);
  }

  public get entityName(): string {
    return 'FacebookUser';
  }
}
