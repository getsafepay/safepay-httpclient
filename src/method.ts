import { Method } from "axios";
import { makeRequest } from "./request";
import SafepayResource from "./resource";
import { utils } from "./utils";

export type Spec = {
  method: Method;
  path?: string;
  fullPath?: string;
  urlParams?: unknown[];
  headers?: { [key: string]: string };
};

export function safepayMethod(spec: Spec) {
  return function (this: SafepayResource, ...args: any[]) {
    spec.urlParams = utils.extractUrlParams(
      spec.fullPath ||
        this.createResourcePathWithSymbols(spec.path || "")
    );
    const requestPromise = makeRequest(this, args, spec);

    return requestPromise;
  };
}
