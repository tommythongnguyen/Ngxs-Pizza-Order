import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';

import { LoadToppings, ToppingsState } from '../store/toppings.state';

@Injectable()
export class ToppingsGuard implements CanActivate {
  @Select(ToppingsState.loaded) toppingsLoaded$: Observable<boolean>;

  constructor(private store: Store) {}
  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.toppingsLoaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadToppings());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
