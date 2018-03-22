import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from 'ngxs';
import { Observable } from 'rxjs/Observable';

import { Pizza } from './../../models/pizza.model';
import { PizzasState } from './../../store/pizzas.state';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="products">
        <div class="products__new">
            <a
            class="btn btn__ok" 
            routerLink="./new">
            New Pizza
            </a>
        </div>
        <div class="products__list">
            <div *ngIf="!(pizzas$ | async)?.length">
            No pizzas, add one to get started.
            </div>
            <pizza-item *ngFor="let pizza of (pizzas$ | async)" 
                        [pizza]="pizza">
            </pizza-item>
        </div>
    </div>`
})
export class ProductsComponent implements OnInit {
  @Select(PizzasState.pizzas) pizzas$: Observable<Pizza[]>;
  constructor(private store: Store) {}

  ngOnInit() {}
}
