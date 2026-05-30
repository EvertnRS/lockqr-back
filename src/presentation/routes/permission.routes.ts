import { Router } from "express";
import { PermissionsController } from "../controllers/PermissionController";

const router = Router();
const permissionsController = new PermissionsController();

router.post(
  "/doors/:doorId/users/:userId",
  (req, res) => permissionsController.allowUser(req, res)
);

router.delete(
  "/doors/:doorId/users/:userId",
  (req, res) => permissionsController.removeUser(req, res)
);

router.get(
  "/doors/:doorId/users",
  (req, res) => permissionsController.listUsersByDoor(req, res)
);

export default router;