import dotenv from "dotenv"; // Import dotenv to load environment variables
dotenv.config(); // Load environment variables from .env file

import jwt from "jsonwebtoken"; // Import jsonwebtoken for JWT operations

// eslint-disable-next-line no-undef
const key = process.env.ENCRYPTION_KEY; // Get the encryption key from environment variables

// Function to generate a JWT for a user
export function setUserAuthentication(user) {
  return jwt.sign(user, key); // Sign the user object with the secret key
}

// Function to verify and decode a JWT
export function getUserVerification(token) {
  try {
    // Verifying and decoding the token using the secret key
    const decoded = jwt.verify(token, key);
    return decoded; // Return decoded token content (e.g., user data)
  } catch (err) {
    throw new Error("Invalid token"); // Throw error if token is invalid
  }
}
