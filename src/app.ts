import express from "express";
import cors from "cors";

import usersRoutes from "./presentation/routes/users.routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);

export default app;