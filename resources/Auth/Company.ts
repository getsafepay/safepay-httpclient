import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Company extends SafepayResource {
  resource(): Service {
    return Service.Auth;
  }

  login = safepayMethod({
    method: "POST",
    path: "/company/login",
  });

  authenticate = safepayMethod({
    method: "POST",
    path: "/company/authenticate",
  });

  logout = safepayMethod({
    method: "POST",
    path: "/logout",
  });

  getAllClients = safepayMethod({
    method: "GET",
    fullPath: "/v1/clients",
  });

  memberForgotPassword = safepayMethod({
    method: "POST",
    path: "/reset/password/client",
  });
}
