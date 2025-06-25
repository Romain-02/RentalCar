import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.updateMenuItems(isLoggedIn);
    });
  }

  updateMenuItems(isLoggedIn: boolean) {
    this.items = [
      { label: 'Accueil', routerLink: '/' },
      { label: 'Véhicule', routerLink: '/cars' },
      { label: 'Agences', routerLink: '/list-agency' },
      ...(isLoggedIn
        ? [
          { label: 'Profil', routerLink: '/profil' },
          { label: 'Déconnexion', command: () => this.logout() }
        ]
        : [
          { label: 'Connexion', routerLink: '/login' },
          { label: 'Inscription', routerLink: '/register' }
        ])
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
