import { Router } from "express";
import { DoorsController } from "../controllers/DoorController";

const router = Router();
const doorsController = new DoorsController();

router.post("/", (req, res) => doorsController.create(req, res));
router.get("/", (req, res) => doorsController.list(req, res));
router.get("/:id", (req, res) => doorsController.findById(req, res));
router.put("/:id", (req, res) => doorsController.update(req, res));
router.delete("/:id", (req, res) => doorsController.delete(req, res));

export default router;