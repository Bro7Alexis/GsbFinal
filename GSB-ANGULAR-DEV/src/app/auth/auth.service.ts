import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService) { }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.authService.logout();
      return false;
    }
    return true;
  }


}
