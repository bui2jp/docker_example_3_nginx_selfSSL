# OpenSSL(LibreSSL)を使って自己証明書の作成
注意: macOS Catalina (10.15.7)で作業しています。  

OpenSSLのバージョン確認
```
% openssl version 
LibreSSL 2.8.3
```

|  役割  |  作業Directory  |
| ---- | ---- |
|  認証局CA  |  myCA  |
|  サーバー証明書  |  myServerCert  |
|  クライアント証明書  |  myClietCert  |

それぞれの作業用のDirectory  

# 1. 認証局(demoCA)の作成

認証局の秘密鍵 / CSR / ルート証明書の３つを作成します。

## [CA] OpenSSLの設定
```
CA作成用の設定フィアル
% cp /System/Library/OpenSSL/misc/CA.sh ./
% cp /System/Library/OpenSSL/openssl.cnf ./openssl_ca.cnf
[ usr_cert ]
 basicConstraints=CA:TRUE に変更

(option)
[CA_default]セクションのmdをsha256にする
default_md	= sha256
[req]セクションのdefault_bitsを2048にする。
default_bits		= 2048

% export OPENSSL_CONF=$PWD/openssl_ca.cnf
```

## [CA] 認証局の作成
opensslのシェル(CA.sh)を使ってする
```
% ./CA.sh -newca
```
commonNameは必須

## 認証局の秘密鍵 / CSR / ルート証明書の作成 の３つができました。
```
$ ls -tlr demoCA/
total 40
-rw-r--r--  1 takuya  staff     0  6 16 15:09 index.txt.old
drwxr-xr-x  2 takuya  staff    68  6 16 15:09 crl
drwxr-xr-x  2 takuya  staff    68  6 16 15:09 certs
drwxr-xr-x  3 takuya  staff   102  6 16 15:09 private
-rw-r--r--  1 takuya  staff   643  6 16 15:10 careq.pem <== 認証局の証明書署名要求
-rw-r--r--  1 takuya  staff    17  6 16 15:10 serial
drwxr-xr-x  3 takuya  staff   102  6 16 15:10 newcerts
-rw-r--r--  1 takuya  staff    21  6 16 15:10 index.txt.attr
-rw-r--r--  1 takuya  staff    86  6 16 15:10 index.txt
-rw-r--r--  1 takuya  staff  3166  6 16 15:10 cacert.pem <== 認証局の証明書（＝ルート証明書）
```

```
$ ls -tlr demoCA/private/
total 8
-rw-r--r--  1 takuya  staff  1054  6 16 15:10 cakey.pem  <== 認証局の秘密鍵
```


## [CA] サーバー/クライアント証明書への署名用
```
% cp /System/Library/OpenSSL/openssl.cnf ./openssl.cnf
```

# 2. サーバー証明書の作成

## [Server] OpenSSLの設定
```
% cd
nginx_web/self-ssl-cert/myServerCert
% cp /System/Library/OpenSSL/openssl.cnf ./openssl_server.cnf
(確認)
[ usr_cert ]
basicConstraints = CA:FALSE
nsCertType =  server

(option)
[CA_default]セクションのmdをsha256にする
default_md	= sha256
[req]セクションのdefault_bitsを2048にする。
default_bits		= 2048
```

```
% export OPENSSL_CONF=$PWD/openssl_server.cnf
```

## [Server] 秘密鍵と証明書署名要求を作成
秘密鍵(Key)  
証明書署名要求(CSR:Certificate Signing Request)
```
% openssl req -new -keyout newkey2048_sha256.pem -out newreq2048_sha256.csr
```
## [Server] 秘密鍵からパスコードを除く
Webサーバー(nginx)に設定するのはこのパスコードを除いた秘密鍵
```
% openssl rsa -in newkey2048_sha256.pem -out newkey2048_sha256_wo_pass.pem
```

## [CA] サーバー証明書を作成
認証局側でサーバー証明書署名要求(CSR)に対し署名してサーバー証明書を作成
```
% cd ../myCA
% export OPENSSL_CONF=$PWD/openssl.cnf
% pwd 
/Users/takuya/vue-bootstrap/docker_example_2_nginx_node/nginx_web/self-ssl-cert/myCA
```

```
% openssl ca -policy policy_anything -out ../myServerCert/newcert2048_sha256.crt -days 365 -infiles ../myServerCert/newreq2048_sha256.csr
```

# 3.クライアント証明書の作成

## [Client] OpenSSLの設定
```
% mkdir myClientCert
% pwd 
/Users/takuya/vue-bootstrap/docker_example_2_nginx_node/nginx_web/self-ssl-cert/myClientCert
```

```
% cp /System/Library/OpenSSL/openssl.cnf ./openssl_client.cnf
(確認)
basicConstraints = CA:FALSE
nsCertType =  client, email, objsign

(option)
[CA_default]セクションのmdをsha256にする
default_md	= sha256
[req]セクションのdefault_bitsを2048にする。
default_bits		= 2048
```

```
export OPENSSL_CONF=$PWD/openssl_client.cnf
```
## [Client] 秘密鍵とCSR (クライアント用)を作成
```
$ openssl req -new -keyout cli.newkey2048_sha256.pem -out cli.newreq2048_sha256.csr
```

## [CA] クライアント証明書を作成
クライアント証明書署名要求CSRに対し署名を行い、クライアント証明書を作成
```
% cd ../myCA
export OPENSSL_CONF=$PWD/openssl.cnf
```

```
openssl ca -policy policy_anything -out ../myClientCert/cli.newcert2048_sha256.crt -days 365 -infiles ../myClientCert/cli.newreq2048_sha256.csr
```

## [Client] PKCS#12 作成
クライアント証明書とクライアント秘密鍵を格納したPKCS#12形式のファイルを作成  
※ クライアントに設定する (Macの場合はキーチェーンアクセス)  
※ -nameオプションで指定しているのはフレンドリー名
```
$ cd myClientCert
$ openssl pkcs12 -export -in cli.newcert2048_sha256.crt -inkey cli.newkey2048_sha256.pem -out cli.2048_sha256.pfx -name "test-client.com"
```
# 4. Docker,Nginxの設定(例)

## Dockerfile

```
% cat Dockerfile
FROM nginx:1.18

#静的コンテンツ
COPY dist /usr/share/nginx/html

#カスタマイズしたdefault.conf
ADD default.conf /etc/nginx/conf.d/default.conf

#ssl for server certification
ADD self-ssl-cert/myServerCert/newcert2048_sha256.crt /etc/nginx/ssl/server.crt
ADD self-ssl-cert/myServerCert/newkey2048_sha256_wo_pass.pem /etc/nginx/ssl/server.key

#ssl for client certification
ADD self-ssl-cert/myCA/demoCA/cacert.pem /etc/nginx/ssl/ca.crt

#If you add a custom CMD in the Dockerfile, 
#be sure to include -g daemon off; in the CMD in order for nginx 
#to stay in the foreground, so that Docker can track the process properly 
#(otherwise your container will stop immediately after starting)!
CMD nginx -g "daemon off;"
```

## Nginx default.conf
```
% cat default.conf 

server {
    listen 8081;
    listen 443 ssl;

    server_name  localhost;
    
    # Servar 証明書
    ssl_certificate     /etc/nginx/ssl/server.crt;
    ssl_certificate_key /etc/nginx/ssl/server.key;

    # Client 証明書
    ssl_client_certificate  /etc/nginx/ssl/ca.crt;
    ssl_verify_client on;

:
:

```
