import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Config } from './routes/config/config';
import { Home } from './routes/home/home';
import { Players } from './routes/players/players';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Server',
  },
  {
    path: 'list',
    component: Players,
    title: 'Players',
  },
  {
    path: 'config',
    component: Config,
    title: 'Settings',
  },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, RouterLink, ToastModule, RouterLinkActive],
  templateUrl: './app.html',
  styles: ``,
})
export class App implements OnInit {
  currentRoute: string = '';
  protected readonly routes = routes;
  protected readonly title = signal('Palworld API');
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url.replace('/', '');
      }
    });
  }
}
