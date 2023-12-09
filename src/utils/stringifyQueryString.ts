export function stringifyQueryString(param: { [key: string]: string | number | boolean | undefined }): string {
  const querystring = require("querystring");
  const parsedQuery = querystring.stringify(param);
  return parsedQuery;
}
