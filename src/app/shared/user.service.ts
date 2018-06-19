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

  constructor(private httpService: HttpService) {
  }

  isAuthenticated(): boolean {
    return this.token ? true : false;
  }

  getLoginUser(): string {
    return this.username;
  }

  login(username: string, password: string): Observable<boolean> {
    const user: User = { username: username, password: password };

    return this.httpService.post(UserService.LOGIN_END_POINT, user).map(
      res => {
        this.token = res.token;
        this.httpService.setToken( this.token );
        this.username = username;
        return this.token != null;
      },
      error => {
        this.token = null;
        this.httpService.setToken( this.token );
        this.username = null;
      },
    );
  }

  logout(): void {
    this.token = null;
    this.httpService.setToken( this.token );
    this.username = null;
  }

  create(user: User): Observable<boolean> {
    return this.httpService.post(UserService.END_POINT, user).map(
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
