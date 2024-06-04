import { node_env } from "../app/secret.mjs";

// clear cookie
export const clearCookie = (res, cookieName) => {
  res.clearCookie(cookieName, {
    secure: node_env == "development" ? false : true,
    sameSite: node_env === "development" ? "Strict" : "none",
    httpOnly: true,
  });
};

// set cookie
export const setCookie = ({ res, cookieName, cookieValue, maxAge }) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    maxAge,
    secure: node_env === "development" ? false : true, // only https
    sameSite: node_env === "development" ? "Strict" : "none", // when use cross site
  });
};
