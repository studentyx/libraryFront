import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../core/http.service';

@Injectable()
export class UserService {

  static END_POINT = '/users';
  static LOGIN_END_POINT = '/auth';

  private token: string;
  private username: string;
  private rol: string;

  constructor(private httpService: HttpService) {
  }

  isAuthenticated(): boolean {
    return this.token ? true : false;
  }

  getLoginUser(): string {
    return this.username;
  }

  getRol(): string {
    return this.rol;
  }

  manageBookPrivileges() {
    let rol = this.getRol();
    return rol == 'admin' || rol == 'bookManager';
  }

  login(username: string, password: string): Observable<boolean> {
    const user: User = { username: username, password: password };

    return this.httpService.post(UserService.LOGIN_END_POINT, user).map(
      res => {
        this.token = res.token;
        this.httpService.setToken(this.token);
        this.username = username;
        this.read(this.username).subscribe(data => {
          this.rol = data.rol;
        });
        return this.token !== undefined;
      },
      error => {
        this.logout();
      },
    );
  }

  logout(): void {
    this.token = undefined;
    this.httpService.setToken(this.token);
    this.username = undefined;
    this.rol = undefined;
  }

  create(user: User, recaptcha: string): Observable<boolean> {
    return this.httpService.header('recaptcha', recaptcha).post(UserService.END_POINT, user).map(
      data => {
        return true;
      },
      error => {
        return false;
      }
    );
  }

  readAll(): Observable<User[]> {
    return this.httpService.get(UserService.END_POINT);
  }

  read(username: string): Observable<User> {
    return this.httpService.get(UserService.END_POINT + '/' + username).map(
      data => {
        return data;
      }
    );
  }

  update(user: User): Observable<User> {
    return this.httpService.put(UserService.END_POINT + '/' + user.username, user).map(data => {
      return data;
    });
  }



}
