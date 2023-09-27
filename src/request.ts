import { Method } from "axios";
import SafepayResource from "./resource";
import { Spec } from "./method";
import { utils } from "./utils";

type RequestOpts = {
  requestMethod: Method;
  requestPath: string;
  bodyData: { [key: string]: any } | undefined;
  queryData: { [key: string]: any } | undefined;
  headers: { [key: string]: string } | undefined;
};

function getRequestOpts(
  self: SafepayResource,
  requestArgs: unknown,
  spec: Spec
): RequestOpts {
  if (!spec.path && !spec.fullPath) {
    throw new Error(
      `Safepay: Argument at least one of path or fullPath must be supplied`
    );
  }
  // Extract spec values with defaults.
  const requestMethod = (spec.method || "GET").toUpperCase() as Method;
  const urlParams = spec.urlParams as string[];

  const isUsingFullPath = spec.fullPath !== undefined;
  const commandPath = utils.makeURLInterpolator(
    spec.fullPath || spec.path || ""
  );
  const path = isUsingFullPath
    ? spec.fullPath
    : spec.path
    ? self.createResourcePathWithSymbols(spec.path)
    : "";

  // Don't mutate args externally.
  const args = [].slice.call(requestArgs);

  // Generate and validate url params.
  const urlData = urlParams.reduce(
    (urlData: { [key: string]: string }, param: string) => {
      const arg = args.shift();
      if (typeof arg !== "string") {
        throw new Error(
          `Safepay: Argument "${param}" must be a string, but got: ${arg} (on API request to \`${requestMethod} ${path}\`)`
        );
      }

      urlData[param] = arg;
      return urlData;
    },
    {}
  );

  // Pull request data and options (headers, auth) from args.
  const dataFromArgs = utils.getDataFromArgs(args);
  let data;
  const isFormData = dataFromArgs instanceof FormData;
  if (!isFormData) {
    data = Object.assign({}, dataFromArgs);
  } else {
    data = dataFromArgs;
  }
  // Validate that there are no more args.
  if (args.filter((x) => x != null).length && !isFormData) {
    throw new Error(
      `Safepay: Unknown arguments (${args}) (on API request to ${requestMethod} \`${path}\`)`
    );
  }

  // When using full path, we can just invoke the URL interpolator directly
  // as we don't need to use the resource to create a full path.
  const requestPath = self.createFullPath(
    commandPath,
    urlData,
    isUsingFullPath
  );

  const headers = Object.assign({}, spec.headers);
  const dataInQuery = spec.method === "GET" || spec.method === "DELETE";
  let bodyData = dataInQuery ? undefined : data;
  let queryData = dataInQuery ? data : undefined;

  // this check id added because of subscription DELETE wants data in body instead of query
  // will need backend to update
  if (
    spec.method === "DELETE" &&
    (requestPath.includes("/hooks/v1/subscription") ||
      requestPath.includes("/team/v1/member") ||
      requestPath.includes("/team/v1/invite"))
  ) {
    bodyData = queryData;
    queryData = {};
  }

  return {
    requestMethod,
    requestPath,
    bodyData,
    queryData,
    headers,
  };
}

export function makeRequest(
  self: SafepayResource,
  requestArgs: unknown,
  spec: Spec
) {
  return new Promise((resolve, reject) => {
    let opts;
    try {
      opts = getRequestOpts(self, requestArgs, spec);
    } catch (err) {
      reject(err);
      return;
    }

    return self
      .request(
        opts.requestPath,
        opts.requestMethod,
        opts.headers,
        opts.bodyData,
        opts.queryData
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
