import { Request, Response, Router } from "express";
import { getRepository, QueryFailedError } from "typeorm";
import { validationResult, body } from "express-validator";

import { User } from "@app/models/entity/User";
import { UserAuthLogin, UserAuthSignup } from "@app/types/user";
import HashPassword from "@app/utils/HashPassword";
import GenerateToken from "@app/utils/GenerateToekn";
import authMiddleware from "@app/middleware/auth";
import { UserRole } from "@app/models/entity/UserRole";

const AuthRotuer = Router();

/** Login */
AuthRotuer.post(
  "/login",
  body("username", "Username is required").exists(),
  body("password", "Password is required").exists(),
  async (req: Request, res: Response) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty())
      return res.status(400).json({
        message: "Error, login failed",
        err: validationError,
      });

    const body: UserAuthLogin = req.body;
    try {
      const user = await getRepository(User).findOne({
        where: { username: body.username },
      });

      if (typeof user === "undefined") res.sendStatus(404);

      if (user.password_hash !== HashPassword(body.password))
        return res.status(401).json({
          message: "Username or password incorrect",
        });

      const token = GenerateToken(String(user.id));

      res.cookie("user-token", `Bearer ${token}`, {
        httpOnly: true,
        expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
      });

      /** Provide the token, */
      return res.json({
        success: "user logged in successfully",
        token,
      });
    } catch (err) {
      console.log("[Auth Login]", {
        err,
      });
    }
  },
);

/** Signup */
AuthRotuer.post(
  "/signup",
  body("fullname", "Fullname is required.").exists().isAscii(),
  body("email", "Email is required.").exists().isEmail(),
  body(
    "username",
    "Username should only contain letter and numbers, and a must be a minimum of 5 characters.",
  )
    .exists()
    .isAlphanumeric()
    .isLength({ min: 5 }),
  body("password", {
    "A strong password should be": [
      "minimum length (8) characters",
      "atleast one lowercase letter",
      "atleast one uppercase letter",
      "at least 1 number",
      "at least 1 symbol",
    ],
  })
    .exists()
    .isStrongPassword(),
  async (req: Request, res: Response) => {
    /** Check if validation error occurs */
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      return res.status(400).json({
        message: "Creating user account failed",
        error: validationError,
      });
    }

    /** request data */
    const body: UserAuthSignup = req.body;

    /** user model, for db */
    const user = new User();
    user.fullname = body.fullname;
    user.email = body.email;
    user.username = body.username;
    user.password_hash = HashPassword(body.password);

    /** Adding User Role */
    const userRole = new UserRole();
    userRole.user = user;
    userRole.isAdmin = body.isadmin ? true : false;

    try {
      await getRepository(User).manager.save(user);
      await getRepository(UserRole).manager.save(userRole);
    } catch (err) {
      if (err instanceof QueryFailedError) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        switch ((err as any).code) {
          case "ER_DUP_ENTRY": {
            return res.status(400).json({
              message: `User with the exact username or email exists`,
            });
          }
        }
      }

      console.error("[Auth SignUp]", {
        err,
      });
    }

    /** Response to show user has been created with this information */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, ...userAccountResponse } = user;

    return res.json({
      success: "User account created successfully",
      user: userAccountResponse,
    });
  },
);

AuthRotuer.get(
  "/checkcredentials",
  authMiddleware,
  (req: Request, res: Response) => res.sendStatus(200),
);

// TODO: Add update for tokens.
//  - send with Auth-Header
//  - and update the token.

export default AuthRotuer;
