import { Router } from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createItem,
  deleteItem,
  findItemById,
  getItemsByUserId,
  updateItem,
} from "../utils/itemStore.js";

const router = Router();

function sanitizeItem(item) {
  const { userId, ...rest } = item;
  return rest;
}

router.use(authMiddleware);

router.get("/", (req, res) => {
  const items = getItemsByUserId(req.user.userId).map(sanitizeItem);
  return res.json({ items });
});

router.get("/:id", (req, res) => {
  const item = findItemById(req.user.userId, req.params.id);

  if (!item) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  return res.json({ item: sanitizeItem(item) });
});

router.post("/", (req, res) => {
  const { nome, categoria, local, observacao, imageUrl } = req.body;

  if (!nome || !categoria || !local) {
    return res.status(400).json({ message: "Preencha nome, categoria e local" });
  }

  const item = createItem(req.user.userId, {
    nome,
    categoria,
    local,
    observacao,
    imageUrl,
  });

  return res.status(201).json({ item: sanitizeItem(item) });
});

router.put("/:id", (req, res) => {
  const { nome, categoria, local, observacao, imageUrl } = req.body;

  if (!nome || !categoria || !local) {
    return res.status(400).json({ message: "Preencha nome, categoria e local" });
  }

  const item = updateItem(req.user.userId, req.params.id, {
    nome,
    categoria,
    local,
    observacao,
    imageUrl,
  });

  if (!item) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  return res.json({ item: sanitizeItem(item) });
});

router.delete("/:id", (req, res) => {
  const deleted = deleteItem(req.user.userId, req.params.id);

  if (!deleted) {
    return res.status(404).json({ message: "Item não encontrado" });
  }

  return res.json({ message: "Item removido com sucesso" });
});

export default router;
