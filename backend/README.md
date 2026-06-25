# Backend — Meu Inventário

Backend simples em Node.js + Express para autenticação (cadastro, login, logout e verificação de sessão).

## Como funciona

O frontend envia requisições para `/api/v1/auth/*`. O login grava um **JWT em cookie httpOnly**; as próximas requisições usam esse cookie automaticamente (`withCredentials: true` no axios).

Usuários ficam salvos em `data/users.json` (apenas para estudo — em produção use um banco de dados).

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/v1/health` | Verifica se o servidor está no ar |
| POST | `/api/v1/auth/register` | Cadastra usuário |
| POST | `/api/v1/auth/login` | Faz login e define cookie |
| GET | `/api/v1/auth/me` | Retorna usuário logado |
| POST | `/api/v1/auth/logout` | Remove cookie de sessão |
| GET | `/api/v1/items` | Lista itens do usuário logado |
| POST | `/api/v1/items` | Cria um item |
| PUT | `/api/v1/items/:id` | Atualiza um item |
| DELETE | `/api/v1/items/:id` | Remove um item |

## Rodar localmente

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

O servidor sobe em `http://localhost:3000`.

No frontend (raiz do projeto), crie um `.env`:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Depois rode `npm run dev` na raiz e acesse `http://localhost:5173`.
