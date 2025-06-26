import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { User } from '../../models/User';
import {ButtonDirective} from 'primeng/button';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  imports: [
    ButtonDirective,
    NgIf
  ],
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user: User | null = null;
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
    if (!this.isEditing && this.user) {
      this.authService.updateMe(this.user).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          console.log('User data updated successfully:', this.user);
        },
        error: (err) => {
          console.error('Failed to update user data:', err);
        }
      });
    }
  }
}
