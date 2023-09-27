# Safepay Node.js Library

The Safepay Node library provides convenient access to the Safepay API from applications written in TypeScript.

### Usage

```ts
import Safepay from './index'

const safepay = new Safepay({
  // required prop
  environment: 'sandbox',
  // optional prop. Can be used to set
  // the global version of apis e.g /v1/
  basePath
  // optional prop. The apikey of the merchant
  // added to the header X-SFPY-MERCHANT-KEY
  apiKey
  // optional prop. The session token to make
  // authenticated requests
  sessionToken
})

safepay.service.company.login({
  email: 'customer@example.com',
  password: 'abcd1234'
})
  .then(company => console.log(company.token))
  .catch(error => console.error(error));

```
