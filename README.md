# 📦 Meu Inventário

Sistema web completo para gerenciamento de itens domésticos. Permite cadastrar, listar, editar, deletar itens, com autenticação de usuários e layout responsivo.

🔗 **Deploy:** [inventario-frontend.vercel.app](https://inventario-frontend.vercel.app)

---

## ✨ Funcionalidades

- ✅ **Autenticação:** Login, cadastro e logout com JWT
- ✅ **CRUD completo:** Criar, ler, editar e deletar itens
- ✅ **Filtros:** Por categoria e localização
- ✅ **Detalhes do item:** Página com informações completas
- ✅ **Itens recentes:** Lista dos últimos itens adicionados
- ✅ **Feedback visual:** Toast de sucesso/erro
- ✅ **Responsivo:** Funciona em mobile, tablet e desktop

---

## 🛠️ Tecnologias

| Frontend | Estado | Estilização | Roteamento | Outros |
|----------|--------|-------------|------------|--------|
| React 18 | Zustand | Tailwind CSS | React Router DOM | Axios |
| TypeScript | react-hook-form | Lucide React | | Vite |

---

## 🚀 Como rodar o projeto localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos

```bash
# Clone o repositório
git clone https://github.com/TaalesPorjanDev/inventario-frontend.git

# Acesse a pasta do projeto
cd inventario-frontend

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Crie um arquivo .env na raiz com:
VITE_API_URL=https://inventario-backend-mw06.onrender.com/api/v1

# Rode o projeto
npm run dev


📁 Estrutura do projeto

src/
├── components/     # Componentes reutilizáveis (ItemCard, Menu, Toast, etc.)
├── pages/          # Páginas da aplicação (Home, Login, Register, etc.)
├── store/          # Zustand stores (itens, toast)
├── services/       # Configuração do axios (API)
├── types/          # Interfaces TypeScript
├── hooks/          # Hooks customizados (useLogin)
├── utils/          # Funções utilitárias (validação de token)
└── assets/         # Imagens e logos
🔗 Links
Frontend: https://inventario-frontend.vercel.app

Backend API: https://inventario-backend-mw06.onrender.com/api/v1

Swagger: https://inventario-backend-mw06.onrender.com/docs

👨‍💻 Autor
Tales Porjan

GitHub: @TaalesPorjanDev

LinkedIn: Tales Porjan

🙏 Agradecimentos
Sandro Moraes – Backend e integração da API

📄 Licença
Este projeto está sob a licença MIT.



---

## SCREENSHOT DO PROJETO

<img width="1361" height="612" alt="image" src="https://github.com/user-attachments/assets/b0e18f53-988e-467e-866b-2f72788f30eb" />
<img width="1341" height="607" alt="image" src="https://github.com/user-attachments/assets/6847d6dc-e68f-4946-b380-4640911e0a70" />
<img width="1919" height="843" alt="image" src="https://github.com/user-attachments/assets/52c72bf9-f921-4006-9923-65f2b1ed4310" />
<img width="1907" height="926" alt="image" src="https://github.com/user-attachments/assets/efb8a445-5818-4c53-867f-1a3b96637cf0" />









