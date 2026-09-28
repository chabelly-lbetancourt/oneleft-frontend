/**
 * Local development configuration (oneleft-infra Docker Compose).
 * The pre (staging) build replaces it with environment.pre.ts (fileReplacements in angular.json).
 */
export const environment = {
  name: 'dev',
  apiUrl: 'http://localhost:8080',
  auth: {
    authority: 'http://localhost:8180/realms/oneleft',
    clientId: 'oneleft-web',
  },
};
