import React, { createContext } from "react";

export const userContext = createContext({
  isSignedIn: false,
  user: null,
  token: null,
  signIn: () => {},
  signOut: () => {},
});
