import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";
export class Plan extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  search = safepayMethod({
    method: "GET",
    fullPath: "/plans/v1/search",
  });

  searchByToken = safepayMethod({
    method: "GET",
    fullPath: "/plans/v1/{planId}/",
  });

  createPlan = safepayMethod({
    method: "POST",
    fullPath: "/plans/v1/",
  });

  updatePlan = safepayMethod({
    method: "PUT",
    fullPath: "/plans/v1/{planId}/",
  });

  archivePlan = safepayMethod({
    method: "DELETE",
    fullPath: "/plans/v1/{planId}/",
  });
}
