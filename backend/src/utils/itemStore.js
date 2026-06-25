import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ITEMS_FILE = path.join(__dirname, "../../data/items.json");

function ensureItemsFile() {
  const dir = path.dirname(ITEMS_FILE);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(ITEMS_FILE)) {
    fs.writeFileSync(ITEMS_FILE, "[]", "utf-8");
  }
}

function readItems() {
  ensureItemsFile();
  const content = fs.readFileSync(ITEMS_FILE, "utf-8");
  return JSON.parse(content);
}

function writeItems(items) {
  ensureItemsFile();
  fs.writeFileSync(ITEMS_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export function getItemsByUserId(userId) {
  return readItems()
    .filter((item) => item.userId === userId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

export function findItemById(userId, id) {
  return readItems().find((item) => item.userId === userId && item.id === id);
}

export function createItem(userId, { nome, categoria, local, observacao, imageUrl }) {
  const items = readItems();
  const now = new Date().toISOString();

  const newItem = {
    id: crypto.randomUUID(),
    userId,
    nome,
    categoria,
    local,
    observacao: observacao || "",
    imageUrl: imageUrl || "",
    createdAt: now,
    updatedAt: now,
  };

  items.push(newItem);
  writeItems(items);

  return newItem;
}

export function updateItem(userId, id, { nome, categoria, local, observacao, imageUrl }) {
  const items = readItems();
  const index = items.findIndex((item) => item.userId === userId && item.id === id);

  if (index === -1) {
    return null;
  }

  const updatedItem = {
    ...items[index],
    nome,
    categoria,
    local,
    observacao: observacao ?? items[index].observacao,
    imageUrl: imageUrl ?? items[index].imageUrl,
    updatedAt: new Date().toISOString(),
  };

  items[index] = updatedItem;
  writeItems(items);

  return updatedItem;
}

export function deleteItem(userId, id) {
  const items = readItems();
  const itemExists = items.some((item) => item.userId === userId && item.id === id);

  if (!itemExists) {
    return false;
  }

  const filtered = items.filter((item) => !(item.userId === userId && item.id === id));
  writeItems(filtered);

  return true;
}
