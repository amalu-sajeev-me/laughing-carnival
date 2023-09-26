type FunctionOrMethod = (...args: unknown[]) => unknown;

export function logFunctionExecution<T extends FunctionOrMethod>(
  logReturnValue: boolean = false
) {
  return function (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value as T;
    if (typeof originalMethod !== "function")
      throw new SyntaxError(
        `@logFunctionExecution can only be used on method or functions`
      );
    descriptor.value = function (...args: Parameters<T>[]): ReturnType<T> {
      const result = originalMethod.apply(this, args) as ReturnType<T>;
      const functionName = propertyKey;
      console.log(`Function ${functionName} executed`);
      logReturnValue && console.log(`Return value: ${result}`);
      return result;
    };
  };
}
