import jwt from "jsonwebtoken";
import { AuthModel } from "./models/Auth";
import { Document } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
let JWT_SECRET = process.env.JWT_SECRET || "";

// function for creating tokens
export function signToken(auth: Document) {
  // toObject() returns a basic js object with only the info from the db
  const authData = auth.toObject();
  return jwt.sign(authData, JWT_SECRET);
}

// function for verifying tokens
export function verifyToken(req: any, res: any) {
  // grab token from either headers, req.body, or query string
  const token = req.get("token") || req.body.token || req.query.token;
  // if no token present, deny access
  if (!token)
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  // otherwise, try to verify token
  jwt.verify(token, JWT_SECRET, (err: any, decodedData: any) => {
    // if problem with token verification, deny access
    if (err)
      return res
        .status(403)
        .json({ success: false, message: "Invalid token." });
    // otherwise, search for auth by id that was embedded in token
    AuthModel.findById(decodedData._id, (err: any, dbRes: any) => {
      // if no auth, deny access
      if (!dbRes)
        return res
          .status(403)
          .json({ success: false, message: "Invalid token." });
      // otherwise, add auth to req object
      res.json(dbRes);
    });
  });
}
