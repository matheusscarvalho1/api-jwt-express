
# Projeto APIs Protegidas com JWT

Este é um projeto de API RESTful construída com **Node.js**, **Express** e **TypeScript**, utilizando autenticação com **JWT**. O objetivo é fornecer uma base segura para desenvolvimento de aplicações com rotas protegidas e gerenciamento de usuários.

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express** – Backend leve e performático  
- **TypeScript** – Tipagem estática e maior segurança  
- **Prisma ORM** – Abstração moderna para banco de dados  
- **JWT (jsonwebtoken)** – Autenticação segura com tokens  
- **BcryptJS** – Criptografia de senhas  
- **Zod** – Validação de dados  
- **dotenv** – Gerenciamento de variáveis de ambiente  
- **ESLint + Prettier** – Padronização e qualidade de código  

## 📦 Instalação

Clone o projeto e instale as dependências:

```bash
git clone https://github.com/seu-usuario/projeto-apis-protegidas-com-jwt.git
cd projeto-apis-protegidas-com-jwt
npm install
````

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
```

Gere o cliente do Prisma:

```bash
npx prisma generate
```

Aplique as migrações:

```bash
npx prisma migrate dev --name init
```

## 🧪 Execução

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Para rodar em produção:

```bash
npm run build
npm start
```

## 🔐 Autenticação com JWT

Após o login, a API retorna um token JWT. Para acessar rotas protegidas, inclua o token no cabeçalho da requisição:

```
Authorization: Bearer seu_token_jwt
```

## 📁 Estrutura do Projeto

```
src/
├── controllers/     # Lógica das rotas
├── middlewares/     # Autenticação e validações
├── routes/          # Definição das rotas
├── schemas/         # Validação com Zod
├── services/        # Regras de negócio
├── index.ts         # Entrada da aplicação
prisma/
└── schema.prisma    # Modelo do banco de dados
```

## ✅ Funcionalidades

* Cadastro de usuários com senha criptografada
* Login com geração de token JWT
* Middleware de autenticação
* Validação de dados com Zod
* Integração com banco de dados via Prisma

## 📜 Scripts

```bash
npm run dev        # Inicia o servidor em modo dev
npm run build      # Compila o projeto TypeScript
npm start          # Executa o projeto em produção
```

