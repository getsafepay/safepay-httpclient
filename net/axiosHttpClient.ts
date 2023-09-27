import axios, { Method } from "axios";
import qs from "qs";
import { HttpClient } from "./httpClient";
import { interceptError, interceptResponse } from "../../api";

export class AxiosHttpClient implements HttpClient {
  makeRequest(
    host: string,
    path: string,
    method: Method,
    headers?: { [key: string]: string } | undefined,
    requestData?: { [key: string]: string },
    params?: { [key: string]: any }
  ): Promise<any> {
    const instance = axios.create();
    instance.interceptors.response.use(interceptResponse, interceptError);

    const fetchPromise = instance.request({
      url: `${host}${path}`,
      method,
      headers,
      data: requestData || undefined,
      params,
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          arrayFormat: "indices",
          encode: false,
        });
      },
    });

    return fetchPromise;
  }
}
