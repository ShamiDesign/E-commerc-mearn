import express from "express";
import { login, register } from "../services/UserServices.ts";

export const router = express.Router();

// Registering
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).send("Somethig went wrong!");
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, statusCode } = await login({ email, password });
    res.status(statusCode).json(data);
  } catch (error) {
    res.status(500).send("Somethig went wrong!");
  }
});
