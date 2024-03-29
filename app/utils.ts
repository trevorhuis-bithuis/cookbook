import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User } from "~/models/user.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@");
}

export enum Collection {
  recipe = "Recipe",
  user = "User",
}

type MongoRequestConfig = {
  collection: Collection;
  action: string;
  document?: object | null;
  update?: object | null;
  filter?: object | null;
  projection?: string | null;
  sort?: object | null;
  limit?: number | null;
  skip?: number | null;
  pipeline?: object | null;
};

export function buildMongoConfig({
  collection,
  action,
  document = null,
  update = null,
  filter = null,
  projection = null,
  sort = null,
  limit = null,
  skip = null,
  pipeline = null,
}: MongoRequestConfig) {
  let config: any = {
    method: "post",
    url: `${process.env.DATA_API_BASE_URL}/action/${action}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.DATA_API_KEY,
    },
    data: {
      dataSource: "cookbook",
      database: "cookbook",
      collection,
    },
  };

  if (document) config.data.document = document;
  if (update) config.data.update = update;
  if (filter) config.data.filter = filter;
  if (projection) config.data.projection = projection;
  if (sort) config.data.sort = sort;
  if (limit) config.data.limit = limit;
  if (skip) config.data.skip = skip;
  if (pipeline) config.data.pipeline = pipeline;

  return config;
}
