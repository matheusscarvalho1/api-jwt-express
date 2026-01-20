
# Projeto APIs Protegidas com JWT

Este é um projeto de API RESTful construída com **Node.js**, **Express** e **TypeScript**, utilizando autenticação com **JWT**. O objetivo é fornecer uma base segura para desenvolvimento de aplicações com rotas protegidas e gerenciamento de usuários.

- **Documentação Oficial:** [Acesse aqui](https://api-jwt-express.onrender.com/docs/)

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express 5.1** – Backend moderno e performático.
- **TypeScript 5.8** – Tipagem estática para maior segurança e produtividade.
- **Prisma ORM** – Gerenciamento de banco de dados moderno e eficiente.
- **PostgreSQL** – Banco de dados relacional robusto.
- **Docker** – Containerização do ambiente de banco de dados.
- **JWT (jsonwebtoken)** – Autenticação segura via tokens.
- **BcryptJS** – Criptografia de senhas (Hashing). 
- **Zod** – Validação de dados rigorosa com suporte a Regex.  
- **Swagger (OpenAPI 3.0)** – Documentação viva e funcional acessível via `/docs`.
- **pnpm** – Gerenciador de pacotes extremamente rápido.
- **tsup** – Build de produção extremamente rápido para ambientes modernos. 

## 🏛️ Arquitetura e Padrões

O projeto adota o padrão **Controller-Service-Repository**, garantindo a separação total de responsabilidades:

1.  **Controllers:** Gerenciam a entrada de requisições, validam schemas com **Zod** e definem a documentação OpenAPI/Swagger.
2.  **Services:** Camada de lógica de negócio, onde residem as regras da aplicação e validações de fluxo.
3.  **Repositories:** Camada isolada de persistência que utiliza o **Prisma Client** para comunicação com o banco de dados.


## 🐳 Docker Setup

O projeto está totalmente containerizado, permitindo subir a API e o Banco de Dados com um único comando (Banco de dados + Imagem da aplicação).

```bash
# Sobe a API e o PostgreSQL prontos para uso
docker compose up -d --build

# Ver logs da aplicação em tempo real
docker compose logs -f api

# Derrubar o ambiente e remover volumes
docker compose down -v
```

## 📦 Instalação e Setup

Utilize o [pnpm](https://pnpm.io) para gerenciar as dependências de forma eficiente:

```bash
git clone https://github.com/seu-usuario/projeto-apis-protegidas-com-jwt.git
cd projeto-apis-protegidas-com-jwt
pnpm install
````

## ⚙️ Configuração

1. Configure o arquivo .env na raiz do projeto (veja o .env.example)

```env
DATABASE_URL="postgresql://project-apis-express-jwt:secret@localhost:5432/app?schema=public"
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

O projeto possui documentação interativa. Ao rodar o servidor, você pode testar as rotas diretamente.


```bash
# Iniciar em modo desenvolvimento
pnpm run dev

# Acesse o Swagger UI em:
http://localhost:8080/docs
```

Para rodar em produção:

```bash
pnpm run build
pnpm start
```

## 🔐 Autenticação com JWT

Para rotas protegidas (Tag Protected no Swagger):
1. Faça login em /api/v1/auth/user.
2. Copie o accessToken.
3. No Swagger, clique em Authorize, cole o token e salve.
4. O cabeçalho será enviado automaticamente como: Authorization: Bearer <seu_token>

```
Authorization: Bearer seu_token_jwt
```

## 📁 Estrutura do Projeto

```
src/
├── @types/          # Tipagens customizadas (Ex: RequestJWT)
├── controllers/     # Orquestradores das rotas
├── middleware/      # Middlewares (Auth, Logger, Erros)
├── repository/      # Persistência de dados (Prisma)
├── routes/          # Definição das rotas e docs Swagger
├── services/        # Regras de negócio da aplicação
├── utils/           # Erros customizados e auxiliares
└── app.ts           # Configuração principal do servidor
```

## ✅ Funcionalidades

* **Arquitetura Escalável:** Implementação do padrão Controller-Service-Repository para melhor manutenção.
* **Cadastro de Usuários:** Segurança com criptografia de senhas via BcryptJS.
* **Autenticação JWT Completa:** Fluxo de Login com geração de Access Token e Refresh Token.
* **Segurança de Senhas:** Validação rigorosa via Zod (Maiúsculas, Minúsculas, Números e Caracteres Especiais).
* **Middleware de Proteção:** Proteção de rotas sensíveis com verificação de integridade do Token.
* **Validação de Dados:** Schemas do Zod para garantir que apenas dados limpos entrem no banco de dados.
* **Persistência Robusta:** Integração com banco de dados utilizando Prisma ORM.
* **Documentação Viva:** Interface Swagger (OpenAPI 3.0) para testes de endpoints em tempo real.
* **Logging Profissional:** Monitoramento de requisições e erros utilizando a biblioteca Pino.
* **CORS Habilitado:** Configuração pronta para integração segura com Front-end.

## 📜 Scripts

```bash
pnpm dev        # Inicia o servidor com ts-node-dev
pnpm build      # Compila o projeto com tsup (pasta dist)
pnpm start      # Executa o projeto compilado
pnpm deploy     # Instala, sincroniza banco e compila
```


## 👨‍💻 Desenvolvido por

**Matheus Carvalho**

- LinkedIn: [@matheusscarvalho](https://www.linkedin.com/in/matheusscarvalho/)
- GitHub: [@matheusscarvalho1](https://github.com/matheusscarvalho1)
