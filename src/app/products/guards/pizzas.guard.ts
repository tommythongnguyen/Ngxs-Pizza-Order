import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import * as pizzasAction from '../store/pizzas.actions';

@Injectable()
export class PizzasGuard implements CanActivate {
  pizzasLoaded$: Observable<boolean>;

  constructor(private store: Store) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(state => state.pizzasState.loaded).pipe(
      switchMap((loaded: boolean) => {
        if (!loaded) {
          return this.store.dispatch(new pizzasAction.LoadPizzas());
        }
        return of(true);
      }),
      take(1)
    );
  }
}
