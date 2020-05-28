FROM node:latest

WORKDIR /projects/nest-blog-service

COPY . .

RUN npm install cnpm -g --registry=https://r.npm.taobao.org

RUN cnpm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]