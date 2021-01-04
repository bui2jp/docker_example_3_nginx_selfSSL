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