FROM  node 
ADD . /nest-blog/
EXPOSE 3000
WORKDIR /nest-blog
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN npm install --production
RUN npm run build
CMD [ "npm", "run", "start" ]
