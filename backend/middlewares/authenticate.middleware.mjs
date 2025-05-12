import { getUserVerification } from "../utils/Tgenerator.mjs";

//authentication of the JWT token from the header
export async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization && !authorization.startsWith("Bearer")) {
    return res
      .status(400)
      .send({ message: "Authorization token is invalid or missing!" });
  }

  const receivedToken = authorization.split(" ")[1];

  try {
    const decryptedToken = getUserVerification(receivedToken);
    // Verify and decode the received token using utility function
    // Attach decoded token info to the request for use in further middleware or route handlers
    req.user = decryptedToken;

    // Proceed to the next middleware/handler
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized - Invalid token!" });
  }
}
