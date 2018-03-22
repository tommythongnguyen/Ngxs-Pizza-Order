import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Select, Store } from 'ngxs';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';
import { LoadPizzas, PizzasState, SelectedPizza } from '../store/pizzas.state';

@Injectable()
export class PizzaExistsGuards implements CanActivate {
  @Select(PizzasState.loaded) pizzasLoaded$: Observable<boolean>;
  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>;

  constructor(private store: Store) {}
  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.pizzaId);
        return this.hasPizza(id);
      })
    );
  }

  hasPizza(id: number): Observable<boolean> {
    return this.pizzas$.pipe(
      map((pizzas: Pizza[]) => {
        return pizzas.some(pizza => {
          if (pizza.id === id) {
            this.store.dispatch(new SelectedPizza(id));
            return true;
          }
        });
      }),
      take(1)
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
