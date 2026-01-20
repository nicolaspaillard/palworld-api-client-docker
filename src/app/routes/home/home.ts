import { Component, signal, WritableSignal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Infos } from '../../shared/classes/infos';
import { Metrics } from '../../shared/classes/metrics';
import { Settings } from '../../shared/classes/settings';
import { ServerService } from '../../shared/services/api/server.service';
import { ToastService } from '../../shared/services/toast.service';

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
export class Home {
  infos: WritableSignal<Infos[]> = signal([]);
  metrics: WritableSignal<Setting[]> = signal([]);
  settings: WritableSignal<Setting[]> = signal([]);
  constructor(
    private toastService: ToastService,
    private serverService: ServerService,
  ) {
    this.serverService.infos.subscribe(infos => {
      this.infos.set([infos]);
    });
    this.serverService.settings.subscribe(settings => {
      let set: Setting[] = [];
      for (const [key, value] of Object.entries(settings as Settings)) set.push({ name: key, value: value });
      this.settings.set(set);
    });
    this.serverService.metrics.subscribe(metrics => {
      let set: Setting[] = [];
      for (const [key, value] of Object.entries(metrics as Metrics)) set.push({ name: key, value: value });
      this.metrics.set(set);
    });
  }
  announce = (message: string) =>
    this.serverService.announce(message).subscribe({
      next: res => this.toastService.success('Success', 'The server force stopped.'),
      error: err => this.toastService.error('Error', err),
    });

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
