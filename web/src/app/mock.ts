export type Result<T> = { value: T } | { value: void; error: any };

export type MockFn<T = unknown, A extends any[] = any[]> = {
  input: A[];
  output: Result<T>[];
  hasBeenCalledOnce: () => boolean;
  hasBeenCalledTimes: (times: number) => boolean;
  lastCalledWith: () => A | undefined;
} & ((...args: A) => T);

export function mockFn<T = unknown, A extends any[] = any[]>(
  interceptor: (...args: A) => T = () => Symbol() as any,
) {
  const callable: MockFn<T, A> = Object.assign(
    (...args: A) => {
      callable.input.push(args);
      let result: Result<T>;
      try {
        result = { value: interceptor(...args) };
      } catch (error: any) {
        result = { value: undefined, error };
      }
      callable.output.push(result);
      if ("error" in result) throw result.error;
      else return result.value;
    },
    {
      input: [],
      output: [],
      hasBeenCalledOnce: () => callable.input.length === 1,
      hasBeenCalledTimes: (times: number) => callable.input.length === times,
      lastCalledWith: () => callable.input[callable.input.length - 1],
    },
  );
  return callable;
}

export type Mocked<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? MockFn<R, A>
    : T[K];
};

export function mockClass<T extends new (...args: any[]) => any>(
  classObject: T,
): Mocked<InstanceType<T>> {
  const mockObject: any = {};
  const descriptors = Object.getOwnPropertyDescriptors(classObject.prototype);
  for (const [key, descriptor] of Object.entries(descriptors)) {
    if (typeof descriptor.value === "function") mockObject[key] = mockFn();
  }
  return mockObject;
}
