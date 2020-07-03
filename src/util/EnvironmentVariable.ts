import Assert from './Assert';

export default abstract class EnvironmentVariable {
  public static readonly ENVIRONMENT: string = EnvironmentVariable.getVariable('ENVIRONMENT', false);

  public static readonly JWT_SECRET: string = EnvironmentVariable.getVariable('JWT_SECRET');

  public static readonly JWT_DURATION: string = EnvironmentVariable.getVariable('JWT_DURATION');

  private static getVariable(name: string, withPrefix: boolean = true): string {
    const env = withPrefix
      ? process.env[`TEXTNET_${ name }`]
      : process.env[name];

    Assert.notBlank(env, { errorMessage: `Environment Variable [${ name }] Not Fount` });

    // @ts-ignore
    return env;
  }
}
