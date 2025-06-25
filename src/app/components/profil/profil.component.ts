import { Component } from '@angular/core';
import {ButtonDirective} from 'primeng/button';

@Component({
  selector: 'app-profil',
  imports: [
    ButtonDirective
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent {
}
