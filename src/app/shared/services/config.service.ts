import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  public password: string = '';
}

export function initializeApp(): Promise<any> {
  let http = inject(HttpClient);
  let configService = inject(ConfigService);
  return new Promise(resolve => {
    firstValueFrom(http.get('settings.json')).then(response => {
      configService.password = response['password'];
      resolve(null);
    });
  });
}
