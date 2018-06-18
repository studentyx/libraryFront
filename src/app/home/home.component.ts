import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent {

  static URL = 'home';
  constructor() {
  }

  login(): void {

  }

  logout(): void{

  }

  profile(): void{

  }

  register(): void{

  }

  home() {

  }

  isAuthenticated(): boolean {
    return false;
  }

  getLoginUsuario(): string {
    return 'user';
  }
}

