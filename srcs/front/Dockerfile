FROM debian:oldstable

RUN apt-get update && apt-get install nodejs npm nginx -y
	&& rm -rf /var/lib/apt/lists/* && mkdir -p /app

WORKDIR /app

COPY tools/package*.json

RUN npm install --omit=dev

COPY tools/* .

RUN npm run build

RUN rm -rf /var/www/html/* && cp -r dist/* /var/www/html/

CMD ["nginx", "-g", "daemon off;"]