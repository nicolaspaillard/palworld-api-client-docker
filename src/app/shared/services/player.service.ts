import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}
  ban = (userid: string, message: string) => this.http.post('/api/ban', { userid: userid, message: message });
  get = (): Observable<Object[]> => this.http.get('/api/players').pipe(map(list => list['players']));
  kick = (userid: string, message: string) => this.http.post('/api/kick', { userid: userid, message: message });
  unban = (userid: string) => this.http.post('/api/unban', { userid: userid });
}
