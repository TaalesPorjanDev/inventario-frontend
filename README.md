# 📦 Meu Inventário

Aplicação web para gerenciamento de itens domésticos. Permite cadastrar, listar, editar e remover itens, com autenticação de usuários e layout responsivo.

🔗 **Deploy:** [inventario-frontend.vercel.app](https://inventario-frontend.vercel.app)

---

## ✨ Funcionalidades

- ✅ **Autenticação:** Login e logout por API
- ✅ **CRUD completo:** Criar, ler, editar e deletar itens
- ✅ **Filtros:** Por categoria e localização
- ✅ **Detalhes do item:** Página com informações completas
- ✅ **Itens recentes:** Lista dos últimos itens adicionados
- ✅ **Feedback visual:** Toast de sucesso/erro
- ✅ **Responsivo:** Funciona em mobile, tablet e desktop

---

## 🛠️ Tecnologias

| Interface | Estado | Comunicação | Estilização |
|-----------|--------|-------------|-------------|
| React 19 + TypeScript | Zustand | Axios | Tailwind CSS |
| Vite | react-hook-form | React Router | Zod |

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm

### 1. Frontend

```bash
# Instale as dependências
npm install

# Configure a URL da API externa (copie o exemplo)
cp .env.example .env

# Rode o frontend
npm run dev
```

O frontend sobe em `http://localhost:5173`.

O cadastro de contas está desativado. A tela de login é destinada a usuários existentes.

## 📁 Estrutura do projeto

```
src/
├── components/      # Componentes de interface
├── hooks/           # Hooks de autenticação
├── pages/           # Páginas da aplicação
├── services/        # Cliente da API
├── store/           # Estado global
└── types/           # Tipos compartilhados
```

## 🔗 Links

Frontend (deploy): https://inventario-frontend.vercel.app



---

## SCREENSHOT DO PROJETO

<img width="1361" height="612" alt="image" src="https://github.com/user-attachments/assets/b0e18f53-988e-467e-866b-2f72788f30eb" />
<img width="1341" height="607" alt="image" src="https://github.com/user-attachments/assets/6847d6dc-e68f-4946-b380-4640911e0a70" />
<img width="1919" height="843" alt="image" src="https://github.com/user-attachments/assets/52c72bf9-f921-4006-9923-65f2b1ed4310" />
<img width="1907" height="926" alt="image" src="https://github.com/user-attachments/assets/efb8a445-5818-4c53-867f-1a3b96637cf0" />









