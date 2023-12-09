export enum StatusCode {
  Success = 200,
  Error = 400,
}

export type Response<T> = {
  code: StatusCode;
  message: string;
  data: T;
};
