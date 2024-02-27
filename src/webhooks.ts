import * as crypto from "crypto";

export class Webhook {
  constructEvent(payload: string, secret: string) {
    this.verifyHeader(payload, secret);

    // const jsonPayload =
    //   payload instanceof Uint8Array
    //     ? JSON.parse(new TextDecoder("utf8").decode(payload))
    //     : JSON.parse(payload);
    return JSON.parse(payload);
  }

  verifyHeader(payload: string, secret: string) {
    //todo: to be parse here
    return this.computeHMACSignature(payload, secret);
  }

  computeHMACSignature(payload: string, secret: string): string {
    return crypto
      .createHmac("sha512", secret)
      .update(payload, "utf8")
      .digest("hex");
  }

  secureCompare(a: string, b: string): boolean {
    // return early here if buffer lengths are not equal
    if (a.length !== b.length) {
      return false;
    }
    const len = a.length;
    let result = 0;
    for (let i = 0; i < len; ++i) {
      result |= a.charCodeAt(i) ^ b.charCodeAt(i);
    }
    return result === 0;
  }
}
