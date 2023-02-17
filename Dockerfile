FROM nginx 
  
MAINTAINER zy
 
COPY dist/  /usr/share/nginx/html/

COPY default.conf  /etc/nginx/conf.d/default.conf   