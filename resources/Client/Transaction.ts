import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";
export class Transaction extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  search = safepayMethod({
    method: "GET",
    fullPath: "/transactions/v1/search",
  });

  searchByToken = safepayMethod({
    method: "GET",
    fullPath: "/transactions/v1/{transactionsId}",
  });

  searchPlanByToken = safepayMethod({
    method: "GET",
    fullPath: "/plans/v1/{planId}/",
  });

  refundSubsTransaction = safepayMethod({
    method: "POST",
    fullPath: "/transactions/v1/{transactionsId}/refund",
  });
}
