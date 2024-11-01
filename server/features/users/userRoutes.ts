import express from "express";
import { registerUser, verifyUser } from "./userController";
import userValidations from "./userValidations";

export default function registerUserRoutes(app: express.Application): void {
  app
    .route("/api/v1/users/register")
    .post(userValidations.register, registerUser);
  app.route("/api/v1/users/verify").post(userValidations.verify, verifyUser);
}
