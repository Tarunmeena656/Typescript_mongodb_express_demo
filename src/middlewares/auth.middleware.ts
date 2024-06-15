import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import passport from "passport";
import createError from "http-errors";
import { ExtractJwt } from "passport-jwt";
import { Strategy as JWTstrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { IUser, userModel } from "../models/user.model";
import { APP_CONFIG } from "../config";

//check login and give token to user
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user: any = await userModel.findOne({ email });
        if (!user) throw createError.Unauthorized("Invalid email");
        const validatePassword = await user.comparePassword(password);
        if (!validatePassword) throw createError.Unauthorized("Invalid");
        const payload = { _id: user._id, role: user.role };
        const token = sign(payload, APP_CONFIG.JWT_SECRETS, {
          expiresIn: "7d",
        });
        done(null, { token });
      } catch (error) {
        done(error);
      }
    }
  )
);

// verify a token
passport.use(
  "jwt",
  new JWTstrategy(
    {
      secretOrKey: APP_CONFIG.JWT_SECRETS,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const { _id } = token;
        const user: IUser | null = await userModel.findById(_id).lean();
        if (!user) throw createError.Unauthorized("Invalid user");
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

//check role
// export function hasRole(roles: string[]) {
//   return function (req: Request, res: Response, next: NextFunction) {
//     if (roles.includes((req.user as IUser)?.role)) {
//       return next();
//     } else {
//       return next(new Error("You don't have sufficient access to this route."));
//     }
//   };
// }

export const checkRole =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes((req.user as IUser).role)) {
      return next();
    } else {
      return next(new Error("You don't have sufficient access to this route."));
    }
  };
