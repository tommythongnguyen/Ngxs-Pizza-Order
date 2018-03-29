import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { CreatePizza, PizzasState, RemovePizza, UpdatePizza } from '../../store/pizzas.state';
import { ToppingsState, VisualiseToppings } from './../../store/toppings.state';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div 
      class="product-item">
      <pizza-form 
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="visualise$ | async">
        </pizza-display>
      </pizza-form>
    </div>
  `
})
export class ProductItemComponent implements OnInit {
  @Select(PizzasState.selectedPizza) pizza$: Observable<Pizza>;
  @Select(ToppingsState.selectedToppings) toppingIds$: Observable<number[]>;
  @Select(ToppingsState.toppings) toppings$: Observable<Topping[]>;

  visualise$: Observable<Pizza>;

  constructor(private store: Store) {}
  ngOnInit() {
    this.pizza$.pipe(
      tap((pizza: Pizza) => {
        console.log('right here');
        // 'products/1'
        const pizzaExist = !!(pizza && pizza.toppings);
        const toppingIds = pizzaExist
          ? pizza.toppings.map(topping => topping.id)
          : [];
        if (pizzaExist) {
          this.store
            .dispatch(new VisualiseToppings(toppingIds))
            .subscribe(val => console.log('whatever: '));
        }
      })
    );

    this.updateVisualizeToppings();
  }

  updateVisualizeToppings() {
    this.visualise$ = this.toppingIds$.pipe(
      tap(() => console.log('my ida')),
      switchMap(ids =>
        this.toppings$.pipe(
          map((toppings: Topping[]) => {
            return ids.map((id: number) => {
              return toppings.find(topping => topping.id === id);
            });
          }),
          switchMap((toppings: Topping[]) =>
            this.pizza$.pipe(
              map((pizza: Pizza) => {
                const t = pizza;
                return { ...t, toppings };
              })
            )
          )
        )
      )
    );
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new RemovePizza(event));
    }
  }
}
