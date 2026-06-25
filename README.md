# 📦 Meu Inventário

Sistema web completo para gerenciamento de itens domésticos. Permite cadastrar, listar, editar, deletar itens, com autenticação de usuários e layout responsivo.

🔗 **Deploy:** [inventario-frontend.vercel.app](https://inventario-frontend.vercel.app)

---

## ✨ Funcionalidades

- ✅ **Autenticação:** Login, cadastro e logout com cookie httpOnly (JWT)
- ✅ **CRUD completo:** Criar, ler, editar e deletar itens
- ✅ **Filtros:** Por categoria e localização
- ✅ **Detalhes do item:** Página com informações completas
- ✅ **Itens recentes:** Lista dos últimos itens adicionados
- ✅ **Feedback visual:** Toast de sucesso/erro
- ✅ **Responsivo:** Funciona em mobile, tablet e desktop

---

## 🛠️ Tecnologias

| Frontend | Backend | Estado | Estilização |
|----------|---------|--------|-------------|
| React 19 + TypeScript | Node + Express | Zustand | Tailwind CSS |
| Vite | JWT + cookies | react-hook-form | React Router |

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm

### 1. Frontend

```bash
# Instale as dependências
npm install

# Configure a URL da API (copie o exemplo)
cp .env.example .env

# Rode o frontend
npm run dev
```

O frontend sobe em `http://localhost:5173`.

### 2. Backend (autenticação)

Em outro terminal:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

O backend sobe em `http://localhost:3000` com a API em `/api/v1`.

## 📁 Estrutura do projeto

```
src/                 # Frontend React
backend/             # API Node + Express (auth)
├── src/
│   ├── routes/      # Rotas de autenticação
│   ├── middleware/  # Verificação de JWT
│   └── utils/       # Persistência simples em JSON
└── data/            # Usuários cadastrados (local)
```

## 🔗 Links

Frontend (deploy): https://inventario-frontend.vercel.app



---

## SCREENSHOT DO PROJETO

<img width="1361" height="612" alt="image" src="https://github.com/user-attachments/assets/b0e18f53-988e-467e-866b-2f72788f30eb" />
<img width="1341" height="607" alt="image" src="https://github.com/user-attachments/assets/6847d6dc-e68f-4946-b380-4640911e0a70" />
<img width="1919" height="843" alt="image" src="https://github.com/user-attachments/assets/52c72bf9-f921-4006-9923-65f2b1ed4310" />
<img width="1907" height="926" alt="image" src="https://github.com/user-attachments/assets/efb8a445-5818-4c53-867f-1a3b96637cf0" />









