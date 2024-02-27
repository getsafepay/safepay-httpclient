export type Environment = "local" | "development" | "sandbox" | "production";

export type Config = {
  environment: Environment;
  basePath?: string;
  apiKey?: string;
  sessionToken?: string;
  secretKey?: string;
  header?: { [key: string]: string };
  payload?: string;
  resources: any;
};
