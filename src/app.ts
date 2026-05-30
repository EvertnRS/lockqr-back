import express from "express";
import cors from "cors";

import usersRoutes from "./presentation/routes/users.routes";
import doorsRoutes from "./presentation/routes/doors.routes";
import permissionRoutes from "./presentation/routes/permission.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/doors", doorsRoutes);
app.use("/permissions", permissionRoutes);

export default app;