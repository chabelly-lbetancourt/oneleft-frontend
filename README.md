# OneLeft · Frontend y Android

[![lint](https://github.com/chabelly-lbetancourt/oneleft-frontend/actions/workflows/lint.yml/badge.svg?branch=dev)](https://github.com/chabelly-lbetancourt/oneleft-frontend/actions/workflows/lint.yml)

**OneLeft** conecta planes para las próximas horas que tienen plazas libres («falta uno») con personas cercanas que pueden unirse en tiempo real.

## Contenido

Aplicación web **Angular** con **PrimeNG** y **Tailwind CSS**, empaquetada como app nativa de **Android** con **Capacitor** a partir del mismo código.

**Stack:** Angular 22 (sin Zone.js, con signals) · PrimeNG 22 · Tailwind CSS 4 · Transloco (es/en) · angular-auth-oidc-client · Capacitor · Android · Vitest · Playwright · SonarQube

**IDE recomendado:** WebStorm (Android Studio para compilar la app de Android)

## Cómo ejecutarlo

Requisitos: Node 24 LTS (versión fijada en [`.nvmrc`](.nvmrc); con nvm basta `nvm use`).

```bash
npm install
npm start                      # http://localhost:4200
npm test -- --watch=false      # tests unitarios con Vitest
npm run build                  # build de producción en dist/oneleft
```

### Tests de extremo a extremo (Playwright)

Recorren la app completa (login, perfil, publicar, planes cercanos y unirse) en español y en inglés contra el
Docker Compose de `oneleft-infra`, clonado junto a este repositorio. Los usuarios de prueba salen del realm de
desarrollo. En la CI se ejecutan en cada PR hacia `pre` con las imágenes `:pre` de GHCR; si fallan, el artefacto
`e2e-report` guarda capturas, vídeos y trazas.

```bash
# Backend con la configuración de los tests (imágenes locales; sin variables, las :pre de GHCR)
ONELEFT_IMAGES=oneleft/ ONELEFT_IMAGE_TAG=dev docker compose -f ../oneleft-infra/docker/compose.yaml \
  -f e2e/compose.e2e.yaml --profile backend up -d --no-build --wait
npx playwright install chromium   # solo la primera vez
npm run e2e                       # usa ng serve si está en marcha; si no, sirve dist/ (ng build --configuration development)
```

## Organización

```
src/app/
├── core/
│   ├── api/        clientes de los servicios users y plans (a través del gateway)
│   ├── auth/       OpenID Connect con Keycloak (PKCE) y sesión como signals
│   ├── geo/        ubicación aproximada: se redondea antes de salir del dispositivo
│   ├── i18n/       idioma activo, cargador de traducciones, títulos y errores de la API traducidos
│   └── theme/      tema de PrimeNG con el naranja de marca
├── features/       una carpeta por funcionalidad: home, plans (publicar, detalle), profile
└── shared/         modelos, reglas de tiempo de los planes y componentes (selector de idioma)
public/i18n/        traducciones es.json y en.json
```

| Ruta | Pantalla | Sesión |
|---|---|---|
| `/` | Inicio: tus próximos planes y planes cerca | Opcional |
| `/profile` | Mi perfil (HU-002) | Obligatoria |
| `/plans/new` | Publicar un plan (HU-003) | Obligatoria |
| `/plans/:id` | Detalle de un plan | Obligatoria |

- **PrimeNG** aporta los componentes (botones, etiquetas, avatares, tablas, formularios) con un tema propio
  basado en Aura y el naranja de marca ([`core/theme/oneleft-preset.ts`](src/app/core/theme/oneleft-preset.ts)).
- **Tailwind CSS 4** se encarga del diseño y la maquetación *mobile-first*. El plugin `tailwindcss-primeui`
  expone los colores de PrimeNG como utilidades de Tailwind (`bg-primary`, `text-muted-color`...).
- PrimeNG va en su propia capa CSS (`primeng`) para que las utilidades de Tailwind puedan sobrescribirlo.

## Idiomas (HU-022)

- **Transloco** traduce en tiempo de ejecución: un único bundle para la web y Android, y se cambia de idioma sin
  recargar la página.
- Los textos están en `public/i18n/es.json` y `en.json` (mismas claves). Actividades, niveles y errores de la API se
  traducen a partir de sus códigos.
- **Idioma inicial:** el elegido antes (guardado en `localStorage`); si no, el del navegador o dispositivo; y si no,
  español. El login de Keycloak recibe `ui_locales` y sale en el mismo idioma.
- **El código va en inglés** (ver [CONTRIBUTING.md](CONTRIBUTING.md)); ningún texto visible se escribe en las
  plantillas.

## Entornos

| Rama | Entorno | Configuración de build | API y Keycloak |
|---|---|---|---|
| `dev` | dev (local) | `development` | `environment.ts`: `localhost:8080` y `localhost:8180` |
| `pre` | pre (*staging*) | `pre` | `environment.pre.ts`: mismo origen que la web (`/api`, `/auth`) |
| `main` | pro | `production` | `environment.pro.ts`: mismo origen que la web (`/api`, `/auth`) |

```bash
npx ng build --configuration pre                                        # web de pre
npx ng build --configuration pre --define "ONELEFT_ORIGIN='https://…'"  # app Android contra pre
```

## Imagen Docker

La web se publica como imagen, igual que los microservicios: **nginx sin privilegios** (puerto 8080) sirviendo la
build. En AWS Lightsail va detrás de Caddy, que da HTTPS y envía `/api` al gateway y `/auth` a Keycloak en el mismo
origen.

- **Rutas de la app:** cualquier ruta que no sea un fichero (`/plans/…`, `/profile`) abre la app.
- **Caché:** de un año para los ficheros con *hash*; sin caché para `index.html`, las traducciones y el
  *service worker* de los avisos, para que una versión nueva llegue a todos a la vez.
- **Cabeceras y salud:** cabeceras de seguridad y `/healthz` para las comprobaciones de salud.

La build se hace antes, porque necesita la licencia de PrimeUI y así la clave nunca entra en una capa de Docker:

```bash
npm run build -- --configuration pre
docker build -t oneleft/web:dev .
docker run --rm -p 8088:8080 oneleft/web:dev   # http://localhost:8088
```

La CI construye y prueba la imagen en cada ejecución, y publica `ghcr.io/chabelly-lbetancourt/oneleft-web` con
`:pre` desde `pre` y `:latest` desde `main` (además de `:sha-…`).

Si se ejecuta sola, sin Caddy delante, se ve la web, pero sin API ni inicio de sesión: en el mismo origen no hay
`/api` ni `/auth`.

## App Android

La app de Android es la misma compilación de Angular empaquetada con **Capacitor 8** (`android/`,
`es.upm.miw.oneleft`). Lo que cambia dentro de la app:

- **Login en el navegador del sistema** (Custom Tabs): Keycloak, Google y el registro no se abren en el WebView,
  porque Google no permite iniciar sesión en uno. Keycloak vuelve a la app por el *deep link* `oneleft://callback`.
- **Compartir** abre la hoja nativa de Android (`@capacitor/share`); el WebView no tiene Web Share API.
- La sesión se guarda en `localStorage` para que sobreviva al cerrar la app.

Requisitos: Android Studio (o el SDK de Android con `ANDROID_HOME`) y Java 21.

```bash
npm run android:local   # build de desarrollo, copia al proyecto Android y adb reverse de 8080 y 8180
npm run android:apk     # APK de depuración en android/app/build/outputs/apk/debug/
npm run android:open    # abre el proyecto en Android Studio
```

En el emulador o en un móvil conectado por USB, `adb reverse` hace que `localhost:8080` (API) y `localhost:8180`
(Keycloak) lleguen al Docker Compose del Mac. La CI genera el APK como artefacto en cada ejecución.

El icono y la pantalla de arranque se generan a partir de `assets/`, que a su vez dibuja
[`scripts/generate-app-assets.mjs`](scripts/generate-app-assets.mjs) con la identidad de OneLeft:

```bash
node scripts/generate-app-assets.mjs
npx capacitor-assets generate --android --iconBackgroundColor '#fff6ed' \
  --splashBackgroundColor '#fafaf9' --splashBackgroundColorDark '#1c1917'
```

## Licencia de PrimeNG

Desde la versión 22, PrimeNG necesita una clave de la **PrimeUI Community License** (gratuita para estudiantes
en proyectos propios). La clave **no se guarda en el repositorio**: se inyecta al compilar.

`npm start`, `npm run build` y `npm run watch` la pasan a Angular (`--define`) desde la variable de entorno
`PRIMEUI_LICENSE` o desde un fichero `.env` junto a `package.json`, que Git ignora:

```bash
echo "PRIMEUI_LICENSE=<clave>" > .env   # una sola vez
npm start
```

En GitHub Actions se lee del secreto `PRIMEUI_LICENSE`. Sin clave, la app funciona pero muestra el aviso
«Invalid PrimeUI License» (script: [`scripts/ng-with-license.mjs`](scripts/ng-with-license.mjs)).

## Proyecto

| Repositorio | Contenido |
|---|---|
| [oneleft-backend](https://github.com/chabelly-lbetancourt/oneleft-backend) | Microservicios Spring Boot |
| [oneleft-frontend](https://github.com/chabelly-lbetancourt/oneleft-frontend) | App web Angular y app Android con Capacitor |
| [oneleft-infra](https://github.com/chabelly-lbetancourt/oneleft-infra) | Docker Compose, despliegue en AWS Lightsail y observabilidad |
| [oneleft-docs](https://github.com/chabelly-lbetancourt/oneleft-docs) | Memoria del TFM y documentación del proceso |

Tablero Kanban: [OneLeft · TFM](https://github.com/users/chabelly-lbetancourt/projects/4) · Normas de trabajo: [CONTRIBUTING.md](CONTRIBUTING.md)

---
Trabajo Fin de Máster · Máster Universitario en Ingeniería Web · ETSISI · Universidad Politécnica de Madrid
