import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Webhooks extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  webhooksEnabled = safepayMethod({
    method: "GET",
    fullPath: "/hooks/v1/exists",
  });

  enableWebhooks = safepayMethod({
    method: "POST",
    fullPath: "/hooks/v1/merchant",
  });

  getWebhooks = safepayMethod({
    method: "GET",
    fullPath: "/hooks/v1/subscription",
  });

  deleteEndpoint = safepayMethod({
    method: "DELETE",
    fullPath: "/hooks/v1/subscription",
  });

  createWebhook = safepayMethod({
    method: "POST",
    fullPath: "/hooks/v1/subscription",
  });

  updateWebHook = safepayMethod({
    method: "PUT",
    fullPath: "/hooks/v1/subscription",
  });

  checkHook = safepayMethod({
    method: "GET",
    fullPath: "/hooks/v1/exists",
  });

  createMerchantHook = safepayMethod({
    method: "GET",
    fullPath: "/hooks/v1/merchant",
  });

  getSecret = safepayMethod({
    method: "GET",
    fullPath: "/hooks/v1/secret",
  });

  rotateSecret = safepayMethod({
    method: "PUT",
    fullPath: "/hooks/v1/secret",
  });

  getEndpointEvents = safepayMethod({
    method: "GET",
    fullPath: "/hooks/v1/events",
  });

  eventSubscription = safepayMethod({
    method: "POST",
    fullPath: "/hooks/v1/subscribe",
  });

  getEventLogs = safepayMethod({
    method: "GET",
    fullPath: "/hooks/v1/notification",
  });
}
