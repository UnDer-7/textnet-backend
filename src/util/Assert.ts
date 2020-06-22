import { AssertException } from './Exceptions';

export default abstract class Assert {
  public static notNull(value: any, errorMessage?: string): void {
    if (value === null || value === undefined) {
      if (!errorMessage) {
        // eslint-disable-next-line no-param-reassign
        errorMessage = 'Not Null assertion failed';
      }

      throw new AssertException(errorMessage);
    }
  }

  public static notBlank(value: string | null | undefined, options?: AssertOptions): void {
    let errorMessage = options?.errorMessage;
    const handleNull = options?.handleNull || true;

    if (handleNull) Assert.notNull(value, errorMessage);

    if (!value!.toString().replace(/\s/g, '').length) {
      if (!errorMessage) {
        // eslint-disable-next-line no-param-reassign
        errorMessage = 'Not Empty assertion failed';
      }

      throw new AssertException(errorMessage);
    }
  }

  public static isTrue(value: boolean | null | undefined, errorMessage?: string): void {
    const msg = errorMessage || `Is True assertion failed\nValue: ${value} is not true`;

    if (value !== true) {
      throw new AssertException(msg);
    }
  }
}

interface AssertOptions {
  errorMessage?: string;
  handleNull?: boolean;
}
