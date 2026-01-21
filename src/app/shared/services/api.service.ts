import { Injectable } from '@angular/core';
import { ApiConfig } from '../classes/api-config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _apiConfig: ApiConfig = { ip: '', port: '', password: '' };
  constructor() {
    this._apiConfig.ip = localStorage.getItem('server_ip') || '';
    this._apiConfig.port = localStorage.getItem('server_port') || '';
    this._apiConfig.password = localStorage.getItem('server_password') || '';
  }
  public get apiConfig(): ApiConfig {
    return { ip: this._apiConfig.ip, port: this._apiConfig.port, password: this._apiConfig.password };
  }
  saveConfig = (config: ApiConfig): { msg?: string; valid: boolean } => {
    if (config.ip == '' || config.port == '' || config.password == '') return { valid: false, msg: 'IP and Port must be set' };
    localStorage.setItem('server_ip', config.ip);
    localStorage.setItem('server_port', config.port);
    localStorage.setItem('server_password', config.password);
    this._apiConfig = config;
    return { valid: true };
  };
}
