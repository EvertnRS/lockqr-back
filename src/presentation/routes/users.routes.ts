import { Router } from "express";
import { UsersController } from "../controllers/UserController";

const router = Router();
const usersController = new UsersController();

router.post("/", (req, res) => usersController.create(req, res));
router.get("/", (req, res) => usersController.list(req, res));
router.get("/:id", (req, res) => usersController.findById(req, res));
router.put("/:id", (req, res) => usersController.update(req, res));
router.delete("/:id", (req, res) => usersController.delete(req, res));

export default router;