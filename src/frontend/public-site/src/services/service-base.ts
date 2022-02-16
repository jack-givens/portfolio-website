//TODO: replace with actual api instance type when backend services are implemented
type ApiInstance = 'temporary';

type RouteConstructor = {
  instance: ApiInstance;
};

export abstract class ApiRoute {
  private instance: ApiInstance;
  constructor(ctr: RouteConstructor) {
    this.instance = ctr.instance;
  }
  protected Utils = {
    delay: <T>(result: T, ms: number): Promise<T> =>
      new Promise<T>((res) => {
        setTimeout(() => res(result), ms);
      })
  };
}

type RouteConstructorValue<T> = T extends new (
  instance: RouteConstructor
) => infer R
  ? R extends ApiRoute
    ? R
    : never
  : never;
type ApiArgs = Record<string, new (...args: any) => any>;
type ApiFactoryResult<T extends ApiArgs> = {
  [K in keyof T]: RouteConstructorValue<T[K]>;
};

const RouteConstructorGuard = (
  ctr: new (...args: any) => any
): ctr is new (args: RouteConstructor) => any => {
  return ctr.prototype instanceof ApiRoute;
};

export const ApiFactory = <T extends ApiArgs>(
  routes: T,
  postConfiguration?: (instance: ApiInstance) => void
): ApiFactoryResult<T> => {
  const instance: ApiInstance = 'temporary';
  const result: Partial<ApiFactoryResult<T>> = {};
  Object.entries(routes).forEach(([key, ctr]) => {
    if (RouteConstructorGuard(ctr)) {
      (result[key] as keyof T) = new ctr({ instance: instance });
    }
  });
  postConfiguration?.(instance);
  return result as ApiFactoryResult<T>;
};
