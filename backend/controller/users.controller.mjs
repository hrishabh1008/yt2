// Importing the user model to interact with the database
import userModel from "../model/users.model.mjs";

// Importing utility function to generate authentication tokens
import { setUserAuthentication } from "../utils/Tgenerator.mjs";

/**
 * Controller function to handle user registration
 */
export async function addUser(req, res) {
  try {
    // Extracting user details from the request body
    const { userName, userEmail, userPassword } = req.body;

    console.log(
      `userName: ${userName}, userEmail: ${userEmail}, userPassword: ${userPassword}`
    );

    // Check if a user with the same userName already exists
    // Query the database to check if a user with the same userName already exists
    const existingUser = await userModel.findOne({ userName });

    if (existingUser) {
      // If user exists, return a 400 status with an appropriate message
      return res.status(400).send({ message: "Username already exists." });
    }

    // Create a new user in the database
    const userRegistered = await userModel.create({
      userName,
      userEmail,
      userPassword,
    });

    if (!userRegistered) {
      // If user creation fails, return a 400 status
      return res
        .status(400)
        .send({ message: "User registration unsuccessful" });
    }

    // Return success response with user details
    return res.status(201).send({
      message: "User registered successfully.",
      userDetails: { userName, userEmail },
    });
  } catch (error) {
    // Log the error and return a 500 status for server errors
    console.error("Error during user registration:", error);
    return res.status(500).send({ message: "Error in registering user" });
  }
}

/**
 * Controller function to handle user login
 */
export async function loginUser(req, res) {
  // console.log(req);
  try {
    // Extracting user details from the request object (assumes middleware has set req.user after verifying the token)
    const user = {
      id: req.user._id,
      userName: req.user.userName,
    };

    console.log(`User ID: ${user.id}`);
    console.log(`Username: ${user.userName}`);

    // Generate an authentication token for the user
    const token = setUserAuthentication(user);

    if (token) {
      // If token generation is successful, return success response with token and user details
      return res.status(200).send({
        message: "User successfully logged in!",
        token,
        user: req.user,
      });
    }

    // If token generation fails, return a 401 status
    return res.status(401).send({ message: "Unsuccessful login!" });
  } catch (error) {
    // Log the error and return a 500 status for server errors
    console.error("Error while logging in user:", error);
    return res.status(500).send({ message: "Error while logging in user" });
  }
}
