FROM node:alpine

WORKDIR /build

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

LABEL traefik.http.routers.top250.rule=Host(`top250.bunserver.xyz`)
LABEL traefik.http.routers.top250.tls=true
LABEL traefik.http.routers.top250.tls.certresolver=myresolver
LABEL traefik.http.services.top250.loadbalancer.server.port=9001

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY . ./
RUN yarn install
RUN yarn prisma generate
RUN yarn build
EXPOSE 4000

CMD [ "yarn", "start" ]

