import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LibraryBooksComponent } from '../libraryBooks/libraryBooks.component';
import { UserService } from '../shared/user.service';
import { LoginComponent } from './login/login-dialog.component';
import { MatDialog } from '@angular/material';
import { SignUpComponent } from '../user/signUp/signUp.component';
import { ProfileComponent } from '../user/profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  static URL = 'home';
  constructor(
    private loginDialog: MatDialog,
    private router: Router,
    private userService: UserService) {

  }

  login(): void {
    const dialogRef = this.loginDialog.open(LoginComponent, {
      width: '250px'
    });
  }

  logout(): void {
    this.userService.logout();
    this.home();
  }

  profile(): void {
    this.router.navigate([HomeComponent.URL, ProfileComponent.URL])
  }

  register(): void {
    this.router.navigate([HomeComponent.URL, SignUpComponent.URL])
  }

  home() {
    this.router.navigate([HomeComponent.URL, LibraryBooksComponent.URL]);
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  getLoginUsuario(): string {
    return this.userService.getLoginUser();
  }
}


