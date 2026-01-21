import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from './shared/services/api.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiService = inject(ApiService);
  return next(
    req.clone({
      headers: req.headers.set('Authorization', 'Basic ' + btoa(`admin:${apiService.apiConfig.password}`)).set('Content-Type', 'text/plain'),
    }),
  );
};
