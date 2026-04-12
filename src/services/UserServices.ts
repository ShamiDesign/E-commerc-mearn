import { userModel } from "../models/UserModel.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface registerParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: registerParams) => {
  const findUser = await userModel.findOne({ email });
  if (findUser) {
    return { data: "This user is Exists", statusCode: 400 };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  return {
    data: generateJWT({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email,
    }),
    statusCode: 200,
  };
};

interface loginparams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: loginparams) => {
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return { data: "Uncorrect Email or Password", statusCode: 400 };
  }
  const passwordMatch = await bcrypt.compare(password, findUser.password);
  if (passwordMatch) {
    return {
      data: generateJWT({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email,
      }),
      statusCode: 200,
    };
  }
  return { data: "Uncorrect Email or Password", statusCode: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "kilTnpBmhIge_bPExlCa");
};
