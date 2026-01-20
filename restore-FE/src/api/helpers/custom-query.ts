import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { baseUrl } from "../constants";
import { setLoading } from "../../app/store/uiSlice";

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
    console.error("API Error:", result.error);
  }

  api.dispatch(setLoading(false));
  return result;
};
