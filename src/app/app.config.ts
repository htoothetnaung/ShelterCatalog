import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};

export default defineRoutes([
  { path: 'pet/:id', renderMode: 'ssr' },
  { path: 'adoption-form/:id', renderMode: 'ssr' },
  { path: 'userProfile/:id', renderMode: 'ssr' }
]);

function defineRoutes(arg0: { path: string; renderMode: string; }[]) {
  throw new Error('Function not implemented.');
}

