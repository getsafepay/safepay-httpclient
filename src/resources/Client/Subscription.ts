import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

const SP_USER_TOKEN = "SP_USER_TOKEN";
export class Subscription extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  search = safepayMethod({
    method: "GET",
    fullPath: "/subscriptions/v1/search",
  });

  searchByToken = safepayMethod({
    method: "GET",
    fullPath: "/subscriptions/v1/{subscriptionId}",
  });

  create = safepayMethod({
    method: "POST",
    fullPath: "/subscriptions/v1",
  });

  update = safepayMethod({
    method: "PUT",
    fullPath: "/subscriptions/v1/{subscriptionId}",
  });

  resume = safepayMethod({
    method: "PUT",
    fullPath: "/subscriptions/v1/{subscriptionId}/resumption",
  });

  cancel = safepayMethod({
    method: "POST",
    fullPath: "/subscriptions/v1/{subscriptionId}/cancel",
  });
}
