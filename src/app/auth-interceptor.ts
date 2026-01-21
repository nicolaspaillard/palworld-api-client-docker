import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '@services/config.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let configService = inject(ConfigService);
  return next(
    req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + btoa(`admin:${configService.password}`)).set('Content-Type', 'text/plain'),
    }),
  );
};
