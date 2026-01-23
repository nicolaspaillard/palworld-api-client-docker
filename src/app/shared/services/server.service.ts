import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private _infos: Subject<Object> = new ReplaySubject(1);
  private _settings: Subject<Object> = new ReplaySubject(1);
  constructor(private http: HttpClient) {
    this.http.get('/api/info').subscribe({
      next: infos => this._infos.next(infos),
      error: err => console.error(err),
    });
    this.http.get('/api/settings').subscribe({
      next: settings => this._settings.next(settings),
      error: err => console.error(err),
    });
  }
  public get infos(): Observable<Object> {
    return this._infos.asObservable();
  }
  public get settings(): Observable<Object> {
    return this._settings.asObservable();
  }
  announce = (message: string) => this.http.post('/api/announce', { message: message });
  get = () => this.http.get('/api/metrics');
  save = () => this.http.post('/api/save', {});
  shutdown = (waittime: number, message: string) => this.http.post('/api/shutdown', { waittime: waittime, message: message });
  stop = () => this.http.post('/api/stop', {});
}
