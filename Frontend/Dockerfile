# Stage 1: Build the app
FROM node:18 as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build  # this must generate the /app/build or /app/dist folder

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Make sure the folder name matches what was built in stage 1
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
