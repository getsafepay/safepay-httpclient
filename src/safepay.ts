import { utils } from "./utils";
import * as resources from "./resources";
import SafepayResource from "./resource";
import { HttpClient } from "./net/httpClient";
import { Config, Environment } from "./config";
import { AxiosHttpClient } from "./net/axiosHttpClient";
import { webhookMethod } from "./method";

export type ResourceModuleType = typeof resources;
enum ENVIRONMENT {
  LOCAL = "local",
  DEVELOPMENT = "development",
  SANDBOX = "sandbox",
  PRODUCTION = "production",
}
const DEFAULT_BASE_PATH = "/v1/";

export enum Service {
  Auth = "auth",
  Client = "client",
  Invoice = "invoice",
  Order = "order",
  Reporter = "reporter",
}

type Api = {
  baseUrl?: string;
  basePath?: string;
  auth?: string;
  apiKey?: string;
  secretKey?: string;
  httpClient?: HttpClient;
  services?: { [key in Service]: string };
};

export class Safepay {
  private api: Api;

  service!: { [key: string]: SafepayResource };

  webhook!: void;

  constructor(props: Config) {
    this.api = {};
    this.service = {};

    this.setBaseUrl(props.environment);
    this.setServices(props.environment);

    if (props.apiKey) {
      this.setApiKey(props.apiKey);
    }

    if (props.sessionToken) {
      this.setAuth(props.sessionToken);
    }

    this.setBasePath(props.basePath || DEFAULT_BASE_PATH);

    this.setHttpClient(new AxiosHttpClient());
    this.prepResources(props.resources);
    this.attachWebhook(props.header, props.payload);
  }

  private setApiKey(apiKey: string) {
    this.setApiField("apiKey", apiKey);
  }

  getApiKey(): string | undefined {
    return this.getApiField("apiKey");
  }

  private setSecretKey(apiKey: string) {
    this.setApiField("secretKey", apiKey);
  }

  getSecretKey(): string | undefined {
    return this.getApiField("secretKey");
  }

  private setAuth(session: string) {
    this.setApiField("auth", `Bearer ${session}`);
  }

  getAuth(): string | undefined {
    return this.getApiField("auth");
  }

  private setBaseUrl(env: Environment) {
    const baseUrl = this.getBaseUrlFromEnv(env);
    this.setApiField("baseUrl", baseUrl);
  }

  getBaseUrl(): string | undefined {
    return this.getApiField("baseUrl");
  }

  private setBasePath(path: string) {
    this.setApiField("basePath", path);
  }

  getBasePath(): string {
    return this.getApiField("basePath");
  }

  private setServices(env: Environment) {
    const services = this.getServicesFromEnv(env);
    this.setApiField("services", services);
  }

  getService(svc: Service): string {
    const services = this.getApiField("services");
    return services[svc];
  }

  private setHttpClient(client: HttpClient) {
    this.setApiField("httpClient", client);
  }

  getHttpClient(): HttpClient {
    return this.getApiField("httpClient");
  }

  private setApiField(key: keyof Api, value: any) {
    this.api[key] = value;
  }

  private getApiField(key: keyof Api): any {
    return this.api[key];
  }

  private prepResources(resources: ResourceModuleType) {
    for (const name in resources) {
      const resource = resources[name as keyof ResourceModuleType];
      this.service[utils.pascalToCamelCase(name)] = new resource(this);
    }
  }

  private attachWebhook(header?: { [key: string]: string }, payload?: string) {
    if (!payload || !header) return;
    this.webhook = webhookMethod({ payload, header });
    return this.webhook;
  }

  private getBaseUrlFromEnv(env: Environment): string {
    switch (env) {
      case ENVIRONMENT.LOCAL:
        return `http://localhost`;
      case ENVIRONMENT.DEVELOPMENT:
        return `https://dev.api.getsafepay.com`;
      case ENVIRONMENT.SANDBOX:
        return `https://sandbox.api.getsafepay.com`;
      case ENVIRONMENT.PRODUCTION:
        return `https://api.getsafepay.com`;
      default:
        throw new Error("invalid environment");
    }
  }

  private getServicesFromEnv(env: Environment): { [key in Service]: string } {
    switch (env) {
      case ENVIRONMENT.LOCAL:
        return {
          [Service.Auth]: ":4000",
          [Service.Client]: ":4030",
          [Service.Invoice]: ":5000",
          [Service.Order]: ":4010",
          [Service.Reporter]: ":4001",
        };
      case ENVIRONMENT.DEVELOPMENT:
      case ENVIRONMENT.SANDBOX:
      case ENVIRONMENT.PRODUCTION:
        return {
          [Service.Auth]: "/auth",
          [Service.Client]: "/client",
          [Service.Invoice]: "/invoice",
          [Service.Order]: "/order",
          [Service.Reporter]: "/reporter",
        };
      default:
        throw new Error("invalid environment");
    }
  }
}
