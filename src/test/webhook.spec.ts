import { expect } from "chai";
import { Safepay } from "../safepay";
import * as resources from "../resources";

const EVENT_PAYLOAD = {
  id: "evt_test_webhook",
  object: "event",
};
const EVENT_PAYLOAD_STRING = JSON.stringify(EVENT_PAYLOAD, null, 2);
const SECRET = "whsec_test_secret";

const safepay = new Safepay({
  environment: "local",
  secretKey: SECRET,
  resources,
});

describe(".constructEvent", () => {
  it("should check .........", () => {
    //safepay.webhook()
    expect(() => {}).to.throw();
  });
});
