# build da aplicação
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --configuration production

# Servir aplicação com Nginx
FROM nginx:stable-alpine

COPY --from=build /app/dist/agendinha /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]