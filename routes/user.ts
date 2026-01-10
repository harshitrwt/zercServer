import { Router } from "express";
import { db } from "../db/client";
import { users, orders } from "../db/schema";
import { auth } from "../middlewares/authmiddleware";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", auth, async (req, res) => {
  const userId = typeof req.user === "string" ? req.user : (req.user as any)?.userId;

  if (!userId) return res.sendStatus(401);

  const user = await db.select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)
    .then((res) => res[0]);

  res.json(user);
});

router.get("/orders", auth, async (req, res) => {
  const userId = typeof req.user === "string" ? req.user : (req.user as any)?.userId;

  if (!userId) return res.sendStatus(401);

  const ordersList = await db.select()
    .from(orders)
    .where(eq(orders.userId, userId));

  res.json(ordersList);
});

export default router;
