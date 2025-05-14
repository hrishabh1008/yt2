import React, { createContext, useState, useEffect } from "react";

export const userContext = createContext({
  isSignedIn: false,
  user: null,
  token: null,
  signIn: () => {},
  signOut: () => {},
});

export const UserProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Auto-login if token exists and is valid
  useEffect(() => {
    const stored = localStorage.getItem("yt2_user_auth");
    if (stored) {
      try {
        const { user, token } = JSON.parse(stored);
        if (token) {
          setIsSignedIn(true);
          setUser(user);
          setToken(token);
        }
      } catch (e) {
        localStorage.removeItem("yt2_user_auth");
      }
    }
  }, []);

  // Sign in and persist user/token
  const signIn = (user, token) => {
    setIsSignedIn(true);
    setUser(user);
    setToken(token);
    localStorage.setItem(
      "yt2_user_auth",
      JSON.stringify({ user, token })
    );
  };

  // Sign out and clear storage
  const signOut = () => {
    setIsSignedIn(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("yt2_user_auth");
  };

  return (
    <userContext.Provider
      value={{ isSignedIn, user, token, signIn, signOut }}
    >
      {children}
    </userContext.Provider>
  );
};