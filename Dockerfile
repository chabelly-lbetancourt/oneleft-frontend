# Image of the OneLeft web app: nginx without privileges serving the Angular build.
# The build is done before (npm run build, which needs the PrimeUI licence), as the backend images copy their jar:
#   npm run build -- --configuration pre && docker build -t oneleft/web:dev .
FROM nginxinc/nginx-unprivileged:1.29-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/oneleft/browser /usr/share/nginx/html
EXPOSE 8080
