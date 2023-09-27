import { Method } from "axios";

export interface HttpClient {
  makeRequest(
    host: string,
    path: string,
    method: Method,
    headers?: { [key: string]: string },
    requestData?: { [key: string]: any },
    params?: { [key: string]: string }
  ): Promise<any>;
}
