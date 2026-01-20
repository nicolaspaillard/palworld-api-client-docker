import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { PlayerList } from '../../classes/player-list';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _playerList: Subject<PlayerList> = new ReplaySubject(1);
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {
    this.http.get(this.apiService.baseURL + '/players').subscribe({
      next: list => this._playerList.next(list as PlayerList),
      error: err => console.error(err),
    });
  }
  public get playerList(): Observable<PlayerList> {
    return this._playerList.asObservable();
  }
  ban = (userid: string, message: string) => this.http.post(this.apiService.baseURL + '/ban', { userid: userid, message: message });
  kick = (userid: string, message: string) => this.http.post(this.apiService.baseURL + '/kick', { userid: userid, message: message });
  unban = (userid: string) => this.http.post(this.apiService.baseURL + '/unban', { userid: userid });
}
