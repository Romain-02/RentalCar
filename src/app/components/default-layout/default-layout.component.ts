import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-default-layout',
  imports: [
    RouterOutlet,
    Menubar,
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.updateMenuItems();
  }

  updateMenuItems() {
    const isLoggedIn = !!this.authService.getToken();

    this.items = [
      { label: 'Accueil', routerLink: '/' },
      { label: 'Véhicule', routerLink: '/cars' },
      ...(isLoggedIn
        ? [{ label: 'Profil', routerLink: '/profil' },
          { label: 'Déconnexion', command: () => this.logout() }]
        : [
          { label: 'Connexion', routerLink: '/login' },
          { label: 'Inscription', routerLink: '/register' },
        ]),
    ];
  }

  logout() {
    this.authService.logout();
    this.updateMenuItems();
  }
}
