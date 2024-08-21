FROM node:18-alpine AS base

RUN npm install -g yarn

FROM base AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM base AS final

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE ${PORT}

CMD ["yarn", "start"]