FROM node:12.18.4-alpine

WORKDIR /var/app/royhome-net
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY . .

RUN mkdir -p /var/log/royhome-net
RUN chmod 777 /var/log/royhome-net

ARG APP
ENV APP $APP
ARG RELEASE
ENV RELEASE $RELEASE
CMD yarn run docker:$RELEASE:$APP
