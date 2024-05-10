FROM node:latest

WORKDIR /server

COPY package*.json ./

RUN apt-get update && \
    apt-get install -y build-essential python-is-python3 && \
    rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["npm", "run","dev"]