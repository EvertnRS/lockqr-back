import express from "express";
import cors from "cors";

import usersRoutes from "./presentation/routes/users.routes";
import doorsRoutes from "./presentation/routes/doors.routes";
import permissionRoutes from "./presentation/routes/permission.routes";
import accessRoutes from "./presentation/routes/access.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/doors", doorsRoutes);
app.use("/permissions", permissionRoutes);
app.use("/access", accessRoutes);

export default app;