// routes/auth.ts
import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import { db } from "../db/client";
import { users, passwordResets } from "../db/schema";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { signJWT } from "../utils/jwt";
import crypto from "crypto";
import { z } from "zod";
import { signupSchema, loginSchema } from "../schema/authSchema";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/signup", async (req, res) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json(parsed.error.flatten());
  }

  const { name, email, password } = parsed.data;

  // Check if user already exists
  const existingUser = await db.select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then((res) => res[0]);

  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  await db.insert(users).values({
    name,
    email,
    passwordHash: await hashPassword(password),
  });

  res.json({ success: true });
});


router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const { email, password } = parsed.data;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)
    .then(res => res[0]);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = signJWT(user.id);

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});


router.post("/forgot-password", async (req, res) => {
  const token = crypto.randomUUID();

  await db.insert(passwordResets).values({
    userId: req.body.userId,
    token,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  res.json({ success: true });
});


router.post("/logout", (_req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({ success: true });
});

export default router;
