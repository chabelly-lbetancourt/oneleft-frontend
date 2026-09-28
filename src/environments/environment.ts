/**
 * Configuración del entorno de desarrollo local (Docker Compose de oneleft-infra).
 * Para producción y Android se sustituye con fileReplacements en angular.json.
 */
export const environment = {
  apiUrl: 'http://localhost:8080',
  auth: {
    authority: 'http://localhost:8180/realms/oneleft',
    clientId: 'oneleft-web',
  },
};
