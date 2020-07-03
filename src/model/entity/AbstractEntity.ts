import { Column, PrimaryGeneratedColumn } from 'typeorm';
import Optional from '../../util/Optional';

export default abstract class AbstractEntity {
  @PrimaryGeneratedColumn('increment')
  protected id!: number;

  @Column()
  protected version!: number

  protected constructor(json: any) {
    Optional
      .from(json)
      .ifPresent((exists) => {
        this.id = exists.id;
        this.version = exists.version;
      });
  }

  public getId(): number {
    return this.id;
  }

  public getVersion(): number {
    return this.version;
  }
}
