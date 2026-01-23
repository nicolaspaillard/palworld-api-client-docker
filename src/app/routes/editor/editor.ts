import { Component, signal, WritableSignal } from '@angular/core';
import { ServerService } from '@services/server.service';

@Component({
  selector: 'app-editor',
  imports: [],
  templateUrl: './editor.html',
  styles: ``,
})
export class Editor {
  settings: WritableSignal<{ name: string; value: string }[]> = signal([]);
  // one input for each setting
  constructor(private serverService: ServerService) {
    this.serverService.settings.subscribe(settings => {
      let set: { name: string; value: string }[] = [];
      for (const [key, value] of Object.entries(settings)) set.push({ name: key, value: value });
      this.settings.set(set);
    });
  }
}
