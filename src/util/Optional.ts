import { Consumer } from '../model/Functions';
import Verify from './Verify';

export default class Optional<T> {
  public constructor(private readonly object: T) {}

  public static from<G = {}>(object: G): Optional<G> {
    return new Optional<G>(object)
  }

  public ifPresent(func: Consumer<T>): void {
    if (Verify.isNotUndefinedOrNull(this.object)) {
      func(this.object);
    }
  }
}
