import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Dispute extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  acceptDispute = safepayMethod({
    method: "POST",
    fullPath: "/disputes/v1/{disputeId}/acceptance",
  });

  search = safepayMethod({
    method: "GET",
    fullPath: "/disputes/v1/search/",
  });

  comment = safepayMethod({
    method: "POST",
    fullPath: "/disputes/v1/{disputeId}/comments",
  });

  getComments = safepayMethod({
    method: "GET",
    fullPath: "/disputes/v1/{disputeId}/comments/?sort=desc",
  });
}
