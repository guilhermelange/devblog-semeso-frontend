# Etapa 1: Construção da aplicação
FROM node:18-alpine AS builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de dependência e instale as dependências
COPY package*.json ./
RUN npm install

# Copie todo o código da aplicação para o contêiner
COPY . .

# Execute o build da aplicação
RUN npm run build

# Etapa 2: Configuração de produção
FROM node:18-alpine AS production

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Instale apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copie os arquivos de build e as dependências do builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Defina a variável de ambiente NODE_ENV como produção
ENV NODE_ENV=production

# Exponha a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar a aplicação em modo de produção
CMD ["npm", "start"]
