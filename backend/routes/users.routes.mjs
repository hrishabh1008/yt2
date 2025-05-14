// Import controller functions for user operations
import { addUser, loginUser } from "../controller/users.controller.mjs";
// Import middleware for password encryption and decryption
import {
  decryptUserPassword,
  encryptUserPassword,
} from "../middlewares/crypt.middleware.mjs";

// Define user-related routes
export function userRouter(app) {
  // Route to add a new user, encrypts password before calling addUser controller
  app.post("/register", encryptUserPassword, addUser);

  // Route to login user, decrypts password before calling loginUser controller
  app.post("/login", decryptUserPassword, loginUser);
}
