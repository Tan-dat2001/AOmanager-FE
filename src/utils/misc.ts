export type FnType<R, T1, T2, T3> = (x?: T1, y?: T2, z?: T3) => Promise<R | void>;
type DefaultType<R> = { success?: R; failed?: R; __default?: R };
type WrappedFnType<R, T1, T2, T3> = (x?: T1, y?: T2, z?: T3) => Promise<R | undefined>;

export function wrapper<R, T1, T2, T3>(
  fn: FnType<R, T1, T2, T3>,
  { success, failed, __default }: DefaultType<R>,
): WrappedFnType<R, T1, T2, T3> {
  return async (x, y, z) => {
    try {
      const res = await fn(x, y, z);
      return res ?? success ?? __default;
    } catch (err) {
      // TODO: log error
    }
    return failed ?? __default;
  };
}
