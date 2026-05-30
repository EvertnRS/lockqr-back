import { Router } from "express";
import { AccessController } from "../controllers/AccessController";

const router = Router();
const accessController = new AccessController();

router.post("/validate", (req, res) => accessController.validate(req, res));

export default router;