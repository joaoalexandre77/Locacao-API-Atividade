import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createLocacao, showLocacao, deleteLocacao, updateLocacao, showAllLocacao } from "../controllers/locacaoController.js";

const router = express.Router();

router.get("/locacao/:id", authMiddleware, showLocacao);
router.post("/locacao", authMiddleware, createLocacao);
router.delete("/locacao/:id", authMiddleware, deleteLocacao);
router.put("/locacao/:id", authMiddleware, updateLocacao);

router.get("/allLocacao", authMiddleware, showAllLocacao);

export default router;