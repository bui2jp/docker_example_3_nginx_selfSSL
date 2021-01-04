# Docker Nginx WEBAPI(node)

docker,docker-composeを使って簡単なWEB環境を作成
Nginxでssl offloadingをおこなう（自己証明書）

```
% docker -v 
Docker version 19.03.5, build 633a0ea
```

## 構成 frontend + backend
```
nginx_web(frontend+proxy): vue-sb-admin2 SPA web画面, ssl offloading
backend: api-server　RESTAPI Server(Node v10 + express)
```

## Run & Stop

起動
```
% docker-compose up
```

確認 (Chromeでアクセス)
```
http://localhost:80
https://localhost:443　(MacのChromeでは自己証明書は許可されない)
```

削除
```
% docker-compose down
```
