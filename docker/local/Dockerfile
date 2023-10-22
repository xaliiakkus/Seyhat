FROM node:18.0.0

RUN apt-get update -y && apt-get install -y --yes --force-yes nano

WORKDIR /usr/src/app

COPY . ./
COPY ./docker/local/env/.env ./.env

RUN yarn install
RUN yarn build

EXPOSE 3000

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["yarn", "start"]
