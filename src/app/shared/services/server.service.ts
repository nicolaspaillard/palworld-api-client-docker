import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Infos } from '@classes/infos';
import { Metrics } from '@classes/metrics';
import { Settings } from '@classes/settings';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private _infos: Subject<Infos> = new ReplaySubject(1);
  private _metrics: Subject<Metrics> = new ReplaySubject(1);
  private _settings: Subject<Settings> = new ReplaySubject(1);
  constructor(private http: HttpClient) {
    this.http.get('/api/info').subscribe({
      next: infos => this._infos.next(infos as Infos),
      error: err => console.error(err),
    });
    this.http.get('/api/settings').subscribe({
      next: settings => this._settings.next(settings as Settings),
      error: err => console.error(err),
    });
    this.http.get('/api/metrics').subscribe({
      next: metrics => this._metrics.next(metrics as Metrics),
      error: err => console.error(err),
    });
  }
  public get infos(): Observable<Infos> {
    return this._infos.asObservable();
  }
  public get metrics(): Observable<Metrics> {
    return this._metrics.asObservable();
  }
  public get settings(): Observable<Settings> {
    return this._settings.asObservable();
  }
  announce = (message: string) => this.http.post('/api/announce', { message: message });
  save = () => this.http.post('/api/save', {});
  shutdown = (waittime: number, message: string) => this.http.post('/api/shutdown', { waittime: waittime, message: message });
  stop = () => this.http.post('/api/stop', {});
}
