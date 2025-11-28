FROM debian:bookworm

RUN apt-get update && apt-get install -y nginx openssl curl

COPY tools/nginx-gateway.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]