import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = validationResult(req);
        console.log("Request body:", req.body); // Log the request body
        if (errors.isEmpty()) {
            return next();
        }
        console.log(errors.array()); // Log the validation errors
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Please enter a valid email address"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password should contain at least 6 characters"),
];
export const signUpValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];
//# sourceMappingURL=validators.js.map