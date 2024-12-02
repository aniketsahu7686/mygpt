import { Request, Response, NextFunction } from "express"; // Importing types for Request, Response, and NextFunction from Express.
import jwt from "jsonwebtoken"; // Importing the JSON Web Token (JWT) library for creating and verifying tokens.
import { COOKIE_NAME } from "./constants.js"; // Importing a constant for the cookie name.

// Function to create a JWT token
export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email }; // Payload contains user ID and email.
  
  // Generating a JWT token with the payload, secret, and expiry duration.
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token; // Returning the generated token.
};

// Middleware to verify the JWT token
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Retrieve the signed token from the cookies using the COOKIE_NAME constant.
  const token = req.signedCookies[`${COOKIE_NAME}`];

  // If the token is missing or empty, respond with a 401 Unauthorized status.
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  // Using a Promise to verify the token asynchronously.
  return new Promise<void>((resolve, reject) => {
    // Verify the token with the secret key.
    jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      if (err) {
        // If verification fails (e.g., token expired), reject the Promise and respond with an error.
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        // If successful, resolve the Promise and attach the decoded token data to `res.locals`.
        resolve();
        res.locals.jwtData = success; // Attach token data (e.g., id, email) for use in subsequent middleware or routes.

        // Proceed to the next middleware or route handler.
        return next();
      }
    });
  });
};
