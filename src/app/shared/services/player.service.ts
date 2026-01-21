import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '@classes/player';
import { Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _playerList: Subject<Player[]> = new ReplaySubject(1);
  constructor(private http: HttpClient) {
    this.http.get('/api/players').subscribe({
      next: list => this._playerList.next(list['players']),
      error: err => console.error(err),
    });
  }
  public get playerList(): Observable<Player[]> {
    return this._playerList.asObservable();
  }
  ban = (userid: string, message: string) => this.http.post('/api/ban', { userid: userid, message: message });
  kick = (userid: string, message: string) => this.http.post('/api/kick', { userid: userid, message: message });
  unban = (userid: string) => this.http.post('/api/unban', { userid: userid });
}
