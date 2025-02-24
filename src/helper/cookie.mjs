// clear cookie
export const clearCookie = (res, cookieName) => {
  res.clearCookie(cookieName, {
    secure: true,
    sameSite: "none",
    httpOnly: true,
  });
};

// set cookie
export const setCookie = ({ res, cookieName, cookieValue, maxAge }) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    maxAge,
    secure: true,
    sameSite: "none",
  });
};
