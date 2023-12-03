FROM node:18-alpine as frontend

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --force

COPY . .

EXPOSE 5175

CMD ["npm", "run", "dev"]




