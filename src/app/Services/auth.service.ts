import { Injectable, inject } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { UserLoginResponse } from '../Interfaces/userLoginResponse';

export interface Credentials {
  username: string,
  password: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService = inject(UserService);
  //BehaviorSubject para almacenar la informacion del usuario y un observable publico para suscribirse a los cambios.
  private _currentUser = new BehaviorSubject<UserLoginResponse | null>(null);
  currentUser$: Observable<UserLoginResponse | null> = this._currentUser.asObservable();
  //BehaviorSubject para indicar si se ha realizado ya la autenticación y un observable publico para que los componentes sepan cuando se ha terminado de verificar.
  private _authStatusChecked = new BehaviorSubject<boolean>(false);
  authStatusChecked$: Observable<boolean> = this._authStatusChecked.asObservable();

  checkAuthStatus(): Observable<UserLoginResponse | null> {
    if (this._authStatusChecked.value && this._currentUser.value) {
      return of(this._currentUser.value);
    }
    return this.userService.checkStatus().pipe(
      tap((response: UserLoginResponse) => {
        this._currentUser.next(response);
        this._authStatusChecked.next(true);
      }),
      catchError(() => {
        console.error('No hay una sesión activa.',);
        this._currentUser.next(null);
        this._authStatusChecked.next(true);
        return of(null)
      }));
  }

  login(credencials: Credentials): Observable<UserLoginResponse> {
    return this.userService.login(credencials).pipe(
      tap((response: UserLoginResponse) => {
        if (response && !response.message) {
          this._currentUser.next(response);
          this._authStatusChecked.next(true);
        }
      }),
      catchError(error => {
        this._currentUser.next(null);
        this._authStatusChecked.next(true);
        throw error;
      })
    );

  }

  logout(): Observable<string> {
    return this.userService.logout().pipe(
      tap(() => {
        this._currentUser.next(null);
      }),
      catchError(error => {
        console.error('Logout fail: ', error);
        this._currentUser.next(null);
        throw error;
      })
    );
  }

  isLoggedIn(): boolean {
    return this._currentUser !== null;
  }

  getId(): string | null {
    return this._currentUser.value ? this._currentUser.value.id : null;
  }

  getUsername(): string | null {
    return this._currentUser.value ? this._currentUser.value.username : null;
  }

  getRole(): string | null {
    return this._currentUser.value ? this._currentUser.value.role : null;
  }
}
