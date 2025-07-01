import {Component, computed, effect, inject, OnInit, Signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { AuthService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-default-layout',
  imports: [
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './default-layout.component.html',
  standalone: true,
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent{
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  private isLoggedIn: Signal<boolean> = this.authService.isLoggedIn;
  protected items: Signal<MenuItem[]> = computed(() => this.updateMenuItems(this.isLoggedIn()));
  protected isMobileMenuOpen = false;

  updateMenuItems(isLoggedIn: boolean) {
    return [
      { label: 'Accueil', routerLink: '/' },
      { label: 'Véhicule', routerLink: '/cars' },
      { label: 'Agences', routerLink: '/list-agency' },
      ...(isLoggedIn
        ? [
          { label: 'Profil', routerLink: '/profil' },
          { label: 'Déconnexion', command: (event: any) => this.logout() }
        ]
        : [
          { label: 'Connexion', routerLink: '/login' },
          { label: 'Inscription', routerLink: '/register' }
        ])
    ];
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
