import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Pizza, Topping } from '../../models';
import { CreatePizza, PizzasState, RemovePizza, UpdatePizza, VisualiseToppings , ToppingsState} from '../../store';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
  <div 
  class="product-item">
  {{pizza$ | async | json}}
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
  // @Select(PizzasState.SelectedPizza) pizza$: Observable<Pizza>;

  pizza$: Observable<Pizza>;
  @Select(ToppingsState.toppings) toppings$: Observable<Topping[]>;

  visualise$: Observable<Pizza>;

  constructor(private store: Store) {}
  ngOnInit() {
    this.pizza$ = this.store.select(PizzasState.SelectedPizza).pipe(
      tap((pizza: Pizza) => {
        console.log('pizza111: ', pizza);
        // 'products/1'
        const pizzaExist = !!(pizza && pizza.toppings);
        const toppingIds = pizzaExist
          ? pizza.toppings.map(topping => topping.id)
          : [];

        if (pizzaExist) {
          this.store
            .dispatch(new VisualiseToppings(toppingIds))
            .subscribe(val => console.log('whatever: ', val));
        }
      })
    );
    // this.updateVisualizeToppings();
  }

  //  updateVisualizeToppings() {
  //   this.visualise$ = this.toppingIds$.pipe(
  //     switchMap(ids =>
  //       this.toppings$.pipe(
  //         map((toppings: Topping[]) => {
  //           return ids.map((id: number) => {
  //             return toppings.find(topping => topping.id === id);
  //           });
  //         }),
  //         switchMap((toppings: Topping[]) =>
  //           this.pizza$.pipe(
  //             map((pizza: Pizza) => {
  //               const t = pizza;
  //               return { ...t, toppings };
  //             })
  //           )
  //         )
  //       )
  //     )
  //   );
  // }

  onSelect(event: number[]) {
    // this.store.dispatch(new VisualiseToppings(event));
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
