#!/bin/sh

dev_dir=$(dirname "$(readlink -f "$0")")
base_dir=${dev_dir}/..

DATE_TAG=$(date -u +%Y-%m-%d-%H%M)
GIT_TAG=$(git rev-parse --short --verify HEAD)
TAG=prod-${DATE_TAG}--${GIT_TAG}

docker build -t galleri/webapp:${TAG} \
       --build-arg CONFIGURATION=production \
       ${base_dir}
