export type ApiResponse<T> = {
  result: T;
  isError: boolean;
  isSuccess: boolean;
  errors: string[];
  httpStatusCode: number;
};
