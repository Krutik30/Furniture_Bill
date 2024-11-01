import { authTokensCache } from "./localCacheAPI";

export const getUserHasLoggedIn = () => {
  const authTokens = authTokensCache.getItem();
  const now = new Date().toISOString(); // Get the current date as a Date object
  const accessExpires = authTokens?.access?.expires && new Date(authTokens.access.expires).toISOString();
  // const refreshExpires = new Date(authTokens?.refresh?.expires).toISOString();
  
  const hasLoggedIn = (now < accessExpires);
  // || (now < refreshExpires);
  // console.log({now, accessExpires}, now < accessExpires);

  return hasLoggedIn;
}