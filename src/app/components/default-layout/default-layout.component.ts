import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {Menubar} from 'primeng/menubar';

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

  ngOnInit() {
    this.items = [
      { label: 'Accueil', routerLink: '/' },
      { label: 'Véhicule', routerLink: '/vehicules' }
    ];
  }
}
