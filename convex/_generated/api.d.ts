/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as artists from "../artists.js";
import type * as auth from "../auth.js";
import type * as favorites from "../favorites.js";
import type * as featured from "../featured.js";
import type * as http from "../http.js";
import type * as migration from "../migration.js";
import type * as movies from "../movies.js";
import type * as userLikes from "../userLikes.js";
import type * as userMovies from "../userMovies.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  artists: typeof artists;
  auth: typeof auth;
  favorites: typeof favorites;
  featured: typeof featured;
  http: typeof http;
  migration: typeof migration;
  movies: typeof movies;
  userLikes: typeof userLikes;
  userMovies: typeof userMovies;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
