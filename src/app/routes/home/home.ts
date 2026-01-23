import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { ServerService } from '@services/server.service';
import { ToastService } from '@services/toast.service';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

class Data {
  name: string;
  type: string;
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
  infos: WritableSignal<Object[]> = signal([]);
  infosColumns: WritableSignal<string[]> = signal([]);
  interval: number;
  metrics: WritableSignal<Object[]> = signal([]);
  metricsColumns: WritableSignal<string[]> = signal([]);
  settings: WritableSignal<Data[]> = signal([]);
  constructor(
    private toastService: ToastService,
    private serverService: ServerService,
  ) {
    this.serverService.infos.subscribe(infos => this.infos.set([infos]));
    this.serverService.settings.subscribe(settings => {
      let set: Data[] = [];
      for (const [key, value] of Object.entries(settings)) set.push({ name: key, type: typeof value, value: value });
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
      let set: Data[] = [];
      this.metrics.set([]);
      this.metricsColumns.set([]);
      for (const [key, value] of Object.entries(metrics)) {
        this.metricsColumns.set([...this.metricsColumns(), key]);
        this.metrics.set([metrics]);
      }
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
