import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USERS_FILE = path.join(__dirname, "../../data/users.json");

function ensureUsersFile() {
  const dir = path.dirname(USERS_FILE);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]", "utf-8");
  }
}

function readUsers() {
  ensureUsersFile();
  const content = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(content);
}

function writeUsers(users) {
  ensureUsersFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export function findUserByEmail(email) {
  const users = readUsers();
  return users.find((user) => user.email === email.toLowerCase());
}

export function createUser({ fullName, email, passwordHash }) {
  const users = readUsers();
  const normalizedEmail = email.toLowerCase();

  if (users.some((user) => user.email === normalizedEmail)) {
    return null;
  }

  const newUser = {
    id: crypto.randomUUID(),
    fullName,
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return newUser;
}

export function findUserById(id) {
  const users = readUsers();
  return users.find((user) => user.id === id);
}
