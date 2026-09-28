# OneLeft · Frontend y Android

[![lint](https://github.com/chabelly-lbetancourt/oneleft-frontend/actions/workflows/lint.yml/badge.svg?branch=dev)](https://github.com/chabelly-lbetancourt/oneleft-frontend/actions/workflows/lint.yml)

**OneLeft** conecta planes para las próximas horas que tienen plazas libres («falta uno») con personas cercanas que pueden unirse en tiempo real.

## Contenido

Aplicación web **Angular** con **PrimeNG** y **Tailwind CSS**, empaquetada como app nativa de **Android** con **Capacitor** a partir del mismo código.

**Stack:** Angular 22 (sin Zone.js, con signals) · PrimeNG 22 · Tailwind CSS 4 · Capacitor · Android · Vitest · SonarQube

**IDE recomendado:** WebStorm (Android Studio para compilar la app de Android)

## Cómo ejecutarlo

Requisitos: Node 24 LTS (versión fijada en [`.nvmrc`](.nvmrc); con nvm basta `nvm use`).

```bash
npm install
npm start                      # http://localhost:4200
npm test -- --watch=false      # tests unitarios con Vitest
npm run build                  # build de producción en dist/oneleft
```

## Organización

```
src/app/
├── core/       configuración transversal: tema de PrimeNG, licencia
├── features/   una carpeta por funcionalidad (home, plans, profile...)
└── shared/     modelos y componentes reutilizables
```

- **PrimeNG** aporta los componentes (botones, etiquetas, avatares, tablas, formularios) con un tema propio
  basado en Aura y el naranja de marca ([`core/theme/oneleft-preset.ts`](src/app/core/theme/oneleft-preset.ts)).
- **Tailwind CSS 4** se encarga del diseño y la maquetación *mobile-first*. El plugin `tailwindcss-primeui`
  expone los colores de PrimeNG como utilidades de Tailwind (`bg-primary`, `text-muted-color`...).
- PrimeNG va en su propia capa CSS (`primeng`) para que las utilidades de Tailwind puedan sobrescribirlo.

## Licencia de PrimeNG

Desde la versión 22, PrimeNG necesita una clave de la **PrimeUI Community License** (gratuita para estudiantes
en proyectos propios). La clave **no se guarda en el repositorio**: se inyecta al compilar.

```bash
export PRIMEUI_LICENSE='<clave>'
npx ng build --define "PRIMEUI_LICENSE='$PRIMEUI_LICENSE'"
```

En GitHub Actions se lee del secreto `PRIMEUI_LICENSE`. Sin clave, la app funciona pero muestra un aviso de licencia.

## Proyecto

| Repositorio | Contenido |
|---|---|
| [oneleft-backend](https://github.com/chabelly-lbetancourt/oneleft-backend) | Microservicios Spring Boot |
| [oneleft-frontend](https://github.com/chabelly-lbetancourt/oneleft-frontend) | App web Angular y app Android con Capacitor |
| [oneleft-infra](https://github.com/chabelly-lbetancourt/oneleft-infra) | Docker, Kubernetes, AWS y observabilidad |
| [oneleft-docs](https://github.com/chabelly-lbetancourt/oneleft-docs) | Memoria del TFM y documentación del proceso |

Tablero Kanban: [OneLeft · TFM](https://github.com/users/chabelly-lbetancourt/projects/4) · Normas de trabajo: [CONTRIBUTING.md](CONTRIBUTING.md)

---
Trabajo Fin de Máster · Máster Universitario en Ingeniería Web · ETSISI · Universidad Politécnica de Madrid
