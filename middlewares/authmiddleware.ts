// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export const auth = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.cookies?.token;
//   if (!token) return res.sendStatus(401);

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET!);
//     next();
//   } catch {
//     return res.sendStatus(401);
//   }
// };


import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    req.user = decoded.userId;
    next();
  } catch {
    return res.sendStatus(401);
  }
};
