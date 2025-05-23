import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './components/Login/login.component';
import { appConfig } from './app/app.config'; // ✅ Import this


bootstrapApplication(LoginComponent, appConfig)
 .catch(err => console.error(err));
