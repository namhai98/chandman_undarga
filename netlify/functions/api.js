import serverless from "serverless-http";
import { createApp } from "../../server/src/app.js";

const FUNCTION_PREFIX = "/.netlify/functions/api";

// Reused across warm invocations.
const wrapped = serverless(createApp());

/**
 * Netlify rewrites `/api/*` (see netlify.toml) to this function, so the incoming
 * path is `/.netlify/functions/api/<rest>`. Put the `/api` prefix back before
 * handing the event to Express, whose routes are mounted under `/api`.
 */
export const handler = async (event, context) => {
  const rest = (event.path || "").slice(FUNCTION_PREFIX.length) || "";
  event.path = `/api${rest}`;
  if (event.rawUrl) {
    event.rawUrl = event.rawUrl.replace(FUNCTION_PREFIX, "/api");
  }
  return wrapped(event, context);
};
