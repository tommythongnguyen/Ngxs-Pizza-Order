import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { LoadToppings } from '../store';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(state => state.toppingsState.loaded).pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          return this.store.dispatch(new LoadToppings());
        }
        return of(true);
      }),
      take(1)
    );
  }
}
