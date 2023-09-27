import SafepayResource from "../../resource";
import { safepayMethod } from "../../method";
import { Service } from "../../safepay";

export class Evidence extends SafepayResource {
  resource(): Service {
    return Service.Client;
  }

  createEvidence = safepayMethod({
    method: "POST",
    fullPath: "/evidences/v1/",
  });

  updateEvidence = safepayMethod({
    method: "PATCH",
    fullPath: "/evidences/v1/{evidenceId}",
  });

  getEvidence = safepayMethod({
    method: "GET",
    fullPath: "/evidences/v1/{evidenceId}",
  });

  patchEvidence = safepayMethod({
    method: "PATCH",
    fullPath: "/evidences/v1/{id}",
  });

  submitEvidence = safepayMethod({
    method: "PUT",
    fullPath: "/evidences/v1/{evidenceId}/submit",
  });

  uploadAttachments = safepayMethod({
    method: "POST",
    fullPath: "/evidences/v1/{evidenceId}/attachments/",
    headers: {
      Accept: "*/*",
      "Content-Type": "multipart/form-data;",
    },
  });

  deleteAttachments = safepayMethod({
    method: "DELETE",
    fullPath: "/evidences/v1/{evidenceId}/attachments/{attachmentId}",
  });
}
