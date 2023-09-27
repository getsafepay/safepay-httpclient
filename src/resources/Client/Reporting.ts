import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Reporting extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  payments = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/payment",
  });

  transactions = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/transactions",
  });

  summary = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/summary",
  });

  budget = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/budget",
  });

  export = safepayMethod({
    method: "POST",
    fullPath: "/reporting/v1/export",
  });

  details = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/{trackerId}/details",
  });

  refunds = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/payment",
  });

  grossVolume = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/gross-volume",
  });

  totalTransactions = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/total-transactions",
  });

  netVolume = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/net-volume",
  });

  volumeByIntent = safepayMethod({
    method: "GET",
    fullPath: "/reporting/v1/volumes-by-intent",
  });

  disputesCharts = safepayMethod({
    method: "GET",
    fullPath: "/disputes/v1/reporting/total-disputes",
  });
}
