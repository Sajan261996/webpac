import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../app/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [UserService]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService) {}

  login() {
    if (!this.email || !this.password) {
      alert('Please enter both email and password');
      return;
    }

    this.userService.login(this.email, this.password)
      .subscribe({
        next: res => {
          console.log('Login success:', res);
          alert('Login Successfully');
        },
        error: err => {
          console.error('Login failed:', err);
          alert('Login failed');
        }
      });
  }
}
