import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../components/Login/login.component.html',
  styleUrl: '../components/Login/login.component.css'
})
export class AppComponent {
  title = 'webpac';
}
