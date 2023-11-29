FROM node:14-alpine AS build
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY . .
RUN npm install
RUN npm run build
# For Prodution
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default/conf
EXPOSE 80
EXPOSE 3001
CMD ["nginx" , "-g" , "daemon off;"]