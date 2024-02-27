import { Method } from "axios";
import { makeRequest } from "./request";
import SafepayResource from "./resource";
import { utils } from "./utils";
import { Webhook } from "./webhooks";

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
      spec.fullPath || this.createResourcePathWithSymbols(spec.path || "")
    );
    const requestPromise = makeRequest(this, args, spec);

    return requestPromise;
  };
}

export type WebhookSpec = {
  payload: string;
  header: { [key: string]: string };
};
export function webhookMethod(specs: WebhookSpec) {
  const signature = specs.header["x-sfpy-signature"];
  const check = new Webhook();
  return check.constructEvent(specs.payload, signature);
}
