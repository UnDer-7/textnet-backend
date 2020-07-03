import { Router} from 'express';

export default class RouterConfig {
  private static instance: RouterConfig;
  private readonly routerInstance: Router;

  private constructor() {
    this.routerInstance = Router()
  }

  public static build(path: string, version: string = 'v1'): { ROUTER: Router, PATH: string } {
    if (!this.instance) {
      RouterConfig.instance = new RouterConfig();
    }

    return {
      ROUTER: this.instance.routerInstance,
      PATH: `/api/${version}/${path}`
    };
  }
}
