FROM node:19-alpine3.16
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
WORKDIR /app/react

EXPOSE 5173
CMD ["npm", "run", "dev"]