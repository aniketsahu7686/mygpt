// routes/user-routes.js
import { Router } from "express";
import { getAllUsers, userSignup, userLogin } from "../controllers/user-controllers.js";
import { validate, signUpValidator, loginValidator } from "../utils/validators.js";
const userRoutes = Router();
//we don't want to create all the controllers and routes over here 
// for handlers function for handling this request , we make user-controller in controller folder
// we want the user-controller to handle the incoming requests for the users
// Route to get all users
userRoutes.get("/", getAllUsers);
// User signup route with validation
userRoutes.post("/signup", validate(signUpValidator), userSignup);
// User login route with validation
userRoutes.post("/login", validate(loginValidator), userLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map