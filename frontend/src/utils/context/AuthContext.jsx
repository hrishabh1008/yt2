 
import React, { createContext, useContext} from "react";

// Create context
export const AuthContext = createContext();

// Hook for easy use
export const useAuth = () => useContext(AuthContext);

