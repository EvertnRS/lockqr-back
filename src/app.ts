import express from "express";
import cors from "cors";

import authRoutes from "./presentation/routes/auth.routes";
import usersRoutes from "./presentation/routes/users.routes";
import doorsRoutes from "./presentation/routes/doors.routes";
import permissionRoutes from "./presentation/routes/permission.routes";
import accessRoutes from "./presentation/routes/access.routes";

import { authMiddleware } from "./application/middlewares/authMiddleware";
import { roleMiddleware } from "./application/middlewares/roleMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", authMiddleware, roleMiddleware("admin"), usersRoutes);
app.use("/doors", authMiddleware, roleMiddleware("admin"), doorsRoutes);
app.use("/permissions", authMiddleware, roleMiddleware("admin"), permissionRoutes);
app.use("/access", authMiddleware, accessRoutes);

export default app;