import { Router } from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";
const appRouter = Router();
// here we are using the middleware and , if the request is made to /user then we will move on and use the userroutes over there to handle those incoming request
appRouter.use("/user", userRoutes);
// here we are using the middleware and , if the request is made to /chat then we will move on and use the userroutes over there to handle those incoming request
appRouter.use("/chats", chatRoutes);
export default appRouter;
//# sourceMappingURL=index.js.map