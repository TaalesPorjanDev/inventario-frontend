import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../utils/userStore.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

function sanitizeUser(user) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  };
}

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Preencha todos os campos" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Senha deve ter no mínimo 6 caracteres" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ fullName, email, passwordHash });

  if (!user) {
    return res.status(409).json({ message: "Email already exists" });
  }

  return res.status(201).json({
    message: "Usuário criado com sucesso",
    user: sanitizeUser(user),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Preencha email e senha" });
  }

  const user = findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Email ou senha inválidos" });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Email ou senha inválidos" });
  }

  const token = createToken(user.id);
  res.cookie("token", token, COOKIE_OPTIONS);

  return res.json({
    message: "Login realizado com sucesso",
    user: sanitizeUser(user),
  });
});

router.get("/me", authMiddleware, (req, res) => {
  const user = findUserById(req.user.userId);

  if (!user) {
    return res.status(401).json({ message: "Usuário não encontrado" });
  }

  return res.json({ user: sanitizeUser(user) });
});

router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.json({ message: "Logout realizado com sucesso" });
});

export default router;
