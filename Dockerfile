FROM node

WORKDIR /suibian

COPY ./package.json .
COPY ./tsconfig.shared.json .
COPY ./packages ./packages

RUN yarn install

RUN yarn build:app

ENV NODE_ENV production

EXPOSE 4000

CMD ["yarn", "start"]