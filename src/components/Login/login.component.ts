import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // ✅ Import this
import { UserService } from '../../app/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ Include here
  providers: [UserService] // ✅ Optional: add if not globally provided
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  login() {
    this.userService.login('test@example.com', 'password123')
      .subscribe({
        next: res => console.log('Login success:', res),
        error: err => console.error('Login failed:', err)
      });
  }
}
