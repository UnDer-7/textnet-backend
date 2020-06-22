import { Router} from 'express';

export default class RouterConfig {
  private static instance: RouterConfig;
  private readonly routerInstance: Router;

  private constructor() {
    this.routerInstance = Router()
  }

  public static getRouter(): Router {
    if (!this.instance) {
      RouterConfig.instance = new RouterConfig();
    }

    return this.instance.routerInstance;
  }

  public static buildURL(path: string): string {
    return `/api/v1/${path}`
  }
}
