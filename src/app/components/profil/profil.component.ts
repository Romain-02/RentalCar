import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service.service';
import {DEFAULT_USER, User} from '../../models/api/User';
import {ButtonDirective} from 'primeng/button';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ClientFormComponent} from '../register/client-form/client-form.component';
import {UserFormComponent} from '../register/user-form/user-form.component';
import {Client} from '../../models/api/Client';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  imports: [
    ButtonDirective,
    NgIf,
    FormsModule,
    ClientFormComponent,
    UserFormComponent
  ],
  standalone: true,
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: User = DEFAULT_USER;
  isEditing: boolean = false;


  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.user = user;
        console.log('User data fetched successfully:', this.user);
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
      }
    });
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing && this.user.client) {
      this.authService.updateMe(this.user.id, this.user.client).subscribe({
        next: (updatedClient: Client) => {
          console.log('Client data updated successfully:', updatedClient);
        },
        error: (err) => {
          console.error('Failed to update user data:', err);
        }
      });
    }
  }
}
