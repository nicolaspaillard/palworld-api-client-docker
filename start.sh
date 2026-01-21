#!/bin/sh
PORT="${PORT:-8080}" \
API_HOST="${API_HOST:-palworld}" \
API_PORT="${API_PORT:-8212}" \
envsubst '${PORT} ${API_HOST} ${API_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
API_PASSWORD="${API_PASSWORD:-palworld}" \
envsubst '${API_PASSWORD}' < /usr/share/nginx/html/settings.json.template > /usr/share/nginx/html/settings.json
exec nginx -g 'daemon off;'