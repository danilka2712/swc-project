FROM node:18.14.0-alpine AS production
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
ENV NODE_PATH /app/node_modules
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]