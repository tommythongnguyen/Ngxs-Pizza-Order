import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { LoadPizzas, PizzasState } from '../store/pizzas.state';

@Injectable()
export class PizzasGuard implements CanActivate {
  @Select(PizzasState.loaded) pizzasLoaded$: Observable<boolean>;

  constructor(private store: Store) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.pizzasLoaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
