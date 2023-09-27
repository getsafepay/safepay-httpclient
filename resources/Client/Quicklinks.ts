import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Quicklinks extends SafepayResource {
  resource(): Service {
    return Service.Invoice;
  }

  create = safepayMethod({
    method: "POST",
    fullPath: "/quick-links/v1/",
  });

  update = safepayMethod({
    method: "PUT",
    fullPath: "/quick-links/v1/{linkId}",
  });

  find = safepayMethod({
    method: "GET",
    fullPath: "/quick-links/v1/{linkId}",
  });

  pay = safepayMethod({
    method: "GET",
    fullPath: "/quick-links/v1/{linkId}/",
  });

  delete = safepayMethod({
    method: "DELETE",
    fullPath: "/quick-links/v1/{linkId}",
  });

  status = safepayMethod({
    method: "GET",
    fullPath: "/status/v1/",
  });

  paginate = safepayMethod({
    method: "GET",
    fullPath: "quick-links/v1/", // /reporting/v1/track_3ea5dc03-0390-4360-810f-5d047130b2a3/details
  });
}
