// ResourceNamespace allows you to create nested resources, i.e. `safepay.issuing.cards`.
// It also works recursively, so you could do i.e. `safepay.billing.invoicing.pay`.

import SafepayResource from "./resource";
import { Safepay } from "./safepay";

export class ResourceNamespace {
  [index: string]: SafepayResource;

  constructor(
    safepay: Safepay,
    resources: { [key: string]: typeof SafepayResource }
  ) {
    for (const name in resources) {
      const camelCaseName = name[0].toLowerCase() + name.substring(1);

      const resource = new resources[name](safepay);

      this[camelCaseName] = resource;
    }
  }
}

export function namespace(
  namepace: string,
  resources: { [key: string]: typeof SafepayResource }
) {
  return function (safepay: Safepay): ResourceNamespace {
    return new ResourceNamespace(safepay, resources);
  };
}
