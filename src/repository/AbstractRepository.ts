import { EntitySchema, getManager, ObjectType, Repository } from 'typeorm';

export default abstract class AbstractRepository<T> {
  protected getRepository(entity: ObjectType<T> | EntitySchema<T> | string): Repository<T> {
    return getManager().getRepository(entity);
  }
}
