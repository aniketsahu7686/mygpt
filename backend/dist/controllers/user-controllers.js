import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constant.js";
export const getAllUsers = async (req, res, next) => {
    try {
        // we will get all of the users from backend(database), so to do this we will assign this function in userRouters to get all the user
        // we have a function inside the mongoose called find() which works as a query
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// this is a for the userSignup
export const userSignup = async (req, res, next) => {
    try {
        // Extract the user details from the request body
        const { name, email, password } = req.body;
        // before creating a brand new user , we also need to verify if there was a same email inside the database, if it is the email should not be added.
        const existingUser = await User.findOne({ email });
        // if the user have already registerd , them can't register again , as mail has been stored in database.
        if (existingUser)
            return res.status(401).send("User already registered");
        // before storing we will hash the password
        const hashedPassword = await hash(password, 10);
        // now just create a brand new user
        // Create a new user instance
        const user = new User({ name, email, password: hashedPassword });
        // we have to save the user , for saving a new record inside the database we use the user.save
        await user.save();
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(201).json({ message: "ERROR", cause: error.message });
    }
};
// this is a for the userLogin
export const userLogin = async (req, res, next) => {
    try {
        // user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // we need to verify that the user is there or not.
        if (!user) {
            return res.status(401).send("User not registered");
        }
        // now we need to verify the password.(From the bycrpt, we have a function of compare as well , we cannot directly dycrpt the password  as it required a lot of calculation.)  . So , compare is easy.
        // this will give us a boolean value.
        const isPasswordCorrect = await compare(password, user.password);
        // we will verify , if the password is correct or not
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        // this will clear the cookie of the response of the user
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/"
        });
        // after the password was correct , we can just create a new token over here.
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // to send the cookie from backend to frontend
        res.cookie(COOKIE_NAME, token, { path: "/", domain: "localhost", expires, httpOnly: true, signed: true });
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map