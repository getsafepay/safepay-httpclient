import SafepayResource from "./resource";

const hasOwn = (obj: { constructor: any }, prop: PropertyKey) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

export const utils = {
  /**
   * Outputs a new function with interpolated object property values.
   * Use like so:
   *   const fn = makeURLInterpolator('some/url/{param1}/{param2}');
   *   fn({ param1: 123, param2: 456 }); // => 'some/url/123/456'
   */
  makeURLInterpolator: (() => {
    const rc: { [key: string]: string } = {
      "\n": "\\n",
      '"': '\\"',
      "\u2028": "\\u2028",
      "\u2029": "\\u2029",
    };
    return (str: string) => {
      const cleanString = str.replace(
        /["\n\r\u2028\u2029]/g,
        ($0) => rc[$0]
      );
      return (outputs: {
        [key: string]: string | number | boolean;
      }) => {
        return cleanString.replace(/\{([\s\S]+?)\}/g, ($0, $1) =>
          encodeURIComponent(outputs[$1] || "")
        );
      };
    };
  })(),

  extractUrlParams: (path: string): string[] => {
    const params = path.match(/\{\w+\}/g);
    if (!params) {
      return [];
    }

    return params.map((param) => param.replace(/[{}]/g, ""));
  },

  /**
   * Return the data argument from a list of arguments
   *
   * @param {object[]} args
   * @returns {object}
   */
  getDataFromArgs(args: object[]) {
    if (
      !Array.isArray(args) ||
      !args[0] ||
      typeof args[0] !== "object"
    ) {
      return {};
    } else if (args[0] instanceof FormData) {
      return args[0];
    }

    return args.shift();
  },

  /**
   * Normalize standard HTTP Headers:
   * {'foo-bar': 'hi'}
   * becomes
   * {'Foo-Bar': 'hi'}
   */
  normalizeHeaders: (obj: { [key: string]: any }) => {
    if (!(obj && typeof obj === "object")) {
      return obj;
    }

    return Object.keys(obj).reduce((result, header) => {
      result[utils.normalizeHeader(header)] = obj[header];
      return result;
    }, {} as { [key: string]: any });
  },

  /**
   * Stolen from https://github.com/marten-de-vries/header-case-normalizer/blob/master/index.js#L36-L41
   * without the exceptions which are irrelevant to us.
   */
  normalizeHeader: (header: string): string => {
    return header
      .split("-")
      .map(
        (text) =>
          text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
      )
      .join("-");
  },

  removeNullish: (obj: {
    [key: string]: any;
  }): { [key: string]: any } => {
    return Object.keys(obj).reduce((result, key) => {
      if (obj[key] != null) {
        result[key] = obj[key];
      }
      return result;
    }, {} as { [key: string]: any });
  },

  /**
   * Allow for special capitalization cases (such as OAuth)
   */
  pascalToCamelCase: (name: string) => {
    return name[0].toLowerCase() + name.substring(1);
  },
};
