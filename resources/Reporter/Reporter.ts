import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Reporter extends SafepayResource {
  resource(): Service {
    return Service.Reporter;
  }

  getPaymentV3 = safepayMethod({
    method: "GET",
    fullPath: "/api/v1/payments/{trackerId}",
  });
}
