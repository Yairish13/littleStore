FROM node:16-alpine AS builder

WORKDIR /client

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /client/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
