import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { definePreset, palette } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { initializeApp } from '@services/config.service';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { App, routes } from './app/app';
import { authInterceptor } from './app/shared/helpers/auth-interceptor';

bootstrapApplication(App, {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: definePreset(Aura, {
          semantic: {
            primary: palette('{cyan}'),
          },
        }),
      },
    }),
    MessageService,
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),
    provideAppInitializer(initializeApp),
  ],
}).catch(err => console.error(err));
