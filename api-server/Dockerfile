# node v10
FROM node:10

WORKDIR /workspace/

#フォルダごとコピーする
Add ./ /workspace/

RUN npm install

EXPOSE 8081
CMD node server.js
