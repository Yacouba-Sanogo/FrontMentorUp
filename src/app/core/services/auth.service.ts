import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
// CHEMIN CORRIGÉ: Il va chercher dans le dossier "model" (sans s)
import { User } from '../../shared/model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this._isAuthenticated.asObservable();

  private _currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this._currentUser.asObservable();

  constructor(private router: Router) {}

  login(email: string, password: string): Observable<User> {
    const mockUsers: User[] = [
      { id: 1, email: 'parrain@test.com', role: 'ROLE_PARRAIN' },
      { id: 2, email: 'ecole@test.com', role: 'ROLE_SCHOOL' },
    ];

    const foundUser = mockUsers.find(u => u.email === email && password === 'password');

    if (foundUser) {
      return of(foundUser).pipe(
        delay(1000),
        tap(user => {
          this._isAuthenticated.next(true);
          this._currentUser.next(user);
        })
      );
    } else {
      return throwError(() => new Error('Utilisateur non trouvé')).pipe(delay(1000));
    }
  }

  logout() {
    this._isAuthenticated.next(false);
    this._currentUser.next(null);
    this.router.navigate(['/auth/login']);
  }
}