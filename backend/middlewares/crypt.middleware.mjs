import bcrypt from "bcrypt"; // Import bcrypt for password hashing and comparison
import userModel from "../model/user.model.mjs"; // Import the user model for database operations

/**
 * Middleware to encrypt the user's password before saving it to the database.
 * This ensures that passwords are stored securely.
 */
export async function encryptUserPassword(req, res, next) {
  const { userPassword } = req.body; // Extract the userPassword from the request body
  console.log(`userPassword: ${userPassword}`); // Log the received password for debugging

  // Check if the password is provided in the request
  if (!userPassword) {
    return res.status(400).send({ message: "Password missing!" }); // Return error if password is missing
  }

  // Hash the password using bcrypt with a salt round of 10
  bcrypt.hash(userPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.log(`Error in hashing userPassword: ${err}`); // Log the error if hashing fails
      return res
        .status(500)
        .send({ message: "Error in hashing userPassword", err }); // Return server error response
    }
    console.log(`hashedPassword: ${hashedPassword}`); // Log the hashed password for debugging

    req.body.userPassword = hashedPassword; // Replace the plain password with the hashed password
    next(); // Proceed to the next middleware or route handler
  });
}

/**
 * Middleware to decrypt and verify the user's password during login.
 * This ensures that the provided password matches the stored hashed password.
 */
export async function decryptUserPassword(req, res, next) {
  const { userName, userPassword } = req.body; // Extract userName and userPassword from the request body

  try {
    // Find the user in the database by their userName
    const user = await userModel.findOne({ userName: userName });

    // If the user does not exist, return an error response
    if (!user) {
      return res
        .status(401)
        .send({ message: `User doesn't exist with this userName!` });
    }

    // Compare the provided password with the stored hashed password
    const isUserVerified = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    // If the password does not match, return an error response
    if (!isUserVerified) {
      return res.status(401).send({ message: `Invalid userPassword!` });
    }

    req.user = user; // Attach the user object to the request for further use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(`Error in userPassword verification: ${error} `); // Log the error for debugging
    return res
      .status(500)
      .send({ message: `Error in userPassword verification: ${error}` }); // Return server error response
  }
}
