#!/bin/bash

FILE=${BASH_SOURCE[0]:-${(%):-%x}}
BIN_DIR="$( cd "$( dirname "${FILE}" )" >/dev/null 2>&1 && pwd )"
NGINX_DIR=${BIN_DIR}/../nginx

docker run \
       --rm \
       -it \
       --net=host \
       --name galleri_webapp_dev_nginx \
       -v ${NGINX_DIR}/dev.nginx.conf:/etc/nginx/nginx.conf:ro \
       nginx:1.17
