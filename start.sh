#!/bin/sh
envsubst '${PORT} ${API_HOST} ${API_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
envsubst '${API_PASSWORD}' < /usr/share/nginx/html/settings.json.template > /usr/share/nginx/html/settings.json
exec nginx -g 'daemon off;'