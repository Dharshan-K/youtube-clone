FROM ubuntu:latest

ENV TZ=UTC

RUN apt-get update

RUN apt-get install -y nginx
    
RUN apt-get install libnginx-mod-rtmp

COPY nginx-rtmp.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 1935

CMD ["nginx", "-g", "daemon off;"]

