import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Discount extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  getDiscounts = safepayMethod({
    method: "GET",
    fullPath: "/discounts/v1/discount",
  });

  createDiscount = safepayMethod({
    method: "POST",
    fullPath: "/discounts/v1/discount/",
  });

  updateDiscount = safepayMethod({
    method: "PUT",
    fullPath: "/discounts/v1/discount/{id}",
  });

  deleteDiscount = safepayMethod({
    method: "DELETE",
    fullPath: "/discounts/v1/discount/{id}",
  });

  getCardSchemes = safepayMethod({
    method: "GET",
    fullPath: "/discounts/v1/cardscheme",
  });

  getPricerules = safepayMethod({
    method: "GET",
    fullPath: "/discounts/v1/pricerule",
  });

  createPriceRule = safepayMethod({
    method: "POST",
    fullPath: "/discounts/v1/pricerule/",
  });

  updatePriceRule = safepayMethod({
    method: "PUT",
    fullPath: "/discounts/v1/pricerule/{id}",
  });

  deletePriceRule = safepayMethod({
    method: "DELETE",
    fullPath: "/discounts/v1/pricerule/{id}",
  });

  createCardScheme = safepayMethod({
    method: "POST",
    fullPath: "/discounts/v1/cardscheme/",
  });

  updateCardScheme = safepayMethod({
    method: "PUT",
    fullPath: "/discounts/v1/cardscheme/{id}",
  });

  deleteCardScheme = safepayMethod({
    method: "DELETE",
    fullPath: "/discounts/v1/cardscheme/{id}",
  });
}
