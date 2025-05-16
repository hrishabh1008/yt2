// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./AuthContext";

// // Provider
// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null); // Store user object
    
//     useContext(AuthContext)

//   // Load from localStorage on app start
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData));
//     localStorage.setItem("token", userData.token); // Optional: if you use JWT
//     setUser(userData);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, isAuthenticated: !!user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
