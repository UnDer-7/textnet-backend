import { AssertException } from './Exceptions';

export default abstract class Assert {
  public static equals<T>(a: T, b: T, errorMsg: string = 'Equal assertion failed'): void {
    if (a !== b) {
      throw new AssertException(errorMsg)
    }
  }

  public static isNullOrUndefined(value: any, errorMsg: string = 'Is Null or Undefined assertion failed'): void {
    if (value !== null && value !== undefined) {
      throw new AssertException(errorMsg);
    }
  }

  public static notNullOrUndefined(value: any, errorMessage: string = 'Not Null assertion failed'): void {
    if (value === null || value === undefined) {
      throw new AssertException(errorMessage);
    }
  }

  public static notBlank(value: string | null | undefined, options?: AssertOptions): void {
    let errorMessage = options?.errorMessage;
    const handleNull = options?.handleNull || true;

    if (handleNull) Assert.notNullOrUndefined(value, errorMessage);

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

  public static isFalse(
    value: boolean | null | undefined,
    errorMessage: string = 'Is False assertion failed',
    ): void {

    if (value !== false) {
      throw new AssertException(errorMessage)
    }
  }
}

interface AssertOptions {
  errorMessage?: string;
  handleNull?: boolean;
}
