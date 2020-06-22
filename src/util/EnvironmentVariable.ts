import Assert from './Assert';

export default abstract class EnvironmentVariable {
  public static readonly ENVIRONMENT: string = EnvironmentVariable.getVariable('ENVIRONMENT', false);
  public static readonly DATABASE_TYPE: string = EnvironmentVariable.getVariable('DATABASE_TYPE');
  public static readonly DATABASE_HOST: string = EnvironmentVariable.getVariable('DATABASE_HOST');
  public static readonly DATABASE_PORT: string = EnvironmentVariable.getVariable('DATABASE_PORT');
  public static readonly DATABASE_USERNAME: string = EnvironmentVariable.getVariable('DATABASE_USERNAME');
  public static readonly DATABASE_PASSWORD: string = EnvironmentVariable.getVariable('DATABASE_PASSWORD');
  public static readonly DATABASE_DATABASE_NAME: string = EnvironmentVariable.getVariable('DATABASE_DATABASE_NAME');

  private static getVariable(name: string, withPrefix: boolean = true): string {
    const env = withPrefix
      ? process.env[`TEXTNET_${ name }`]
      : process.env[name];

    Assert.notBlank(env, { errorMessage: `Environment Variable [${ name }] Not Fount` });

    // @ts-ignore
    return env;
  }
}
