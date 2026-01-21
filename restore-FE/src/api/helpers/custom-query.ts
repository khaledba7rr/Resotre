import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { baseUrl } from "../constants";
import { setLoading } from "../../app/store/uiSlice";
import type { ApiResponse } from "../../app/types/api-response";
import toast from "react-hot-toast";

export const customQuery = fetchBaseQuery({
  baseUrl: baseUrl,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(setLoading(true));

  await sleep(1500); // Simulate loading delay

  const result = await customQuery(args, api, extraOptions);

  if (result.error) {
    api.dispatch(setLoading(true));

    const errorResponse = result.error.data as ApiResponse<any>;

    errorResponse.errors.map((message) => {
      return toast.error(message + " HTTP : " + errorResponse.httpStatusCode);
    });
  }

  api.dispatch(setLoading(false));
  return result;
};
