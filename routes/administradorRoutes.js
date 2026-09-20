import express from "express";
import login from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createAdministrador, deleteAdministrador, showAdministrador, updateAdministrador } from "../controllers/administradorController.js";

const router = express.Router();

router.post("/login", login);
router.post("/administrador", createAdministrador);

router.get("/administrador", authMiddleware, showAdministrador);
router.delete("/administrador", authMiddleware, deleteAdministrador);
router.put("/administrador", authMiddleware, updateAdministrador);

export default router;