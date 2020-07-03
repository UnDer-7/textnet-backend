import { ChildEntity, Column } from 'typeorm';
import User from './User';
import Optional from '../../util/Optional';
import UserType from './UserType';
import Assert from '../../util/Assert';

@ChildEntity(UserType.GOOGLE_USER)
export default class GoogleUser extends User {

  @Column()
  public googleId!: string;

  public constructor(json: any) {
    super(json, UserType.GOOGLE_USER);

    Optional
      .from(json)
      .ifPresent((exists) => {
        this.googleId = exists.googleId;
      });
  }

  public async encrypt(): Promise<GoogleUser> {
    Assert.notNullOrUndefined(this.googleId, 'GoogleId não informada');

    this.googleId = await this.hash(this.googleId)
    return this;
  }

  public async compare(value: string): Promise<boolean> {
    return this.compareEncryption(value, this.googleId);
  }

  public get entityName(): string {
    return 'GoogleUser';
  }
}
