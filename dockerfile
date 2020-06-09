FROM node:latest

EXPOSE 3000

WORKDIR /project/blog-service

COPY . .

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]