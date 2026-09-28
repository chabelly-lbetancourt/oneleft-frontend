/**
 * Local development configuration (oneleft-infra Docker Compose).
 * Production and Android replace it with fileReplacements in angular.json.
 */
export const environment = {
  apiUrl: 'http://localhost:8080',
  auth: {
    authority: 'http://localhost:8180/realms/oneleft',
    clientId: 'oneleft-web',
  },
};
