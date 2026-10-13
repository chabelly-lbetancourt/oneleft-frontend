# syntax=docker/dockerfile:1
# Image of the OneLeft web app: the Angular build served by nginx without privileges (port 8080).
#   docker build --build-arg CONFIGURATION=pre --secret id=primeui,src=.env -t oneleft/web .
# CONFIGURATION is the Angular build configuration: development (local stack, API on localhost), pre or production
# (same origin as /api and /auth behind Caddy). The PrimeUI licence goes in as a BuildKit secret, so it is never stored
# in a layer of the image: a .env with PRIMEUI_LICENSE=… or a file with the bare key. Without it the app shows the
# PrimeNG licence notice.

FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY angular.json tsconfig.json tsconfig.app.json .postcssrc.json ./
COPY scripts scripts
COPY public public
COPY src src
ARG CONFIGURATION=pre
RUN --mount=type=secret,id=primeui,required=false \
    if [ -f /run/secrets/primeui ]; then \
      key=$(sed -n "s/^[[:space:]]*PRIMEUI_LICENSE[[:space:]]*=[[:space:]]*['\"]\{0,1\}\([^'\"]*\).*/\1/p" /run/secrets/primeui); \
      [ -n "$key" ] || key=$(tr -d '[:space:]' < /run/secrets/primeui); \
      export PRIMEUI_LICENSE="$key"; \
    fi; \
    npm run build -- --configuration "$CONFIGURATION"

FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/oneleft/browser /usr/share/nginx/html
EXPOSE 8080
