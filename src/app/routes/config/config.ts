import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ApiConfig } from '../../shared/classes/api-config';
import { ApiService } from '../../shared/services/api.service';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-config',
  imports: [InputTextModule, ButtonModule, FormsModule],
  templateUrl: './config.html',
  styles: ``,
})
export class Config {
  config: ApiConfig = { ip: '', port: '', password: '' };
  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
  ) {
    this.config = this.apiService.apiConfig;
  }
  save = () => {
    let result = this.apiService.saveConfig(this.config);
    if (result.valid) this.toastService.success('Success', 'Config saved');
    else this.toastService.error('Error', result.msg);
  };
}
