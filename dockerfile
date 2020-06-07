FROM node:latest

WORKDIR /projects/nest-blog-service

COPY . .

# RUN npm install cnpm -g --registry=https://r.npm.taobao.org

# RUN cnpm install

RUN npm config set registry https://registry.npm.taobao.org

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:prod" ]