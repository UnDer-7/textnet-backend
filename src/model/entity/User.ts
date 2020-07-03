import { Column, Entity, TableInheritance } from 'typeorm';
import { hash, compare as compareCrypt } from 'bcrypt';

import AbstractEntity from './AbstractEntity';
import Verify from '../../util/Verify';
import Optional from '../../util/Optional';
import UserType from './UserType';

@Entity('USERS')
@TableInheritance({
  column: {
    nullable: false,
    enum: UserType,
    type: 'enum',
    name: 'type',
  }
})
export default abstract class User extends AbstractEntity {

  @Column({ nullable: false, unique: true, length: 255 })
  public email!: string;

  @Column({ nullable: false, length: 255 })
  public name!: string;

  @Column({ nullable: false, unique: true, length: 11 })
  public cellphone!: string;

  @Column({ type: 'date', nullable: false })
  public birthDate!: string

  @Column({
      nullable: false,
      enum: UserType,
      type: 'enum',
      name: 'type',
    }
  )
  public type!: UserType;

  protected constructor(json: any, type: UserType) {
    super(json);

    this.type = type;
    Optional
      .from(json)
      .ifPresent((jsonPresent) => {
        this.email = jsonPresent.email;
        this.name = jsonPresent.name;
        this.cellphone = jsonPresent.cellphone;
        this.birthDate = jsonPresent.birthDate;
      })
  }

  public abstract async encrypt(): Promise<User>;

  public abstract async compare(value: string): Promise<boolean>;

  public updateVersion(): User {
    if(Verify.isUndefinedOrNull(this.version)) {
      this.version = 0;
    } else {
      this.version++
    }

    return this;
  }

  public get entityName(): string {
    return 'User';
  }

  protected async hash(data: string): Promise<string> {
    return hash(data, 8);
  }

  protected async compareEncryption(value: string, encryptedValue: string): Promise<boolean> {
    return await compareCrypt(value, encryptedValue);
  }
}
