// Import User model to interact with the users collection in the database
import User from "../models/User.js";
// Import hash and compare functions from bcrypt for password hashing and verification
import { hash, compare } from "bcrypt";
// Import createToken utility function to generate authentication tokens
import { createToken } from "../utils/token-manager.js";
// Import COOKIE_NAME constant to standardize the cookie name for authentication
import { COOKIE_NAME } from "../utils/constant.js";
// Controller function to get all users from the database
export const getAllUsers = async (req, res, next) => {
    try {
        // Fetch all users using Mongoose's find() method
        const users = await User.find();
        // Respond with a status of 200 and a JSON object containing a message and the list of users
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        // Log and respond with an error if something goes wrong
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// Controller function to handle user signup
export const userSignup = async (req, res, next) => {
    try {
        // Extract name, email, and password from the request body
        const { name, email, password } = req.body;
        // Check if a user with the provided email already exists in the database
        const existingUser = await User.findOne({ email });
        // If user exists, return a 401 status indicating the user is already registered
        if (existingUser)
            return res.status(401).send("User already registered");
        // Hash the password before saving it to the database
        const hashedPassword = await hash(password, 10);
        // Create a new user instance with the provided and hashed password
        const user = new User({ name, email, password: hashedPassword });
        // Save the new user record to the database
        await user.save();
        // Clear any existing authentication cookie for the user
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        // Generate a token with the user's ID and email, valid for 7 days
        const token = createToken(user._id.toString(), user.email, "7d");
        // Set expiration date for the cookie to 7 days from now
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // Set a new authentication cookie with the generated token
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        // Respond with a status of 200 and the user ID in JSON
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        // Log and respond with an error if something goes wrong
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// Controller function to handle user login
export const userLogin = async (req, res, next) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
        // Find the user by email in the database
        const user = await User.findOne({ email });
        // If user is not found, return a 401 status indicating the user is not registered
        if (!user) {
            return res.status(401).send("User not registered");
        }
        // Compare the provided password with the stored hashed password
        const isPasswordCorrect = await compare(password, user.password);
        // If password is incorrect, return a 403 status
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        // Clear any existing authentication cookie for the user
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        // Generate a token with the user's ID and email, valid for 7 days
        const token = createToken(user._id.toString(), user.email, "7d");
        // Set expiration date for the cookie to 7 days from now
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // Set a new authentication cookie with the generated token
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        // Respond with a status of 200 and the user ID in JSON
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        // Log and respond with an error if something goes wrong
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map