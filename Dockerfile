FROM node

WORKDIR /suibian

COPY ./package.json .
COPY ./tsconfig.shared.json .
COPY ./packages ./packages

RUN yarn install

ENV NODE_ENV production

RUN yarn build:app

EXPOSE 4000

CMD ["yarn", "server-start"]