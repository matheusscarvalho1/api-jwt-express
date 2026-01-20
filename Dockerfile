# --- ESTÁGIO 1: BUILD (Onde o "bolo" é preparado) ---
# Usamos AS builder para dar um nome a este estágio e descartá-lo depois (economiza espaço)
FROM node:24-slim AS builder

# O pnpm não vem no Node por padrão, então precisamos instalá-lo
RUN npm install -g pnpm

# Define a pasta de trabalho. A partir daqui, tudo acontece em /app dentro do container
WORKDIR /app

# Copiamos apenas os arquivos de dependências primeiro.
# Por que? Para o Docker usar o CACHE. Se você não mudar o package.json, 
# o Docker pula o 'pnpm install' na próxima vez que você buildar.
COPY pnpm-lock.yaml package.json ./
COPY prisma ./prisma/

# Instala as dependências exatamente como estão no lock (frozen-lockfile)
RUN pnpm install --frozen-lockfile
# Gera o código do Prisma Client (necessário para o TypeScript entender o banco)
RUN pnpm prisma generate

# Agora sim, copiamos o restante de todo o código fonte
COPY . .
# Transpila o TypeScript para JavaScript (cria a pasta /dist)
RUN pnpm build

# --- ESTÁGIO 2: RUNNER (Onde o "bolo" é servido) ---
# Começa uma imagem nova, do zero, para não levar o lixo do build (como o código TS)
FROM node:24-slim AS runner

WORKDIR /app
# Precisamos do pnpm aqui também para rodar o script de start
RUN npm install -g pnpm

# MÁGICA: Em vez de instalar tudo de novo, copiamos apenas o que é essencial do 'builder'
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Variáveis de ambiente para dizer ao Node que estamos em produção
ENV NODE_ENV=production
ENV PORT=8080

# Avisa ao Docker que este container vai ouvir na porta 8080
EXPOSE 8080

# O comando que mantém o container vivo
CMD ["pnpm", "start"]