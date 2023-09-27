import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Order extends SafepayResource {
  resource(): Service {
    return Service.Order;
  }

  refund = safepayMethod({
    method: "POST",
    fullPath: "/payments/v2/credit",
  });

  reverse = safepayMethod({
    method: "POST",
    fullPath: "/payments/v2/reverse",
  });
}
