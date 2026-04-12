import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { cartModel } from "../models/CartModel.ts"
import { userModel } from "../models/UserModel.ts";

interface ExtendRequest extends Request {
  user?: any;
}
const ValidateJWT = async (
  req: ExtendRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.get("authorization");
  if (!authorizationHeader) {
    res.status(403).send("Authorization is not provider");
    return;
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    res.status(403).send("Bearat token is not invaid");
    return;
  }
  jwt.verify(token, "kilTnpBmhIge_bPExlCa", async (err, payload) => {
    if (err) {
      res.status(403).send("Token is not invalid");
      return;
    }
    if (!payload) {
      res.status(403).send("Payload is not invaid");
      return;
    }
    const userPayload = payload as {
      firstName: string;
      lastName: string;
      email: string;
    };
    const user = await userModel.findOne({
      email: userPayload.email,
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
    });
    if (!user) {
      return res.status(401).send("User not found");
    }
    req.user = user;
    next();
  });
};

export default ValidateJWT;
