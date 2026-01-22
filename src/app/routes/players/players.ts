import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { Player } from '@classes/player';
import { PlayerService } from '@services/player.service';
import { ToastService } from '@services/toast.service';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ContextMenuModule } from 'primeng/contextmenu';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-player-list',
  imports: [TableModule, ContextMenuModule, InputGroupModule, InputTextModule, ButtonModule],
  templateUrl: './players.html',
  styles: ``,
})
export class Players implements OnDestroy {
  interval: number;
  menu: MenuItem[];
  player?: Player;
  players: WritableSignal<Player[]> = signal([]);
  constructor(
    private playerService: PlayerService,
    private toastService: ToastService,
  ) {
    this.menu = [
      { label: 'Kick', icon: 'pi pi-fw pi-sign-out', command: () => this.kick(this.player!.userId) },
      { label: 'Ban', icon: 'pi pi-fw pi-ban', command: () => this.ban(this.player!.userId) },
    ];
    this.get();
    this.interval = setInterval(() => this.get(), 5000);
  }
  ban = (userid: string, message: string = '') => {
    this.playerService.ban(userid, message).subscribe({
      next: res => this.toastService.success('Success', 'The player was banned.'),
      error: err => this.toastService.error('Error', err),
    });
  };
  get = () =>
    this.playerService.get().subscribe({
      next: res => this.players.set(res),
      error: err => console.error(err),
    });

  kick = (userid: string, message: string = '') => {
    this.playerService.kick(userid, message).subscribe({
      next: res => this.toastService.success('Success', 'The player was kicked.'),
      error: err => this.toastService.error('Error', err),
    });
  };
  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
  unban = (userid: string) => {
    this.playerService.unban(userid).subscribe({
      next: res => this.toastService.success('Success', 'The player was unbanned.'),
      error: err => this.toastService.error('Error', err),
    });
  };
}
