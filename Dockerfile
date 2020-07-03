FROM galleri/webapp-deps

COPY ./angular.json ./angular.json
COPY ./browserslist ./browserslist
COPY ./src ./src
COPY ./tsconfig.app.json ./tsconfig.app.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tslint.json ./tslint.json

ARG CONFIGURATION="staging"
ENV CONFIGURATION=${CONFIGURATION}
RUN npx ng build --configuration ${CONFIGURATION}

FROM nginx:1.17-alpine
WORKDIR /app
COPY --from=0 /app/dist/webapp ./dist
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'
