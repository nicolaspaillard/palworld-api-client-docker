import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Player } from '../../shared/classes/player';
import { PlayerService } from '../../shared/services/api/player.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-player-list',
  imports: [TableModule, ContextMenuModule, InputGroupModule, InputTextModule, ButtonModule],
  templateUrl: './players.html',
  styles: ``,
})
export class Players implements OnInit {
  menu: MenuItem[];
  player?: Player;
  players: WritableSignal<Player[]> = signal([]);
  constructor(
    private playerService: PlayerService,
    private toastService: ToastService,
  ) {
    this.playerService.playerList.subscribe(playerList => this.players.set(playerList.players));
  }
  ban = (userid: string, message: string = '') => {
    this.playerService.ban(userid, message).subscribe({
      next: res => this.toastService.success('Success', 'The player was banned.'),
      error: err => this.toastService.error('Error', err),
    });
  };
  kick = (userid: string, message: string = '') => {
    this.playerService.kick(userid, message).subscribe({
      next: res => this.toastService.success('Success', 'The player was kicked.'),
      error: err => this.toastService.error('Error', err),
    });
  };
  ngOnInit() {
    this.menu = [
      { label: 'Kick', icon: 'pi pi-fw pi-search', command: () => this.kick(this.player!.userId) },
      { label: 'Ban', icon: 'pi pi-fw pi-times', command: () => this.ban(this.player!.userId) },
    ];
  }

  unban = (userid: string) => {
    this.playerService.unban(userid).subscribe({
      next: res => this.toastService.success('Success', 'The player was unbanned.'),
      error: err => this.toastService.error('Error', err),
    });
  };
}
