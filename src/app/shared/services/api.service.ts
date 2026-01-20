import { Injectable, isDevMode } from '@angular/core';
import { ApiConfig } from '../classes/api-config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _apiConfig: ApiConfig = { ip: '', port: '', username: '', password: '' };
  private _baseURL: string;
  constructor() {
    this._apiConfig.ip = localStorage.getItem('server_ip') || '';
    this._apiConfig.port = localStorage.getItem('server_port') || '';
    this._apiConfig.username = localStorage.getItem('server_username') || '';
    this._apiConfig.password = localStorage.getItem('server_password') || '';
    this._baseURL = isDevMode() ? '/api' : this._apiConfig.ip != '' && this._apiConfig.port != '' ? `http://${this._apiConfig.ip}:${this._apiConfig.port}/v1/api` : '';
  }
  public get apiConfig(): ApiConfig {
    return { ip: this._apiConfig.ip, port: this._apiConfig.port, username: this._apiConfig.username, password: this._apiConfig.password };
  }
  public get baseURL(): string {
    return this._baseURL;
  }
  saveConfig = (config: ApiConfig): { msg?: string; valid: boolean } => {
    if (config.ip == '' || config.port == '' || config.username == '' || config.password == '') return { valid: false, msg: 'IP and Port must be set' };
    localStorage.setItem('server_ip', config.ip);
    localStorage.setItem('server_port', config.port);
    localStorage.setItem('server_username', config.username);
    localStorage.setItem('server_password', config.password);
    this._apiConfig = config;
    this._baseURL = isDevMode() ? '/api' : `http://${config.ip}:${config.port}/v1/api`;
    return { valid: true };
  };
}
