import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { Infos } from '@classes/infos';
import { provideIcons } from '@ng-icons/core';
import { ServerService } from '@services/server.service';
import { ToastService } from '@services/toast.service';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

class Setting {
  name: string;
  value: string;
}

@Component({
  selector: 'app-home',
  imports: [TableModule, ButtonModule, InputTextModule, InputNumberModule, InputGroupModule, TableModule],
  providers: [provideIcons({})],
  templateUrl: './home.html',
  styles: ``,
})
export class Home implements OnDestroy {
  infos: WritableSignal<Infos[]> = signal([]);
  interval: number;
  metrics: WritableSignal<Setting[]> = signal([]);
  settings: WritableSignal<Setting[]> = signal([]);
  constructor(
    private toastService: ToastService,
    private serverService: ServerService,
  ) {
    this.serverService.infos.subscribe(infos => this.infos.set([infos]));
    this.serverService.settings.subscribe(settings => {
      let set: { name: string; value: string }[] = [];
      for (const [key, value] of Object.entries(settings)) set.push({ name: key, value: value });
      this.settings.set(set);
    });
    this.get();
    this.interval = setInterval(() => this.get(), 5000);
  }
  announce = (message: string) =>
    this.serverService.announce(message).subscribe({
      next: res => this.toastService.success('Success', 'The server force stopped.'),
      error: err => this.toastService.error('Error', err),
    });

  get = () =>
    this.serverService.get().subscribe(metrics => {
      console.log(metrics);
      let set: { name: string; value: string }[] = [];
      for (const [key, value] of Object.entries(metrics)) set.push({ name: key, value: value });
      this.metrics.set(set);
    });
  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
  save = () =>
    this.serverService.save().subscribe({
      next: res => this.toastService.success('Success', 'Successfully saved the world.'),
      error: err => this.toastService.error('Error', err),
    });
  shutdown = (waittime: number, message: string) =>
    this.serverService.shutdown(waittime, message).subscribe({
      next: res => this.toastService.success('Success', 'The server will shutdown.'),
      error: err => this.toastService.error('Error', err),
    });
  stop = () =>
    this.serverService.stop().subscribe({
      next: res => this.toastService.success('Success', 'The message was announced.'),
      error: err => this.toastService.error('Error', err),
    });
}
