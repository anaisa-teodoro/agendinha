# Build da aplicação
FROM node:20-alpine as build

WORKDIR /app

# Copiar os arquivos necessários para o build
COPY package*.json ./
RUN npm install

COPY . .

# Gerar o build de produção
RUN npm run build -- --configuration=production

# Servir a aplicação com Nginx
FROM nginx:stable-alpine

# Copiar os arquivos do build para o Nginx
COPY --from=build /app/dist/agenda-eletronica /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]