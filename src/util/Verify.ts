export default abstract class Verify {
  private constructor() {}

  public static isNotNull(object: any): boolean {
    return object !== null;
  }

  public static isNotUndefined(object: any): boolean {
    return object !== undefined;
  }

  public static isNotUndefinedOrNull(object: any): boolean {
    return this.isNotUndefined(object) && this.isNotNull(object);
  }

  public static isNull(object: any): boolean {
    return object === null;
  }

  public static isUndefined(object: any): boolean {
    return object === undefined;
  }

  public static isUndefinedOrNull(object: any): boolean {
    return this.isUndefined(object) || this.isNull(object);
  }
}
