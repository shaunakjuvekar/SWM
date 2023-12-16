# Stage 1: Build the React Application
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Setup the Nginx Server to serve the React Application
FROM nginx:1.25.3-alpine as production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node:18-alpine as frontend

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

# RUN npm install --force

# COPY . .

# EXPOSE 5175

# CMD ["npm", "run", "dev"]




