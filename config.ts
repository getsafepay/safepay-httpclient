export type Environment = "local" | "development" | "sandbox" | "production";

export type Config = {
  environment: Environment;
  basePath?: string;
  apiKey?: string;
  sessionToken?: string;
};
