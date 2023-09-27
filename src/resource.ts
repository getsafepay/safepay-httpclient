import { Method } from "axios";
import { Safepay, Service } from "./safepay";
import { utils } from "./utils";
import { makeRequest } from "./request";

type Interpolator = (data: {
  [key: string]: string | number | boolean;
}) => string;

export default class SafepayResource {
  // Needed to satisfy typescript when we
  // extend this class and add multiple api
  // calls to it
  [x: string]: any;

  _resource!: string;
  _version!: string;

  private safepay: Safepay;
  private method: typeof makeRequest;

  private versionPath: Interpolator;

  private resourcePath: Interpolator;

  constructor(safepay: Safepay) {
    this.safepay = safepay;

    const version = safepay.getBasePath();
    if (version) {
      this._version = version;
    }

    this._resource = safepay.getService(this.resource());

    this.versionPath = utils.makeURLInterpolator(this._version);
    this.resourcePath = utils.makeURLInterpolator(this._resource);
    this.method = makeRequest;
  }

  resource(): Service {
    throw new Error("this function has not been implemented");
  }

  createFullPath(
    commandPath: (outputs: {
      [key: string]: string | number | boolean;
    }) => string,
    urlData: {
      [key: string]: string;
    },
    fullPath: boolean
  ): string {
    const parts = [this.resourcePath(urlData)];
    if (!fullPath) {
      parts.push(this.versionPath(urlData));
    }
    parts.push(
      typeof commandPath == "function" ? commandPath(urlData) : commandPath
    );

    return this.joinUrlParts(parts);
  }

  // Creates a relative resource path with symbols left in (unlike
  // createFullPath which takes some data to replace them with). For example it
  // might produce: /invoices/{id}
  createResourcePathWithSymbols(pathWithSymbols: string) {
    return `/${this.joinUrlParts([this._path, pathWithSymbols || ""])}`;
  }

  private joinUrlParts(parts: string[]) {
    // Replace any accidentally doubled up slashes. This previously used
    // path.join, which would do this as well. Unfortunately we need to do this
    // as the functions for creating paths are technically part of the public
    // interface and so we need to preserve backwards compatibility.
    let path = parts.join("/").replace(/\/{2,}/g, "/");
    // If the path ends with a /, we preserve the behavior of path.join and
    // strip off the trailing / (eg. /v1/customers/ -> /v1/customers).
    //return path.endsWith("/") ? path.slice(0, -1) : path;
    return path;
  }

  private makeHeaders(options: { [key: string]: string }): {
    [key: string]: string;
  } {
    const defaultHeaders = {
      Authorization: this.safepay.getAuth(),
      Accept: "application/json",

      "X-SFPY-Merchant-Key": this.safepay.getApiKey(),
    };

    return Object.assign(
      utils.removeNullish(defaultHeaders),
      utils.normalizeHeaders(options)
    );
  }

  request(
    path: string,
    method: Method,
    headers?: { [key: string]: string } | undefined,
    requestData?: { [key: string]: string },
    params?: { [key: string]: string }
  ) {
    const host = this.safepay.getBaseUrl() || "";
    const req = this.safepay
      .getHttpClient()
      .makeRequest(
        host,
        path,
        method,
        this.makeHeaders(headers || {}),
        requestData,
        params
      );

    return req
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
