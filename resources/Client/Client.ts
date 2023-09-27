import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Client extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  generateTBTToken = safepayMethod({
    method: "POST",
    fullPath: "/passport/v1/token",
  });

  client = safepayMethod({
    method: "GET",
    fullPath: "/v1/{clientId}",
  });

  member = safepayMethod({
    method: "GET",
    fullPath: "/team/v1/member",
  });

  register = safepayMethod({
    method: "POST",
    fullPath: "/v2/",
  });

  resetPassword = safepayMethod({
    method: "POST",
    fullPath: "/v2/password-reset/",
  });

  verifyCode = safepayMethod({
    method: "POST",
    fullPath: "/v2/verify/",
  });

  resendCode = safepayMethod({
    method: "POST",
    fullPath: "/v2/resend-code/",
  });

  forgetPassword = safepayMethod({
    method: "POST",
    fullPath: "/v2/forget-password/",
  });

  fileUpload = safepayMethod({
    method: "POST",
    fullPath: "/files/v1/",
    headers: {
      Accept: "*/*",
      "Content-Type": "multipart/form-data;",
    },
  });

  deleteFile = safepayMethod({
    method: "DELETE",
    fullPath: "/files/v1/{fileId}",
  });

  getFile = safepayMethod({
    method: "GET",
    fullPath: "/files/v1/",
  });

  setBranding = safepayMethod({
    method: "PUT",
    fullPath: "/v1/{clientId}",
  });

  setNotifications = safepayMethod({
    method: "PUT",
    fullPath: "/settings/v1/",
  });

  getNotifications = safepayMethod({
    method: "GET",
    fullPath: "/settings/v1/",
  });

  getAppSettings = safepayMethod({
    method: "GET",
    fullPath: "/api-settings/v1/",
  });

  getUpdatedAppSettings = safepayMethod({
    method: "PUT",
    fullPath: "/api-settings/v1/",
  });

  getTeamOrganization = safepayMethod({
    method: "GET",
    fullPath: "/team/v1/organization",
  });

  createOrganization = safepayMethod({
    method: "POST",
    fullPath: "/team/v1/organization",
  });

  getInvitesOrganization = safepayMethod({
    method: "GET",
    fullPath: "/team/v1/invite",
  });

  getDefaultRole = safepayMethod({
    method: "GET",
    fullPath: "/team/v1/role",
  });

  createMember = safepayMethod({
    method: "POST",
    fullPath: "/team/v1/invite",
  });

  updateMember = safepayMethod({
    method: "PUT",
    fullPath: "/team/v1/member",
  });

  deleteMember = safepayMethod({
    method: "DELETE",
    fullPath: "/team/v1/member",
  });

  deleteInvite = safepayMethod({
    method: "DELETE",
    fullPath: "/team/v1/invite",
  });

  testEvent = safepayMethod({
    method: "POST",
    fullPath: "/hooks/v1/test",
  });
}
