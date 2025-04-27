FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm -g i pnpm

RUN pnpm i

COPY . .

CMD ["pnpm", "stard:dev"]