import Assert from './Assert';

class EnvironmentVariable {

  private static getVariable(name: string): string {
    const env = process.env[`REACT_APP_${name}`];
    Assert.notBlank(env, { errorMessage: `Environment Variable [${ name }] Not Fount` });

    // @ts-ignore
    return env;
  }
}
