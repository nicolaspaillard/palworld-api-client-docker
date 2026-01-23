import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
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
  imports: [TableModule, ContextMenuModule, InputGroupModule, InputTextModule, ButtonModule, CommonModule],
  templateUrl: './players.html',
  styles: ``,
})
export class Players implements OnDestroy {
  columns: WritableSignal<string[]> = signal([]);
  interval: number;
  menu: MenuItem[];
  player?: Object;
  players: WritableSignal<Object[]> = signal([]);
  constructor(
    private playerService: PlayerService,
    private toastService: ToastService,
  ) {
    this.menu = [
      { label: 'Kick', icon: 'pi pi-fw pi-sign-out', command: () => this.kick(this.player!['userId']) },
      { label: 'Ban', icon: 'pi pi-fw pi-ban', command: () => this.ban(this.player!['userId']) },
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
      next: res => {
        this.columns.set([]);
        if (res.length > 0) for (const [key, value] of Object.entries(res[0])) this.columns.set([...this.columns(), key]);
        this.players.set(res);
      },
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
